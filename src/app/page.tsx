import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

interface ITasks {
  id: number,
  title: string,
  description: string | null,
  createdAt: string
}

// export const revalidate = 60;
export const dynamic = 'force-dynamic';

async function loadTasks(): Promise<ITasks[] | any> {
  const allTasks = await prisma.task.findMany();
  return allTasks;
}

export default async function HomePage() {
  const tasks = await loadTasks();
  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task: any) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  )
}