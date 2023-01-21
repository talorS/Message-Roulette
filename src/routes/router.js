import express from "express";
import { authGaurd } from "../middleware/authentication";
import { validateGaurd, validateUser } from "../middleware/validator";
import { handleSpin, handleWild, handleBlast } from "../models/messeageBL";
import { getToken } from "../models/usersBL";

const router = express.Router();

router.post("/generateToken", validateUser, (req, res, next) => {
  const { userName } = req.body;
  const resp = getToken(userName);
  res.status(resp.status).send(resp.messeage);
});

router.post("/spin", authGaurd, async (req, res, next) => {
  const io = req.app.get("io");
  const resp = await handleSpin(io);
  res.status(resp.status).send(resp.message);
});

router.post("/wild", validateGaurd, authGaurd, async (req, res, next) => {
  const { x } = req.query;
  const io = req.app.get("io");
  const resp = await handleWild(io, x);
  res.status(resp.status).send(resp.message);
});

router.post("/blast", authGaurd, (req, res, next) => {
  const io = req.app.get("io");
  const resp = handleBlast(io);
  res.status(resp.status).send(resp.message);
});

export default router;
