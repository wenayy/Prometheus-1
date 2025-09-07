import express, { type NextFunction } from "express"
import { middleware } from "./middleware.js";
import client from "prom-client"
import { request } from "http";
const app =express();
import type { Request,Response, } from "express";

// const client = new promClient;
 
app.use(express.json());
app.use(middleware);

app.get("/", (req, res) => {
  const t = Date.now();
  let k = 2 + 3;

  new Promise((resolve) => {
    setTimeout(() => {
      k += 22;
      resolve(k);
    }, 2000);
  }).then((result) => {
    res.status(200).json({
      result: result,
      msg: `this process took ${((Date.now() - t) / 1000).toFixed(3)} seconds`
    });
  });
});

app.get('/cpu',middleware,(req,res)=>{
    let ans=0;
    const t =Date.now();
    for (let i=0;i<5000000;i++){
        ans +=100
    }
    const end = Date.now();
    const total=(end-t)/1000;
    res.status(200).json({msg:`total time taken was ${total.toFixed(3)}s with status code is 200`})
    console.log(total.toFixed(3))


})


type Input = {
    name: string,
    age: number
}

app.post("/sum", async (req, res) => {
    const data: Input = req.body;
    res.status(200).json({ msg: `${data.name}, ${data.age}` });
});

const requestCounter= new client.Counter({
    name:"http_requestcount",  //make sure it  Does not contain spaces, hyphens, or start with a number.
    help:"this is the this endpoint",
    labelNames:["method","route","status_code"]

})

export const  Prometheusmiddleware=(req:Request,res:Response,next:NextFunction)=>{
const startTime= Date.now();

// resigtering the callback after the next goes to route it will come back because .on(finish) you will run after res.on('finish)
res.on('finish',()=>{
    const endTime=Date.now();
    console.log(`request time too ${(endTime-startTime)/1000}s`);
requestCounter.inc({
method:req.method,
route:req.route? req.route.path:req.path,
status_code:res.statusCode
})

})

next();
}



app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})






app.listen(200,()=>{console.log("server running here")})