import { useState } from 'react';

// SVG Icon Components
const LikeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.787l.09.044a2 2 0 002.268-.002l.09-.044a2 2 0 001.106-1.787v-5.43A2.5 2.5 0 0010 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3c0 .351-.07.686-.195 1.002a2.5 2.5 0 00-1.254 1.331z" />
  </svg>
);

const CommentIcon = () => (
  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
    <path
      fillRule="evenodd"
      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9z"
      clipRule="evenodd"
    />
  </svg>
);

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const renderMedia = () => {
    if (!post.mediaUrl) return null;

    if (post.mediaType === 'image') {
      return (
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-700 group">
          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      );
    }

    if (post.mediaType === 'video') {
      return (
        <video
          src={post.mediaUrl}
          controls
          className="w-full h-auto mt-4 rounded-lg bg-black border border-gray-700"
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden my-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {post.icon}
          </div>
          <span className="font-semibold text-white">{post.user}</span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
        <p className="text-gray-300 leading-relaxed">{post.description}</p>

        {renderMedia()}

        {/* Poll */}
        {post.pollOptions && post.pollOptions.length > 0 && (
          <div className="mt-5 space-y-2">
            <h4 className="font-semibold text-gray-300">Poll:</h4>
            {post.pollOptions.map((option, index) => (
              <button
                key={index}
                className="w-full text-left p-3 bg-gray-700/60 border border-gray-600 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800 border-t border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 font-medium transition-colors duration-200 ${
            hasLiked ? 'text-blue-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <LikeIcon />
          <span>{likes} Likes</span>
        </button>

        <div className="flex items-center space-x-2 text-gray-400">
          <CommentIcon />
          <span>{comments.length} Comments</span>
        </div>
      </div>

      {/* Comments */}
      <div className="p-5 border-t border-gray-700 bg-gray-800/70">
        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {comments.map((comment, index) => (
            <p
              key={index}
              className="text-gray-200 text-sm bg-gray-700/70 p-2.5 rounded-lg hover:bg-gray-600/70 transition-colors duration-200"
            >
              {comment}
            </p>
          ))}
        </div>

        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 active:scale-95 transition-transform"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
