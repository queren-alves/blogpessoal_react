import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { SignOutIcon, UserIcon } from "@phosphor-icons/react";

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
                    <Link to="/home" className="text-2xl font-semibold flex justify-center gap-2 text-blue-950" title="PostHub Logo">
                        <svg width="55" height="55" viewBox="0 0 64 64" fill="none"
                            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="28" />
                            <path d="M23 23h11a6.5 6.5 0 0 1 0 13h-6l-5 6v-19z" />
                        </svg>
                       <span className="flex justify-center items-center">PostHub</span> 
                    </Link>
                    <nav className="hidden md:flex gap-8 text-[15px]">
                        <Link to="/home" className="hover:underline text-blue-950 transition">Home</Link>
                        <Link to="/postagens" className="hover:underline text-blue-950 transition">Postagens</Link>
                        <Link to="/temas" className="hover:underline text-blue-950 transition">Temas</Link>
                        
                    </nav>
                    <div className="flex gap-8">
                    <Link to="/perfil" className="hover:underline text-blue-950 transition" title="Perfil"><UserIcon size={20} /></Link>
                    <Link to='' onClick={logout} className='hover:underline text-blue-950 transition' title="Sair"><SignOutIcon size={20} /></Link>
                    </div>
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