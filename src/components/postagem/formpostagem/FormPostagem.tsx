import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info");
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Postagem atualizada com sucesso', "sucesso")

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao atualizar a Postagem', "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta('Postagem cadastrada com sucesso', "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta('Erro ao cadastrar a Postagem', "erro");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="flex justify-center w-full my-8">
            <div className="container max-w-2xl">
                <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
                    </h1>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={gerarNovaPostagem}
                    >
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Título da Postagem</label>
                            <input
                                type="text"
                                placeholder="Digite o título"
                                name="titulo"
                                required
                                value={postagem.titulo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Texto da Postagem</label>
                            <input
                                placeholder="Digite o conteúdo"
                                name="texto"
                                required
                                value={postagem.texto}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                className="border border-slate-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold">Tema da Postagem</label>
                            <select
                                name="tema"
                                id="tema"
                                onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                                className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <option value="" disabled selected>Selecione um tema</option>

                                {temas.map((tema) => (
                                    <option key={tema.id} value={tema.id}>
                                        {tema.descricao}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={carregandoTema}
                            className="mt-4 rounded-xl bg-gray-900 hover:bg-gray-700 cursor-pointer
                     text-white font-semibold py-3 
                     flex justify-center items-center
                     disabled:bg-slate-300 transition-all"
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormPostagem;