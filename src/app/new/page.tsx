"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"


export default function NewPage({ params }: { params: { searchParams: {}, id: string } }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nameButton, setNameButton] = useState('Criar');
    const router = useRouter();

    useEffect(() => {
        if (params.id) {
            setNameButton('Atualizar')
            fetch(`/api/tasks/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setTitle(data.title);
                    setDescription(data.description);
                });
        }

    }, [params.id]);


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let method = "POST";
        let request = '/api/tasks';

        if (params.id) {
            method = "PUT";
            request += `/${params.id}`;
        }

        const res = await fetch(request, {
            method,
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.refresh();
        router.push('/');

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description" className="font-bold text-sm">Descrição da Tarefa</label>
                <textarea
                    id="description"
                    className="border border-gray-400 p-2 mb-4 w-full text-black"
                    rows={3}
                    placeholder="Descreva sua tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        {nameButton}
                    </button>
                    {params.id && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            type="button"
                            onClick={async () => {
                                await fetch(`/api/tasks/${params.id}`, {
                                    method: 'DELETE'
                                });
                                router.refresh();
                                router.push('/')
                            }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}