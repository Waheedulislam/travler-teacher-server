import { Router } from "express";
import { TeacherController } from "./teacher.controller";

const router = Router();

router.get("/", TeacherController.getAllTeacher);

router.post("/create-teacher", TeacherController.CreateTeacher);

// router.patch("/:id/status", UserController.updateUserStatus);

export const TeacherRoutes = router;
