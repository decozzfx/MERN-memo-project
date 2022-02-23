import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find()
        // console.log(postMessages)

        res.status(201).json(postMessages)
    } catch (error) {
        res.status(404).json({ message : error.message })
    }
}

// params and query actually is deferent thing
// Query -> /posts?page=1 -> page = 1               // for query some data, like search, some fetch data, etc
// Params => /posts/:id -> /posts/123 -> id = 123  // to get specifict resource data  

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    // console.log(tags)
    try {
        const title = new RegExp(searchQuery, 'i') // RegExp -> regular expression // i stand for ignore case , Test test tesT -> test
        
        const posts = await PostMessage.find({ $or: [ { title },{ tags: { $in : tags.split(',') } } ]})  // $or -> eather find title or tags , so find the post that match eather or // $in -> in the array are matches for query

        res.status(200).json({ data : posts })

    } catch (error) {
        res.status(404).json({ message : error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // console.log(req)

    const newPostMessage = new PostMessage({ ...post, creator : req.userId, createdAt : new Date().toISOString() }) // creator automaticly specify the creator of specify post , //toIsoString to make sure Date show the value when it was created

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id : _id } = req.params
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new : true })

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId(id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(id)

    res.json({ message : 'post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId) return res.json({ message : 'Unauthenticated' })

    if(!mongoose.Types.ObjectId(id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(id)

    //check if userId is already like the post or yet
    const index = post.likes.findIndex((id) => id === String(req.userId)) //if that case id already in there that mean that id already like the post 

    if( index == -1){ // if the id isn't in index 
        post.likes.push(req.userId) // like a post
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId)) // return array of the likes beside id that likes
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new : true })

    res.json(updatedPost)
}