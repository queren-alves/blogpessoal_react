import { Link } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { PencilSimpleIcon, TrashSimpleIcon } from "@phosphor-icons/react"

interface CardTemaProps {
  tema: Tema
}

function CardTema({ tema }: CardTemaProps) {

  const temaTemPostagens = tema.postagem && tema.postagem.length > 0

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex justify-between items-center w-full max-w-4xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {tema.descricao}
        </h3>
        
        {/* opcional: mostrar info */}
        {temaTemPostagens && (
          <span className="text-sm text-gray-500">
            Este tema está vinculado a {tema.postagem.length} postagem(ns)
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {/* Editar sempre aparece */}
        <Link
          to={`/editartema/${tema.id}`}
          className="bg-transparent p-2 rounded-md border border-gray-200 shadow-sm 
                     hover:bg-gray-100 transition flex items-center justify-center text-slate-800"
          title="Editar Tema"
        >
          <PencilSimpleIcon />
        </Link>

        {/* Excluir só se não tiver postagens */}
        {!temaTemPostagens && (
          <Link
            to={`/deletartema/${tema.id}`}
            className="bg-transparent p-2 rounded-md border border-gray-200 shadow-sm 
                       hover:bg-gray-100 transition flex items-center justify-center text-slate-800"
            title="Excluir Tema"
          >
            <TrashSimpleIcon />
          </Link>
        )}
      </div>
    </div>
  )
}

export default CardTema
