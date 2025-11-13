

function Home() {
    return (
        <div className="bg-purple-50 flex justify-center">
            <div className="container grid grid-cols-2 text-white">
                <div className="flex flex-col gap-4 items-center justify-center py-4">
                    <h2 className="text-5xl font-bold text-purple-950">Seu Hub de Ideias</h2>
                    <p className="text-xl text-purple-950">Onde cada post encontra seu lugar.</p>
                    <div className="flex justify-around gap-4">
                        <div className="rounded text-purple-950 border-purple-950 border-solid border-2 py-2 px-4">Nova Postagem</div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <img src="https://i.imgur.com/56pPCUE.png" alt="Imagem da Página Home" className=" w-2/3 rounded-[8%_60%_45%_45%_/_40%_45%_8%_45%] shadow-lg"/>
                </div>
            </div>
        </div>
    )
}

export default Home