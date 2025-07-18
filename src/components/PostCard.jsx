import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  const imageUrl = post.small_image?.[0]?.url;
  const title = post.title;
  const publishedDate = new Date(post.published_at);
  const formattedDate = publishedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
        <h2 className="text-lg font-semibold line-clamp-3">{title}</h2>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    small_image: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
    ]),
    title: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
