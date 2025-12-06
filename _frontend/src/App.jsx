import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import UsuarioForm from "./pages/usuarios/UsuarioForm";
import UsuarioDetail from "./pages/usuarios/UsuarioDetail";
import FluxosPage from "./pages/fluxos/FluxosPage";
import FluxoDetail from "./pages/fluxos/FluxoDetail";
import FluxoForm from "./pages/fluxos/FluxoForm";
import FluxoDocumentos from "./pages/fluxos/FluxoDocumentos";
import DocumentoDetail from "./pages/documentos/DocumentoDetail";
import DocumentosPage from "./pages/documentos/DocumentosPage";
import DocumentoFormPage from "./pages/documentos/DocumentoFormPage";
import RelatoriosPage from "./pages/relatorios/RelatoriosPage";
import ConfigPage from "./pages/config/ConfigPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Login não acessível se já estiver logado */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />

            {/* Dashboard só acessível autenticado */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/usuarios"
                element={
                    <ProtectedRoute>
                        <UsuariosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fluxos"
                element={
                    <ProtectedRoute>
                        <FluxosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fluxos/novo"
                element={
                    <ProtectedRoute>
                        <FluxoForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fluxos/:id"
                element={
                    <ProtectedRoute>
                        <FluxoDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fluxos/:id/editar"
                element={
                    <ProtectedRoute>
                        <FluxoForm />
                    </ProtectedRoute>
                }
            />
                <Route
                    path="/fluxos/:id/documentos"
                    element={
                        <ProtectedRoute>
                            <FluxoDocumentos />
                        </ProtectedRoute>
                    }
                />
            <Route
                path="/relatorios"
                element={
                    <ProtectedRoute>
                        <RelatoriosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/documentos"
                element={
                    <ProtectedRoute>
                        <DocumentosPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/documentos/novo"
                element={
                    <ProtectedRoute>
                        <DocumentoFormPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/documentos/:id"
                element={
                    <ProtectedRoute>
                        <DocumentoDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fluxos/:id/documentos/novo"
                element={
                    <ProtectedRoute>
                        <DocumentoFormPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/config"
                element={
                    <ProtectedRoute>
                        <ConfigPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/usuarios/novo"
                element={
                    <ProtectedRoute>
                        <UsuarioForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/usuarios/:id/editar"
                element={
                    <ProtectedRoute>
                        <UsuarioForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/usuarios/:id"
                element={
                    <ProtectedRoute>
                        <UsuarioDetail />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
