import { Router } from "express";
import UserService from "../services/userService/UserService";
import validate from "../middlwares/validate";
import { validationSchema } from "../services/userService/validationSchema";

const userRoutes = Router();

userRoutes.get("/find", validate(validationSchema), UserService.findUser);

export default userRoutes;
