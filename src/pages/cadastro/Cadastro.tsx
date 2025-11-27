import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: ""
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso.", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar usuário.", "erro");
      }
    } else {
      ToastAlerta("Dados do usuário inconsistentes. Verifique as informações do cadastro.", "erro");
      setUsuario({
        ...usuario,
        senha: ''
      });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-lg">

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Criar Conta
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Preencha os dados para criar sua conta
          </p>

          <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>

            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="text-sm text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Seu nome completo"
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="usuario" className="text-sm text-gray-700">
                E-mail
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="seuemail@email.com"
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="foto" className="text-sm text-gray-700">
                URL da sua foto
              </label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="https://..."
                value={usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="senha" className="text-sm text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="••••••••"
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmarSenha" className="text-sm text-gray-700">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="••••••••"
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="reset"
                onClick={retornar}
                className="w-1/2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-1/2 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition flex justify-center items-center cursor-pointer"
              >
                {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Cadastrar</span>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Cadastro