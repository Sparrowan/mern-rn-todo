import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express"

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC!, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.body.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.body.user.id === req.params.id || req.body.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
};