import express from "express";
import { adminLogin } from "../controllers/authControllers.js";


const router = express.Router();

router.post("/login", adminLogin);

export default router;
