import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

	let authHeader = req.headers?.authorization?.split(" ");
	if (!authHeader) {
		return res.status(401).json({
			"success": false,
			"message": "authentication header not present"
		})
	}
	if (authHeader && authHeader[0] != "Bearer") {
		return res.status(401).json({
			"success": false,
			"message": "authenitcation header was not given, make sure Bearer <token> is present"
		})
	}
	let token = authHeader[1];

	try {
		let payload = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = typeof payload != "string" ? payload : undefined;
	} catch (e) {
		return res.status(401).json({
			"success": false,
			"message": "authentication header is invalid"
		})
	}

	next();
}
