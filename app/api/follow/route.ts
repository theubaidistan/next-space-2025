// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { authOptions } from '../auth/[...nextauth]/route';

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;
//   const { targetUserId } = await req.json();

//   const currentUserId = await prisma.user
//     .findUnique({ where: { email: currentUserEmail } })
//     .then((user) => user?.id!);

//   const record = await prisma.follows.create({
//     data: {
//       followerId: currentUserId,
//       followingId: targetUserId,
//     },
//   });

//   return NextResponse.json(record);
// }

// export async function DELETE(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;
//   const targetUserId = req.nextUrl.searchParams.get('targetUserId');

//   const currentUserId = await prisma.user
//     .findUnique({ where: { email: currentUserEmail } })
//     .then((user) => user?.id!);

//   const record = await prisma.follows.delete({
//     where: {
//       followerId_followingId: {
//         followerId: currentUserId,
//         followingId: targetUserId!,
//       },
//     },
//   });

//   return NextResponse.json(record);
// }
//*--------------------------------------------------------------------------------------------------------------------
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const currentUserEmail = session.user.email;

  const { targetUserId } = await req.json();
  if (!targetUserId) {
    return NextResponse.json(
      { error: "Missing targetUserId" },
      { status: 400 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  if (!currentUser) {
    return NextResponse.json(
      { error: "Current user not found" },
      { status: 404 }
    );
  }

  const record = await prisma.follows.create({
    data: {
      followerId: currentUser.id,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const currentUserEmail = session.user.email;
  const targetUserId = req.nextUrl.searchParams.get("targetUserId");

  if (!targetUserId) {
    return NextResponse.json(
      { error: "Missing targetUserId" },
      { status: 400 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });
  if (!currentUser) {
    return NextResponse.json(
      { error: "Current user not found" },
      { status: 404 }
    );
  }

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: targetUserId,
      },
    },
  });

  return NextResponse.json(record);
}
