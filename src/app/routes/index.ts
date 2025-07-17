import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { ArticleRoutes } from "../modules/article/article.route";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { MessagesRoutes } from "../modules/message/message.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/teacher",
    route: TeacherRoutes,
  },
  {
    path: "/Review",
    route: ReviewRoutes,
  },
  {
    path: "/article",
    route: ArticleRoutes,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },
  {
    path: "/messages",
    route: MessagesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
