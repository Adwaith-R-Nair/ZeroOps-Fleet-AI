import "dotenv/config"
import express from "express"
import {authRouter, workspaceRouter} from "./routes/"

let app = express();


app.use(express.json());
app.use(authRouter);

app.get("/",(req,res)=>{
  return res.json({
	 "toy":"cool"
  })
})



app.listen(process.env.PORT,()=>{
  console.log("Successfully started server ");
})
