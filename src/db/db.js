const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI ||
  "mongodb+srv://blog:blog@blog.du127.mongodb.net/blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
