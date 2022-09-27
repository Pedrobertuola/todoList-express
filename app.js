const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model(
  "Item",
  itemsSchema
);  

const studyEnglish = new Item({
  name: "Study English"
})


const studyJavascript = new Item({
  name: "Study Javascript"
})


const practiceJiujitsu = new Item({
  name: "Practice Jiu-jitsu"
})



const defaultItems = [studyEnglish, studyJavascript, practiceJiujitsu];






app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", function (req, res) {

  Item.find({},function(err, results){

    if (results.length === 0) {
       Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Successfully saved default items to DB.")
  } 
});
  res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: results });
    }      
    })  
  })
;

app.post("/", function (req, res) {

  const itemName = req.body.newItem;  

  const item = new Item({
    name: itemName
  })

  item.save();

  res.redirect("/");
  
  
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", function(req, res){
  res.render("about")
})

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("work");
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
