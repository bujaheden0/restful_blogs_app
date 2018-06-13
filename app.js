var bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"), 
    mongoose            = require("mongoose"),    
    express             = require("express"),
    app                 = express(),
    blogRoutes          = require("./routes/blog"),
    PORT                = process.env.PORT || 3000;

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
// MONGOOSE/MODEL CONFIG

// RESFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.use("/blogs", blogRoutes);
app.all("*", function(req, res, next){
    res.send("Sorry page not found");
})
app.listen(PORT, function(){
    console.log("Server is running");
})