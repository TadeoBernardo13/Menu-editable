import app from "./app.js";
import { connectToDB } from "./utils/mongoose.js";
import { PORT } from "./config.js";

connectToDB();
app.listen(PORT);
console.log("Server is running on port", PORT);
