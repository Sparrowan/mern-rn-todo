import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"
import { userRegister, userLogin, userLogout } from "../controllers/users"
import validate from "../middlewares/userValidateRequest"
import { userSchema } from "../yup/userSchema"

const router: Router = Router()

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

router.post("/register", validate(userSchema), userRegister)
router.post("/login", userLogin)
router.post("/logout", userLogout)

export default router