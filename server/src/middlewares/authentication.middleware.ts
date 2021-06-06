  import express from 'express';
  import jwt from "jsonwebtoken";

let authenticationMiddleware = (): express.RequestHandler => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if ( token === null || token === "null" ) return res.sendStatus(401);
        else{
            jwt.verify(token, "secret", (err: any ) => {
            if (err) return res.sendStatus(403)
            next();
            })
        }
    }
}

export default authenticationMiddleware;