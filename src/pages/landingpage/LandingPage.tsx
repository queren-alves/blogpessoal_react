import { Link } from "react-router-dom"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function LandingPage() {

    let year = new Date().getFullYear()

    return (
        <>
            <div className="w-full bg-white border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-gray-800">
                    <Link to="/" className="text-2xl font-semibold flex justify-center gap-2 text-blue-950" title="PostHub Logo">
                        <svg width="55" height="55" viewBox="0 0 64 64" fill="none"
                            stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="28" />
                            <path d="M23 23h11a6.5 6.5 0 0 1 0 13h-6l-5 6v-19z" />
                        </svg>
                        <span className="flex justify-center items-center">PostHub</span>
                    </Link>
                    <div className="flex gap-8">
                        <Link to="/login" className="hover:underline text-blue-950 transition" title="Entrar">Entrar</Link>
                        <Link to='/cadastro' className='hover:underline text-blue-950 transition' title="Cadastre-se">Cadastre-se</Link>
                    </div>
                </div>
            </div>
            <div className="relative w-full min-h-screen flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://i.imgur.com/9XV8jhE.jpeg')"
                    }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <div className="relative z-10 text-center flex flex-col gap-5 items-center px-4">

                    <h2 className="text-5xl md:text-6xl font-serif text-white">
                        Seu Hub de Ideias
                    </h2>
                    <p className="text-xl text-slate-200 max-w-xl">
                        Onde cada post encontra seu lugar
                    </p>
                    <div className="mt-4">
                        <Link to="/login"
                            className='border rounded px-4 py-2 bg-white border-white hover:bg-gray-800 hover:text-gray-200 hover:border-gray-800 cursor-pointer'>
                            Acessar Sistema
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;