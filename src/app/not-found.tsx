import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
            <div className="text-center">
                <h1 className="font-bold text-3xl">
                    Page not found
                </h1>
                <Link href='/' className="text-center text-slate-400 text-2xl mt-5">
                    Voltar a página inicial
                </Link>
            </div>
        </section>
    )
}