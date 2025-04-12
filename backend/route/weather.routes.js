import {Router} from "express";
import getWeather from "../controller/weather.controller.js";

const router = Router();


router.get("/weather",
    getWeather
    )
export default router;