import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">PostHub | Copyright: {data}</p>
                    <p className="text-lg">Acesse nossas redes sociais</p>
                    <div className="flex gap-2">
                        <a href="https://www.linkedin.com/in/querenhalves/" target="_blank"><LinkedinLogoIcon size={30} /></a>
                        <a href="https://www.github.com/queren-alves/" target="_blank"><GithubLogoIcon size={30} /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer