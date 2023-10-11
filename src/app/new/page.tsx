"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react"


export default function NewPage() {

    const router = useRouter();


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const target = e.target as any;
        const { title, description } = target;

        const res = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title: title.value,
                description: description.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        router.push('/')

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form
                className="bg-slate-800 p-10 sm:w-1/4 md:w-1/2"
                onSubmit={onSubmit}
            >
                <label htmlFor="title" className="font-bold text-sm">Título da Tarefa</label>
                <input
                    id="title"
                    type="text"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    placeholder="Título"
                />
                <label htmlFor="description" className="font-bold text-sm">Descrição da Tarefa</label>
                <textarea
                    id="description"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    rows={3}
                    placeholder="Descreva sua tarefa"
                ></textarea>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Criar
                </button>
            </form>
        </div>
    )
}