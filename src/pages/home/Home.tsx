import FilterTemas from "../../components/tema/filtertemas/FilterTemas"
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"
import TagsTemas from "../../components/tema/tagstemas/TagsTemas"
import { useState } from "react";

function Home() {
    const [idTemaFiltro, setIdTemaFiltro] = useState<number | null>(null);

    return (
        <>
            <div className="relative w-full h-[85vh] flex items-center justify-center">
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
                        <ModalPostagem />
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 min-h-screen py-10">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-semibold text-blue-950 mb-1">
                        Explore novas postagens
                    </h1>
                </div>
                <div className="max-w-7xl mx-auto px-4 flex gap-10">
                    <div className="flex-1">
                        <ListaPostagens idTemaFiltro={idTemaFiltro} />
                    </div>
                    <aside className="w-80 hidden lg:flex flex-col gap-6 py-10 my-4">
                        <FilterTemas onFiltrar={(id) => setIdTemaFiltro(id)} />
                        <TagsTemas />
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Home