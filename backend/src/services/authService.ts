import jwt from "jsonwebtoken"
import {SignInDto, SignUpDto} from "../dto/authDto"
import "dotenv/config"
import { userService } from "."
import { UserAlreadyExistsError } from "./userService";

export class AuthService{
  constructor(){
		 
  }
  signUp(dto:SignUpDto){
	 let user = userService.getUserByEmail(dto.email);
	 if(user){
		throw new UserAlreadyExistsError();
	 }
	 
	  userService.create(dto);    
  }

  signIn(dto:SignInDto){
          
  }

}
