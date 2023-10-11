interface ITasks {
  id: number,
  title: string,
  description: string,
  createdAt: string
}


async function loadTasks(): Promise<ITasks[]> {
  const res = await fetch('http://localhost:3001/api/tasks')
  const data = await res.json();
  return data;
}


export default async function HomePage() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <div key={task.id} className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer">
            <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}