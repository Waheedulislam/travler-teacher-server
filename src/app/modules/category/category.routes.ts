import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategory);

router.post("/create-category", CategoryController.CreateCategory);

// router.patch("/:id/status", UserController.updateUserStatus);

export const CategoryRoutes = router;
