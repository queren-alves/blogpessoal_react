import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"

function AtualizarPerfil() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            })

            setUser((prev) => ({ ...prev, senha: "" }))
            setConfirmarSenha("")

        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado.", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado.", "info")
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        setUser({} as Usuario)
        setConfirmarSenha("")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function sucesso() {
        handleLogout()
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: {
                        Authorization: token,
                    },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente.", "sucesso")
                sucesso()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário.", "erro")
                    retornar()
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique as informações do usuário.", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Editar Perfil</h1>
                <p className="text-gray-500 mb-8">Atualize suas informações do perfil</p>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Dados Pessoais</h2>

                    <div className="flex items-center justify-center gap-6 mb-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative">
                                <img src={user.foto} alt={user.nome} className="w-40 h-40 object-cover rounded-full border-2 border-white shadow-2xl" />
                                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <h2 className="text-gray-700 text-2xl font-bold mt-6 text-center">{user.nome}</h2>
                            <p className="text-gray-400 text-base mt-2">{user.usuario}</p>
                        </div>
                    </div>

                    <form onSubmit={atualizarUsuario} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome completo
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={user.nome}
                                onChange={(e) => atualizarEstado(e)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="usuario"
                                value={user.usuario}
                                disabled
                                className="w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400 mt-1">E-mail não pode ser alterado</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL da foto de perfil
                            </label>
                            <input
                                type="url"
                                name="foto"
                                value={user.foto || ""}
                                onChange={(e) => atualizarEstado(e)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nova Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                value={user.senha}
                                onChange={(e) => atualizarEstado(e)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Senha
                            </label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => handleConfirmarSenha(e)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition"
                            />
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={retornar}
                                className="px-6 py-3 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 rounded-md text-white font-medium bg-gray-800 hover:bg-gray-700 transition flex items-center gap-2 cursor-pointer"
                            >
                                {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Atualizar Perfil'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AtualizarPerfil