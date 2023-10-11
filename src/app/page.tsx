import TaskCard from "@/components/TaskCard";

interface ITasks {
  id: number,
  title: string,
  description: string,
  createdAt: string
}


async function loadTasks(): Promise<ITasks[]> {
  const res = await fetch('http://localhost:3001/api/tasks', { cache: 'no-cache' })
  const data = await res.json();
  return data;
}


export default async function HomePage() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard  task={task} key={task.id}/>
        ))}
      </div>
    </section>
  )
}