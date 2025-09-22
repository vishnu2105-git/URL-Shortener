import { Router } from "express";
import { loginWithGoogle } from "../Controllers/authController.js";

const authRouter = Router();

authRouter.post('/google', loginWithGoogle);



export default authRouter;