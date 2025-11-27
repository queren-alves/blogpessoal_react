import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom";

function Footer() {

    let year = new Date().getFullYear()
    const { usuario } = useContext(AuthContext);
    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <footer className="bg-linear-to-r from-[#2d3748] to-[#1f2937] text-white py-12">
                <div className="max-w-6xl mx-auto px-6 flex  gap-10">
                    <div>
                        <svg width="50" height="50" viewBox="0 0 64 64" fill="none"
                            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="28" />
                            <path d="M23 23h11a6.5 6.5 0 0 1 0 13h-6l-5 6v-19z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-white mb-2">PostHub</h2>
                        
                        <p className="text-sm leading-relaxed text-gray-400 max-w-[60%]">
                            Compartilhando ideias que inspiram e informam.
                            Junte-se à nossa comunidade de leitores e criadores.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3">Links Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/home" className="hover:text-white text-gray-300">Home</Link></li>
                            <li><Link to="/postagens" className="hover:text-white text-gray-300">Postagens</Link></li>
                            <li><Link to="/temas" className="hover:text-white text-gray-300">Temas</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
                    © {year} PostHub. Todos os direitos reservados.
                </div>
            </footer>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer