import { any, string } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { Login } from "@/app/utils/validation";
import connection from "@/app/config/db";
import bcrypt from "bcryptjs";
import { jeneratejwt } from "@/app/utils/jenerateToken";
import { Jwtpaylod, UserDetails } from "@/app/utils/types";
/**
 * @method POST
 * @route http://localhost:3000/api/users/login
 * @description Login a user
 * @access Public
 */
export async function POST(request: NextRequest) {
  try {
    // Get a connection to the database
    const db = await connection.getConnection();

    // Parse the JSON body from the request
    const body = await request.json();

    // Validate the parsed body against the Login schema
    const validation = Login.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    //
    // Query the database for a user with the provided email
    const query = "SELECT * FROM users WHERE email = ?";
    const [users]: any = await db.query(query, [body.email]);

    // If a user is found, proceed with password validation and JWT generation
    if (users.length > 0) {
      const user = users[0];
      const password: string = user.password;

      // Create a JWT payload
      const jwtPayloadUser: Jwtpaylod = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        password: user.password,
      };

      // Generate a JWT
      const token = jeneratejwt(jwtPayloadUser);

      // Compare the provided password with the stored hashed password
      const isValidPassword = await bcrypt.compare(body.password, password);

      if (isValidPassword) {
        // If the password is valid, return a success response with the token
        const UserReturn: UserDetails = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          password: user.password,
          phone_number: user.phone_number,
          img_profile: user.img_profile,
          id_list: user.id_list,
          name: user.name,
          Bio: user.Bio,
        };
        return NextResponse.json(
          { message: "Login successfully", token, UserReturn },
          { status: 200 }
        );
      } else {
        // If the password is invalid, return an error response
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 400 }
        );
      }
    } else {
      // If no user is found, return an error response
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Log any errors and return a server error response
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
