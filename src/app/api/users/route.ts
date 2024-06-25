import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config/db";
// interface User {
//     id: number;
//     name: string;
//     email: string; // Add more fields as needed

//   }
export async function GET(request: NextRequest) {
  try {
    const db = await connection.getConnection();
    const [users] = await db.query("SELECT * FROM user");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}
