import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allTasks = await prisma.task.findMany();
  return NextResponse.json(allTasks);
}

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(newTask);
}
