import { Server } from 'azle';
import express from "express";
import cors from "cors";

export default Server(()=>{
    const app = express();

    app.use(cors())

    app.get("/",(req,res)=>{
        res.status(200).json({msg:"Service is running"})
    })

    app.get("/working",(req,res)=>{
        res.status(200).json({msg:"All working"})
    })

    return app.listen();
})