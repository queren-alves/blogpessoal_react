import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import type Postagem from "../../../models/Postagem";


function PostagemDetalhe() {

    const { id } = useParams<{ id: string }>();
    const { usuario } = useContext(AuthContext);

    const [postagem, setPostagem] = useState<Postagem | null>(null);
    const [relacionados, setRelacionados] = useState<Postagem[]>([]);
    const token = usuario.token;

    // 🔹 Buscar o post atual
    useEffect(() => {
        async function carregarPost() {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            });
        }
        carregarPost();
    }, [id]);

    // 🔹 Buscar TODOS os posts e filtrar os relacionados
    useEffect(() => {
        async function carregarRelacionados() {
            if (!postagem?.tema?.id) return;

            let todasPostagens: Postagem[] = [];

            await buscar("/postagens", (lista: Postagem[]) => {
                todasPostagens = lista;
            }, {
                headers: { Authorization: token }
            });

            const filtradas = todasPostagens.filter(
                p => p.tema?.id === postagem.tema?.id && p.id !== postagem.id
            );

            setRelacionados(filtradas);
        }

        carregarRelacionados();
    }, [postagem]);

    return (
        <div className="min-h-screen p-6 flex flex-col items-center bg-gray-50">
            {postagem && (
                <article className="max-w-3xl bg-white shadow-sm rounded-2xl p-8 mb-16
                        border border-gray-200">
                    <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                        {postagem.titulo}
                    </h1>
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src={postagem.usuario?.foto}
                            alt={postagem.usuario?.nome}
                            className="h-14 w-14 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-slate-800">
                                {postagem.usuario?.nome}
                            </span>
                            <span className="text-sm text-slate-500">
                                {new Intl.DateTimeFormat("pt-BR", {
                                    dateStyle: "long",
                                    timeStyle: "short"
                                }).format(new Date(postagem.data))}
                            </span>
                        </div>
                    </div>
                    <span
                        className="inline-block text-sm font-medium bg-yellow-100 
                            text-orange-700
                       px-3 py-1 rounded-full mb-8"
                    >
                        {postagem.tema?.descricao}
                    </span>
                    <div className="prose prose-lg max-w-none text-slate-800 leading-relaxed">
                        {postagem.texto}
                    </div>
                </article>
            )}

            <div className="max-w-3xl w-full">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                    Posts Relacionados
                </h2>

                {relacionados.length === 0 && (
                    <p className="text-gray-500">Nenhum post relacionado encontrado.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relacionados.map((post) => (
                        <Link
                            key={post.id}
                            to={`/postagem/${post.id}`}
                            className="block bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
                        >
                            <h3 className="font-semibold text-slate-800 mb-4">{post.titulo}</h3>
                            <span className="text-sm bg-yellow-100 
                            text-orange-700 font-semibold px-3 py-1 rounded-full">
                                {post.tema?.descricao}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default PostagemDetalhe;
