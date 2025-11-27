import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O usuário foi desconectado com sucesso.', "info");
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full bg-white border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-gray-800">
                    <Link to="/home" className="text-2xl font-semibold text-blue-950">
                        PostHub
                    </Link>
                    <nav className="hidden md:flex gap-8 text-[15px]">
                        <Link to="/home" className="hover:underline text-blue-950 transition">Home</Link>
                        <Link to="/postagens" className="hover:underline text-blue-950 transition">Postagens</Link>
                        <Link to="/temas" className="hover:underline text-blue-950 transition">Temas</Link>
                        <Link to="/perfil" className="hover:underline text-blue-950 transition">Perfil</Link>
                    </nav>
                    <Link to='' onClick={logout} className='border rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer'>Sair</Link>
                </div>
            </div>
        )
    }
    return (
        <>
            {component}
        </>
    )
}

export default Navbar