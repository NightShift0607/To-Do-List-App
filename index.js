import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
var todayDate = "";
var list1 = [];
var list2 = [];

function setDate(req, res, next) {
    var month;
    var day;
    var dat;
    const today = new Date();
    switch (today.getMonth()) {
        case 0:
            month = "January"
            break;
        case 1:
            month = "February"
            break;
        case 2:
            month = "March"
            break;
        case 3:
            month = "April"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "June"
            break;
        case 6:
            month = "July"
            break;
        case 7:
            month = "August"
            break;
        case 8:
            month = "September"
            break;
        case 9:
            month = "October"
            break;
        case 10:
            month = "November"
            break;
        case 11:
            month = "December"
            break;
    }
    switch (today.getDay()) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
    }
    dat = today.getDate();
    todayDate = day + ", " + month + " " + dat;
    next();
}
app.use(setDate);




app.get("/", (req,res) => {
    let length = list1.length;
    res.render(__dirname + "/views/index.ejs", { 
        date : todayDate,
        value : list1,
        len : length
    });
})

app.post("/", (req, res) => {
    var inputValue = req.body['newItem'];
    list1.push(inputValue);
    let length = list1.length;
    res.render(__dirname + "/views/index.ejs", {
        date : todayDate,
        value : list1,
        len : length
    });
})

app.get("/work", (req,res) => {
    let length = list2.length;
    res.render(__dirname + "/views/work.ejs", { 
        value : list2,
        len : length
    });
})

app.post("/work", (req, res) => {
    var inputValue = req.body['newItem'];
    list2.push(inputValue);
    let length = list2.length;
    res.render(__dirname + "/views/work.ejs", {
        value : list2,
        len : length
    });
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})