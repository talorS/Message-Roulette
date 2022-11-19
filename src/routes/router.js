import express from "express";
import { authGaurd } from "../middleware/authentication";
import { validateGaurd } from "../middleware/validator";
import { handleSpin, handleWild, handleBlast } from "../models/messeageBL";

const router = express.Router();

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
