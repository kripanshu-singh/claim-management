import connectDB from "./src/db/DBConnect.js";
import { app } from "./src/app.js";
import { port } from "./src/constants.js";

// import dotenv from "dotenv";
// dotenv.config({
//     path: "./.env",
// });

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`\nServer listening on http://localhost:${port}\nhttps://cloud.mongodb.com/v2/65e29e3793fe07481a154519#/clusters\n
            `);
        });
    })
    .catch((error) => {
        throw error;
    });
