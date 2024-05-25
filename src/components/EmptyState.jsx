import { Link } from "react-router-dom";

const EmptyState = ({ description }) => {
  return (
    <div className="text-center empty-cart">
      <i className="bi bi-heart" />
      <p>{description}.</p>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default EmptyState;
