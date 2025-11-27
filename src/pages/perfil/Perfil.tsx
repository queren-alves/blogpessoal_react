import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <>
            <div className="flex justify-center px-4 py-8">
                <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="relative">
                        <img
                            className="w-full h-60 object-cover"
                            src="https://i.imgur.com/2JZhcTQ.png"
                            alt="Capa do Perfil"
                        />
                        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
                            <img
                                className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
                                src={usuario.foto}
                                alt={`Foto de perfil de ${usuario.nome}`}
                            />
                        </div>
                    </div>
                    <div className="pt-20 pb-8 text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {usuario.nome}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {usuario.usuario}
                        </p>
                        <Link to={`/atualizarperfil`} className="inline-block mt-6">
                            <button className="px-6 py-2.5 text-white text-sm font-medium rounded-md bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
                                Editar Perfil
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Perfil