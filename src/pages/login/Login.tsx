import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleLogin(usuarioLogin);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Bem-vindo(a) de volta
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Entre na sua conta para continuar
          </p>

          <form className="flex flex-col gap-4" onSubmit={login}>

            <div className="flex flex-col gap-1">
              <label htmlFor="usuario" className="text-sm text-gray-700">
                E-mail
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="seuemail@email.com"
                value={usuarioLogin.usuario}
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
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0 focus:ring-gray-700 focus:border-gray-700 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 transition text-white font-medium py-2 rounded-md mt-2 flex justify-center items-center cursor-pointer"
            >
              {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Entrar</span>}
            </button>

          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-gray-600 hover:underline font-medium">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login