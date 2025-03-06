import { Router } from "express";
import apiRoutes from "./api";

const router = Router();

router.use("/api", apiRoutes);

// Fallback for unknown routes
router.use((req, res) => res.status(404).send("Not Found"));

export default router;
