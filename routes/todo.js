const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const TodoTask = require("../models/todo");

// const todoSchema = new mongoose.Schema({
//     content:{
//         type:String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });
// var Todo = mongoose.model("lists",todoSchema);

router.get('/', (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
        });

});

router.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/todo");
});
});

router.post('/', async function(req, res){
    const todoTask = new TodoTask({
        content: req.body.content
        });
        try {
        await todoTask.save();
        res.redirect("/todo");
        } catch (err) {
        res.redirect("/todo");
        }

});

router.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/todo");
    });
    });

module.exports = router;
