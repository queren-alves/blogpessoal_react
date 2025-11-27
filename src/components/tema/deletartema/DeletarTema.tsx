import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tema, setTema] = useState<Tema>({} as Tema);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();

    async function buscarTemaPorId() {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado.', "info");
            navigate('/login');
        }
    }, [token]);

    function retornar() {
        navigate("/temas");
    }

    async function deletarTema() {
        setIsLoading(true);
        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            });
            ToastAlerta('Tema deletado com sucesso.', "sucesso");
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao deletar o tema!', "erro");
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className="max-w-xl mx-auto mt-20 bg-white text-gray-800 
                rounded-2xl shadow-2xl border border-gray-200 p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Excluir Tema
            </h1>
            <p className="text-gray-700 leading-relaxed mb-6">
                Tem certeza de que deseja excluir o tema
                <span className="text-gray-700 font-semibold"> "{tema.descricao}"</span>?
                Esta ação não poderá ser desfeita.
            </p>
            <div className="flex justify-end gap-3">

                <button
                    onClick={retornar}
                    className="px-5 py-2 rounded-lg border border-gray-700 
                       hover:bg-gray-800 transition text-gray-700 hover:text-white cursor-pointer"
                >
                    Cancelar
                </button>

                <button
                    onClick={deletarTema}
                    className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 
                       transition text-white font-semibold flex items-center gap-2 cursor-pointer"
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={20} />
                    ) : (
                        "Excluir"
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeletarTema