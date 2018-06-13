var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blogModel");

router.get("/", function(req, res){
    Blog.find({}, function(error, blogs){
        if(error){
            console.log(error.message);
        } else{
            res.render("index", { blogs : blogs});
        }
    })
})

// NEW ROUTE
router.get("/new", function(req ,res){
    res.render("new");
})

// CREATE ROUTE
router.post("/", function(req, res){
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
})

// SHOW ROUTE
router.get("/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog : foundBlog});
        }
    })
})

// EDIT ROUTE
router.get("/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog : foundBlog });
        }
    })
})

// UPDATE ROUTE
router.put("/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// DELETE ROUTE
router.delete("/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, deletedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
            console.log(deletedBlog);
        }
    })
})

module.exports = router;