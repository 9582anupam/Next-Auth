import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        console.log("Request received");
        // Extract the request body and validate it
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Check if the email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide an email and password" },
                { status: 400 }
            );
        }

        // Check if a user with the same username or email already exists
        const existingUser = await User.findOne({ username, email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send a verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        // Return the saved user with a 201 status code
        return NextResponse.json({
            message: "User created successfully",
            user: savedUser,
            status: 201,
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
