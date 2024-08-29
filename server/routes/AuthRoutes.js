import {Router} from "express";
import { signup, login, verifyOTP } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post('/signup',signup );
authRoutes.post('/login',login);
authRoutes.post('/verify-otp', verifyOTP);
export default authRoutes;
