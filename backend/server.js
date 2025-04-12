import dotenv from "dotenv";
import express from "express";
import cors from "cors";



dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


import routes from "./route/weather.routes.js";


app.use(routes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
