import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"
import { userRegister, userLogin, userLogout } from "../controllers/users"
import { validateRequest } from "../middlewares/validateRequest"
import { userRegisterSchema, userLoginSchema } from "../yup/userSchema"
import { todoCreateSchema } from "../yup/todoSchema"
import { verifyToken } from "../middlewares/verifyToken"

const router: Router = Router()

router.get("/todos", verifyToken, getTodos)

router.post("/add-todo", verifyToken, validateRequest(todoCreateSchema), addTodo)

router.put("/edit-todo/:id", verifyToken, updateTodo)

router.delete("/delete-todo/:id", verifyToken, deleteTodo)

router.post("/register", validateRequest(userRegisterSchema), userRegister)
router.post("/login", validateRequest(userLoginSchema), userLogin)
router.post("/logout", userLogout)

export default router