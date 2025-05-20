import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategory);
router.get("/:categoryId", CategoryController.getSingleCategory);
router.post("/create-category", CategoryController.CreateCategory);

export const CategoryRoutes = router;
