const {Postmodel} = require("../models/usermodel")
const {PostSchema} = require('../schemas')
const {ExpressError} = require('../utils/ExpressError')
class postController{
    static homepage = (req,res) => {
        res.render("home")
    }
    

    static getpost = async(req,res) =>{
        try {
            const result = await Postmodel.find()
            // console.log(result)
            res.render("showpost", {result})
        } catch (error) {
          console.log(error)  
        }
       
    }
    static createpost = (req,res) =>{
        res.render("new")
    }
    static newpost = async(req,res)=>{

        const post = new Postmodel(req.body.post)
        post.author = req.user._id;
        
        await post.save();
    
        res.redirect(`/posts/${post._id}`)
    };

    static showpost = async(req,res)=>{
  try {
     const post = await Postmodel.findById(req.params.id).
populate('author')

console.log(post)
    //  console.log(post)
   
     res.render("show", {post})
  } catch (error) {
            console.log(error)
        }
       
    }
  
    static editpost = async(req,res) =>{
        try {
            const post = await Postmodel.findById(req.params.id)
           
            res.render("edit", {post})
         } catch (error) {
                   console.log(error)
               }
              
    }
    static updatepostById = async(req,res) =>{
     const {id} = req.params;
     const post =  await Postmodel.findById(id)
    if(!post.author.equals(req.user._id)){
        console.log('You do not have permission to do that')
       return res.redirect(`/posts/${post._id}`) 
    }
       const updatepost = await Postmodel.findByIdAndUpdate(id,{...req.body.post})
      
        res.redirect(`/posts/${post._id}`)

    }
    static deletepostById = async(req,res) =>{
        const {id} = req.params;
        await Postmodel.findByIdAndDelete(id);
       
        res.redirect('/posts')
    }

    
}
const validatePost = (req, res, next) => {
    const { error } = PostSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports = {postController,validatePost}