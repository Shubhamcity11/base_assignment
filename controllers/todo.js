const todo = require("../models/todo")
const {createError} = require("../middlewares/helpers")
const constants = require("../utils/constants")

exports.getTodos = async (req, res, next) => {
    let todos = await todo.findAll();
    let completed = [], not_completed = []
    for(let t of todos){
        if(t.completed === true){
            completed.push(t)
        }
        else not_completed.push(t)
    }
    return res.status(constants.SUCCESS).json({
        completed: completed,
        not_completed: not_completed
    })
}

exports.addTodo = async (req, res, next) => {
    let payload = req.body.payload;
    let newTodo = await todo.create({
        body: payload,
        completed: false
    })
    return res.status(constants.SUCCESS).json({
        message: constants.TODO_CREATED,
        id: newTodo.id 
    })
}

exports.updateTodo = async(req, res, next) => {
    try{
        let id = req.params.id;
        let payload = req.body.payload
        let data = await todo.findOne({where: {id: id}});
        if(data == null){
            throw createError(constants.TODO_NOT_FOUND, constants.NOT_FOUND);
        }
        await todo.update({body: payload}, {where: {id: id}});
        return res.status(constants.SUCCESS).json({message: constants.TODO_UPDATED});
    }
    catch(err){
        next(err);
    }
}

exports.markTodoComplete = async(req, res, next) => {
    try{
        let id = req.params.id;
        let data = await todo.findOne({where: {id: id}});
        if(data == null){
            throw createError(constants.TODO_NOT_FOUND, constants.NOT_FOUND);
        }
        await todo.update({completed: true}, {where: {id: id}});
        return res.status(constants.SUCCESS).json({message: "successful"});
    }
    catch(err){
        next(err);
    }
}

exports.deleteTodo = async(req, res, next) => {
    try{
        let id = req.params.id;
        let data = await todo.findOne({where: {id: id}});
        if(data == null){
            throw createError(constants.TODO_NOT_FOUND, constants.NOT_FOUND);
        }
        await todo.destroy({where: {id: id}});
        return res.status(constants.SUCCESS).json({message: constants.TODO_DELETED});
    }
    catch(err){
        next(err);
    }
}