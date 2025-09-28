import express from "express";
import { submitApplication, upload } from "../controller/careerController.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), submitApplication);

export default router;
