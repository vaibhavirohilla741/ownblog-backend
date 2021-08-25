const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
require("./db/db");

const articlesRouter = require("./routes/articles");
const userRouter = require("./routes/user");
const User = require("./models/user");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the backend");
});

app.use("/articles", articlesRouter);
app.use("/users", userRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}


app.listen(port, () => {
  console.log(`Server is running on Port : ${port}`);
});
