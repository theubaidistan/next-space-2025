// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { authOptions } from "../auth/[...nextauth]/route"

// export async function PUT(req: Request) {
//   const session = await getServerSession(authOptions);
//   const currentUserEmail = session?.user?.email!;

//   const data = await req.json();
//   data.age = Number(data.age);

//   const user = await prisma.user.update({
//     where: {
//       email: currentUserEmail,
//     },
//     data,
//   });

//   return NextResponse.json(user);
// }
//*--------------------------------------------------------------------------------------------------------------------------
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  // Get the current session
  const session = await getServerSession(authOptions);

  // If no session or email, return 401
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session.user.email;

  // Parse the request body
  const data = await req.json();

  // Validate and convert age if provided
  if (data.age !== undefined) {
    const ageNumber = Number(data.age);
    if (isNaN(ageNumber)) {
      return NextResponse.json({ error: "Invalid age" }, { status: 400 });
    }
    data.age = ageNumber;
  }

  try {
    // Update user in the database
    const user = await prisma.user.update({
      where: { email: currentUserEmail },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
