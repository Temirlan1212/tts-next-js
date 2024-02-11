import { Role, User } from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoose";
import { getServerMessageKey } from "@/helplers/server-messages";

export async function POST(req: Request) {
  const body = await req.json();

  const { username, password, email, role } = body;
  if (req.body == null || username == null || password == null) {
    return new NextResponse(null, { status: 400 });
  }
  await connectToDb();

  const hashedPassword = await bcrypt.hash(password, 5);

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  const errors: any = {};

  if (existingUser) {
    if (existingUser.username === username) {
      errors.username = getServerMessageKey("usernameExists");
    }
    if (existingUser.email === email) {
      errors.email = getServerMessageKey("emailExists");
    }

    return new NextResponse(
      JSON.stringify({
        message: "validation failed",
        errors,
      }),
      { status: 400 }
    );
  }

  try {
    const userRole = await Role.create({ name: "user" });
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: userRole._id,
    });
    return new NextResponse(
      JSON.stringify({
        message: "User has been created",
        errors,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
