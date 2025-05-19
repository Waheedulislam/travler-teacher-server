import { Router } from "express";
import { ReviewController } from "./review.controller";

const router = Router();

router.get("/", ReviewController.getAllReview);

router.post("/create-review", ReviewController.CreateReview);

// router.patch("/:id/status", UserController.updateUserStatus);

export const ReviewRoutes = router;
