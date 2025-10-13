import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-green-900/70 backdrop-blur-md text-white shadow-lg">
            <Link to="/" className="text-2xl font-bold text-white hover:text-emerald-300">
                🌿 SMD
            </Link>

            <nav className="flex items-center gap-6">
                <Link to="/" className="text-white hover:text-emerald-300">
                    Início
                </Link>

                {isAuthenticated ? (
                    <Button variant="contained" color="error" onClick={logout} className="!rounded-full !font-semibold">
                        Sair
                    </Button>
                ) : (
                    <Link to="/login">
                        <Button variant="contained" className="!rounded-full !font-semibold" sx={{ backgroundColor: 'rgb(16 185 129)', '&:hover': { backgroundColor: 'rgb(16 185 129 / 0.9)' } }}>
                            Login
                        </Button>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
