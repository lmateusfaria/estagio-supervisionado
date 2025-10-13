import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";

const DashboardPage = () => {
    const { isAuthenticated, user, fetchUser } = useAuth();

    useEffect(() => {
        if (isAuthenticated && !user) {
            fetchUser();
        }
    }, [isAuthenticated, user, fetchUser]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                {/* Sidebar escondida em mobile; Sidebar component já cuida do overlay */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Dashboard 🌿</h1>

                    {isAuthenticated && user ? (
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6">
                            <p className="text-base md:text-xl">
                                Bem-vindo, <span className="font-bold text-emerald-200">{user.login}</span>!
                            </p>
                            <p className="mt-2 text-sm md:text-base text-gray-200">
                                Suas permissões: <span className="font-semibold text-emerald-300">{user.roles?.map(r => r.authority).join(", ")}</span>
                            </p>
                        </div>
                    ) : (
                        <p>Carregando informações do usuário...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
