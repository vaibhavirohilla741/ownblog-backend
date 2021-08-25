const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Articles = require("../models/articles");
const User = require("../models/user");

router.get("/", (req, res) => {
  Articles.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Request Add New Article
router.post("/add", auth, (req, res) => {
  const newArticle = new Articles({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
    owner: req.user,
  });
  newArticle
    .save()
    .then(() => res.json("The New Article Posted Successfully!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//Request Find Article By ID
router.get("/:id", (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//Request Find User Articles
/* router.post("/myarticles", auth, async (req, res) => {
  console.log("in myarticle route");
  try {
    const user = await User.findById("6114b69216104e25005af21d")
    await user.populate("articles").execPopulate();
    console.log(user.articles);
    res.send(user.articles);
  } catch (e) {
    res.status(500).send();
  }
}); */
router.post("/myarticles", auth, async (req, res) => {
  try {
      console.log(req.user);
    const user = await User.findById(req.user);
    await user.populate("articles").execPopulate();
    console.log("User Tasks " + user.articles);
    res.json(user.articles);
  } catch (e) {
    res.status(500).send();
  }
});

//Likes
router.post("/:id", (req, res) => {
  console.log(req.body.likeMessage);
  Articles.findById(req.params.id)
  
    .then((article) => {
      if(req.body.likeMessage==="like")
      article.likes += 1;
      else if(req.body.likeMessage==="unlike")
      article.likes -= 1;
      
      article.save();
      res.send(article)
      
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

//Request Find Article By ID And Update
router.post("/update/:id",  (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.authorname = req.body.authorname;

      article
        .save()
        .then((article) => res.json("Article is updated Successfully"))
        .catch((err) => res.status(400).json(`Error ${err}`));
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});
//Request Find Article By ID And Delete
router.delete("/:id", (req, res) => {
  Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("Article is Deleted"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

module.exports = router;
