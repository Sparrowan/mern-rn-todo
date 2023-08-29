import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"
import {userRegister, userLogin, userLogout} from "../controllers/users"

const router: Router = Router()

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/logout", userLogout)

export default router