import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(task);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description } = await request.json();

  try {
    const taskUpdate = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(taskUpdate);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const taskRemove = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(taskRemove);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
