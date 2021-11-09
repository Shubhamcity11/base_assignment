const express = require('express'),
      router = express.Router();
const {getTodos, addTodo, deleteTodo, updateTodo, markTodoComplete} = require("../controllers/todo")

router.get("/todos",getTodos);
router.post("/todo",addTodo);
router.put("/todo/:id",updateTodo);
router.put("/todo/mark/:id",markTodoComplete);
router.delete("/todo/:id",deleteTodo);

module.exports = router;