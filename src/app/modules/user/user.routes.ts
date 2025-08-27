import { Router } from "express";
import { UserController } from "./user.controller";
import clientInfoParser from "../../middleware/clientInfoParser";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/users", UserController.getAllUser);

router.post(
  "/create-user",
  clientInfoParser,
  validateRequest(UserValidation.userValidationSchema),
  UserController.registerUser
);
router.patch("/:id", UserController.updateProfile);

export const UserRoutes = router;
