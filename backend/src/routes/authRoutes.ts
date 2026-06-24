import express from "express"
import {authService} from "../services"
import { signInDto, signUpDto } from "../dto/authDto";
import { zodMiddleware } from "../middlewares";


let authRouter = express.Router();

authRouter.post("/signup",zodMiddleware(signUpDto),(req,res)=>{
   authService.signUp(req.body); 
})

authRouter.get("/signin",zodMiddleware(signInDto),(req)=>{
  authService.signIn(req.body);
})

export {authRouter}
