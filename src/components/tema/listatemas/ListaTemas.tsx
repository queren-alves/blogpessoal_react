import { Link, useNavigate } from "react-router-dom";
import CardTema from "../cardtema/CardTema";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaTemas() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado.', "info");
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, [temas.length]);

    async function buscarTemas() {
        try {
            setIsLoading(true);
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {
                isLoading && (
                    <div className="flex justify-center w-full my-8">
                        <SyncLoader
                            color="#1f2937"
                            size={8}
                        />
                    </div>
                )
            }

            <div className="min-h-80 bg-white py-10">
                <div className="max-w-5xl mx-auto flex justify-between items-center mb-10 px-4">
                    <h1 className="text-3xl font-semibold text-[#1f2937]">
                        Gerenciar Temas
                    </h1>
                    <Link
                        to="/cadastrartema"
                        className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition"
                    >
                        + Criar Tema
                    </Link>
                </div>
                <div className="max-w-5xl mx-auto flex flex-col gap-6 px-4 items-center">

                    {(!isLoading && temas.length === 0) && (
                        <span className="text-lg text-center text-gray-500 my-10">
                            Nenhum tema foi encontrado.
                        </span>
                    )}

                    {temas.map((tema) => (
                        <CardTema key={tema.id} tema={tema} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ListaTemas