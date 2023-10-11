'use client';

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface ITasks {
    id: number,
    title: string,
    description: string,
    createdAt: string
}


export default function TaskCard({ task }: { task: ITasks }) {
    const router = useRouter();
    const [date, setDate] = useState('');
    
    useEffect(() => {
        setDate(new Intl.DateTimeFormat('pt-br').format(new Date(task.createdAt)));
    }, [task.createdAt]);

    return (
        <div
            className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"
            onClick={() => router.push(`/tasks/edit/${task.id}`)}
        >
            <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
            <p>{task.description}</p>
            {/* <p>{date}</p> */}
        </div>
    )
}