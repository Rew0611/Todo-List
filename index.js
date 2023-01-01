const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb+srv://rew:rew123@cluster0.niuuu6x.mongodb.net/todolist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

const todoSchema = {
  task: String,
};

const todo = mongoose.model("Todolist", todoSchema);

var items = [];

app.get("/", function (req, res) {
  todo.find({}, function (err, tasx) {
    if (err) console.log(err);
    else res.render("index", { item: tasx });
  });
});

app.post("/", function (req, res) {
  const to = new todo({
    task: req.body.task,
  });
  to.save(function (err) {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  todo.deleteOne({ _id: req.body.name }, function (err) {
    if (err) console.log(err);
    else res.redirect("/");
  });
});

app.listen(process.env.PORT||3000, function () {
  console.log("your app is running on port 3000");
});
