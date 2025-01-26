import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { MailtrapTransport } from "mailtrap";

interface EmailOptions {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
    try {
        // Hash the password
        const hashedToken = await bcryptjs.hash(userId, 10);
        // Set expiry time for the token
        const hashedTokenExpiry = Date.now() + 3600000; // 1 hour

        // Save hashed token and expiry time in the database
        if (emailType === "VERIFY") {
            console.log("Sending verification email");
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: hashedTokenExpiry,
            });
        } else if (emailType === "RESET") {
            console.log("Sending reset password email");
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: hashedTokenExpiry,
            });
        }

        const transporter = nodemailer.createTransport(
            MailtrapTransport({
                token: process.env.MAILTRAP_TOKEN || "",
                testInboxId: 3419852,
            })
        );

        const mailOptions = {
            from: "9582anupamk@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }
                    or copy and paste the link below in your browser. <br> ${
                        process.env.DOMAIN
                    }/verifyemail?token=${hashedToken}
                    </p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(`Message sent: ${mailResponse}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};
