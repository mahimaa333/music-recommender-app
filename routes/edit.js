var express = require('express');
var router = express.Router();
const Student = require('../models/student');


router.get('/', (req, res) => {
    Student.find({}, (err, tasks) => {
        res.render("edit.ejs", { Student: tasks });
        });

});
router.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
Student.find({}, (err, tasks) => {
res.render("nameedit.ejs", { Student: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/profile");
});
});


router.post('/', async function(req, res){
    const Student = new Student({
        content: req.body.content
        });
        try {
        await Student.save();
        res.redirect("/profile");
        } catch (err) {
        res.redirect("/profile");
        }

});

module.exports = router;
