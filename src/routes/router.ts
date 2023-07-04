import express, { Request, Response } from "express";
import { authGuard } from "@middleware/authentication";
import { validateGuard, validateUser } from "@middleware/validator";
import { handleSpin, handleWild, handleBlast } from "@models/messageBL";
import { getToken } from "@models/usersBL";
import { Server } from "socket.io";

const router = express.Router();

router.post("/generateToken", validateUser, (req: Request, res: Response) => {
  const userName = String(req.body.userName);
  const resp = getToken(userName);
  res.status(resp.status).send(resp.message);
});

router.post("/spin", authGuard, async (req: Request, res: Response) => {
  const io: Server = req.app.get("io");
  const resp = await handleSpin(io);
  res.status(resp.status).send(resp.message);
});

router.post("/wild", validateGuard, authGuard, async (req: Request, res: Response) => {
  const x = +req.query.x;
  const io = req.app.get("io");
  const resp = await handleWild(io, x);
  res.status(resp.status).send(resp.message);
});

router.post("/blast", authGuard, (req: Request, res: Response) => {
  const io: Server = req.app.get("io");
  const resp = handleBlast(io);
  res.status(resp.status).send(resp.message);
});

export default router;
