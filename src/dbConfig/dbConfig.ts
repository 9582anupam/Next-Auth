import mongoose from "mongoose";

export async function connect() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || "", {});
        connection.connection.on("connected", () => {
            console.log("Connected to Database");
        });
        connection.connection.on("disconnected", () => {
            console.log("Disconnected from Database");
        });
        connection.connection.on("error", (error) => {
            console.error(`Error connecting to Database: ${error}`);
        });
    } catch (error) {
        console.error(`Error connecting to Database: ${error}`);
        process.exit(1);
    }
}
