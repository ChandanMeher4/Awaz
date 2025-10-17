import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  admin: { type: Boolean, default: true }, // true if reply is from admin
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: false }, // ADD THIS: For public post titles
  text: { type: String, required: true },
  media: { url: String, public_id: String }, // This structure is better
  anonymous: { type: Boolean, default: true },
  authorRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  replies: [replySchema],
  likes: { type: Number, default: 0 },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }, // <-- ADD THIS
  likes: { type: Number, default: 0 } // ADD THIS: For public posts
}, { timestamps: true });


export default mongoose.model("Post", postSchema);
