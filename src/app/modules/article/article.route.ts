import { Router } from "express";
import { ArticleController } from "./article.controller";

const router = Router();

router.get("/", ArticleController.getAllArticle);
router.get("/:articleId", ArticleController.getSingleArticle);
router.post("/create-article", ArticleController.CreateArticle);

export const ArticleRoutes = router;
