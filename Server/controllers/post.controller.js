import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    let { title, text, anonymous = true } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Post text is required" });
    }

    anonymous = anonymous === 'true';

    // Prepare media data
    let media = {};
    if (req.file) {
      // Single file
      media = {
        url: req.file.path,      // Cloudinary URL
        public_id: req.file.filename, // Cloudinary public_id
      };
    }

    // For multiple files:
    // if (req.files) {
    //   media = req.files.map(f => ({ url: f.path, public_id: f.filename }));
    // }

    const post = new Post({
      title,
      text: text.trim(),
      anonymous,
      media,
      authorRef: req.user._id, // ALWAYS set this so "My Activity" works
    });

    await post.save();

    res.status(201).json({
      success: true,
      postId: post._id,
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ message: "Server error while creating post" });
  }
};


export const replyToPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.replies.push({ text, admin: true });
  await post.save();

  res.status(200).json({ message: "Reply added successfully" });
};

export const getPost = async (req, res) => {
  const { postId } = req.params;

  if (postId === "all") {
    const posts = await Post.find().populate("authorRef", "username _id");
    return res.status(200).json({ posts });
  }

  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  let post = await Post.findById(postId).populate("authorRef", "username _id");
  if (!post) return res.status(404).json({ message: "Post not found" });

  post = post.toObject();
  if (post.anonymous) {
    delete post.authorRef; // Hide author if anonymous
  }

  res.status(200).json({ post });
};


export const updatePostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { status } = req.body; // expected "done" or "pending"

    if (!["done", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.status = status;
    await post.save();

    res.status(200).json({ message: `Post marked as ${status}`, post });
  } catch (err) {
    console.error("Update Post Status Error:", err);
    res.status(500).json({ message: "Server error while updating post status" });
  }
};

export const getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find({ anonymous: false }).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPrivatePosts = async (req, res) => {
  try {
    const posts = await Post.find({ anonymous: true }).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    // Using a simplistic increment/decrement based on frontend request for now
    const adjust = req.body.adjust === -1 ? -1 : 1;
    post.likes = Math.max(0, (post.likes || 0) + adjust);
    
    await post.save();
    res.status(200).json({ success: true, likes: post.likes });
  } catch (err) {
    console.error("Like Post Error:", err);
    res.status(500).json({ message: "Server error while liking post" });
  }
};

export const getMyActivity = async (req, res) => {
  try {
    const posts = await Post.find({ authorRef: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error("Get My Activity Error:", err);
    res.status(500).json({ message: "Server error fetching activity" });
  }
};


