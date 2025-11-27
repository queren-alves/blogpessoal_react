import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ListaPostagensProps {
    idTemaFiltro: number | null;
}

function ListaPostagens({ idTemaFiltro }: ListaPostagensProps) {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])

    const [busca, setBusca] = useState<string>("")

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (!token) {
            ToastAlerta('Você precisa estar logado!', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [])

    async function buscarPostagens() {
        try {
            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const postagensFiltradas = postagens.filter((post) => {
        const coincideBusca = post.titulo
            .toLowerCase()
            .includes(busca.toLowerCase())

        const coincideTema =
            idTemaFiltro === null || post.tema?.id === idTemaFiltro

        return coincideBusca && coincideTema
    })

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#1f2937" size={8} />
                </div>
            )}

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="flex justify-center w-full my-4">
                    <div className="container flex flex-col">
                        <input
                            type="text"
                            placeholder="Buscar postagens..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="px-4 py-2 mb-6 border border-gray-200 rounded-md outline-none shadow-sm focus:border-gray-500"
                        />

                        {!isLoading && postagensFiltradas.length === 0 && (
                            <span className="text-lg text-center text-gray-500 my-10">
                                Nenhuma Postagem foi encontrada.
                            </span>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {postagensFiltradas.map((postagem) => (
                                <CardPostagem key={postagem.id} postagem={postagem} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaPostagens;