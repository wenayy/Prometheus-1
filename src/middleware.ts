import type { NextFunction , Request, Response} from "express"

export function middleware  (req:Request, res:Response, next:NextFunction){
  const t= Date.now();
  next();
  const k=Date.now();
  console.log((((k-t)/1000).toFixed(3)));
}