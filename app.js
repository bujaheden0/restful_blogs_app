var bodyParser = require("body-parser"), 
    mongoose   = require("mongoose"),    
    express    = require("express"),
    app        = express(),
    PORT       = process.env.PORT || 3000;

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

// RESFUL ROUTES
app.get("/", function(req, res){
    res.redirect("index");
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error.message);
        } else{
            res.render("index", { blogs : blogs});
        }
    })
})

app.listen(PORT, function(){
    console.log("Server is running");
})