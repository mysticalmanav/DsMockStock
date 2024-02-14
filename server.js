const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
var cors = require('cors');
app.use(cors());

//connect database
connectDB();
//init middleware
app.use(express.json({ extended: false }));
//define routes
// app.use("/",(req,res)=>{
//     res.send('API running');
// })
app.use("/api/portfolio", require("./routes/api/portfolio"));
app.use("/api/news", require("./routes/api/news"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/stocks", require("./routes/api/stock"));
app.use("/api/stocks", require("./routes/api/stock"));
app.use("/api/result", require("./routes/api/result"));

// app.use("/api/posts", require("./routes/api/posts")); 
//static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
