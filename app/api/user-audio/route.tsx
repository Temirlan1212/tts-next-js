import { NextResponse } from "next/server";
import connectToDb from "@/lib/mongoose";
import { getServerMessageKey } from "@/helplers/server-messages";
import { UserAudio } from "@/lib/models/audio.model";

export async function POST(req: Request) {
  const { src, text, user_id } = await req.json();

  if (user_id == null || src == null || text == null) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    await connectToDb();

    const UserAudioMApi = new UserAudio({ text, src, user_id });
    await UserAudioMApi.save();
    return new NextResponse(JSON.stringify(UserAudioMApi), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;

  try {
    await connectToDb();
    const data = await UserAudio.find({ user_id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const count = await UserAudio.countDocuments();

    return new NextResponse(
      JSON.stringify({
        items: data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      }),
      {
        status: 200,
      }
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

// export async function PATCH(req: Request) {
//   const body = await req.json();
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (body == null || id == null) {
//     return new NextResponse(null, { status: 400 });
//   }

//   try {
//     await connectToDb();
//     const category = await Category.findOne({ _id: id });
//     if (category?.value !== body?.value) {
//       const isCategoryExists = await Category.findOne({ value: body?.value });
//       if (isCategoryExists) {
//         return new NextResponse(
//           JSON.stringify({
//             message: "validation failed",
//             errors: { value: getServerMessageKey("categoryExists") },
//           }),
//           { status: 400 }
//         );
//       }
//     }

//     await Category.findOneAndUpdate({ _id: id }, body);
//     const data = await Category.find();
//     return new NextResponse(JSON.stringify(data), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (id == null) return new NextResponse(null, { status: 400 });

//   try {
//     await connectToDb();
//     await Category.findOneAndDelete({ _id: id });
//     const data = await Category.find();
//     return new NextResponse(JSON.stringify(data), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }
