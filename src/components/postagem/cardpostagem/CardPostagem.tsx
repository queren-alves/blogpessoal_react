import { useContext } from 'react'
import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'
import { PencilSimpleIcon, TrashSimpleIcon } from '@phosphor-icons/react'
import { AuthContext } from '../../../contexts/AuthContext'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {

    const { usuario } = useContext(AuthContext) // usuário logado

    const isDonoDaPostagem = usuario?.id === postagem.usuario?.id

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm 
             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
             overflow-hidden flex flex-col justify-between"
        >
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <img
                        src={postagem.usuario?.foto}
                        alt={postagem.usuario?.nome}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="font-semibold text-slate-800">
                            {postagem.usuario?.nome}
                        </h3>
                        <p className="text-sm text-slate-500">
                            {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: "medium",
                                timeStyle: "short"
                            }).format(new Date(postagem.data))}
                        </p>
                    </div>
                </div>

                {/* Só mostra se for o dono */}
                {isDonoDaPostagem && (
                    <div className="flex gap-2">
                        <Link
                            to={`/editarpostagem/${postagem.id}`}
                            className="bg-transparent p-2 rounded-md border border-gray-200 shadow-sm 
                                       hover:bg-gray-100 transition flex items-center justify-center text-slate-800"
                            title="Editar Postagem"
                        >
                            <PencilSimpleIcon />
                        </Link>

                        <Link
                            to={`/deletarpostagem/${postagem.id}`}
                            className="bg-transparent p-2 rounded-md border border-gray-200 shadow-sm 
                                       hover:bg-gray-100 transition flex items-center justify-center text-slate-800"
                            title="Excluir Postagem"
                        >
                            <TrashSimpleIcon />
                        </Link>
                    </div>
                )}
            </div>

            <div className="p-6 space-y-3">
                <span className=" bg-yellow-100 
                            text-orange-700 text-sm font-medium px-3 py-1 rounded-full inline-block">
                    {postagem.tema?.descricao}
                </span>

                <h2 className="text-xl font-bold text-slate-800">
                    {postagem.titulo}
                </h2>

                <p className="text-slate-600 line-clamp-2 mb-6">
                    {postagem.texto}
                </p>

                <Link
                    to={`/postagem/${postagem.id}`}
                    className="bg-gray-900 text-white hover:bg-gray-700 transition cursor-pointer px-4 py-2 rounded-lg"
                >
                    Ler mais →
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem