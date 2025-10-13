import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUi } from "../../context/UiContext";
import { Button, IconButton } from "@mui/material";

const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    const { setIsSidebarOpen } = useUi();

    return (
        <header className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-green-900/80 backdrop-blur-md text-white shadow-lg z-30">
            <div className="flex items-center gap-3">
                {/* hamburger mobile */}
                <IconButton
                    size="small"
                    className="md:hidden p-2 rounded-md hover:bg-green-800 text-white"
                    onClick={() => {
                        try {
                            // toggle for safety and log for debugging
                            setIsSidebarOpen((prev) => {
                                console.log('Sidebar toggle from navbar, prev =', prev);
                                return !prev;
                            });
                        } catch (err) {
                            console.error('Erro ao abrir sidebar:', err);
                        }
                    }}
                    aria-label="Abrir menu"
                    type="button"
                >
                    <Menu size={20} />
                </IconButton>
                <h2 className="text-lg font-semibold hidden sm:block">SMD</h2>
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <span className="hidden sm:block font-medium">
                        Bem-vindo, <span className="text-emerald-300">{user.login}</span>
                    </span>
                ) : (
                    <span className="italic text-gray-300">Carregando...</span>
                )}

                <Button
                    variant="contained"
                    color="error"
                    onClick={logout}
                    className="!px-4 !py-2 !rounded-full !font-semibold flex items-center gap-2"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </Button>
            </div>
        </header>
    );
};

export default DashboardNavbar;
