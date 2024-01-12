import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import recipes from "./routes/recipesRoute.js";
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());

connectDB();
const port = process.env.PORT || 3090;

app.use('/recipes', recipes);

// Assurez-vous d'avoir déclaré path
const path = join(__dirname, 'public');
app.use(express.static(path));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
