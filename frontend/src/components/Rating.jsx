const Star = ({ filled }) => {
  let fillColor;
  if (filled === "full") fillColor = "#facc15"; // yellow-400
  else if (filled === "half") fillColor = "url(#half)";
  else fillColor = "#d1d5db"; // gray-300

  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={fillColor} className="mr-0.5">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#d1d5db" />
        </linearGradient>
      </defs>
      <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847L19.335 24 12 20.018 4.665 24 6 15.6 0 9.753l8.332-1.735z" />
    </svg>
  );
};

const Rating = ({ value }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i) stars.push(<Star key={i} filled="full" />);
    else if (value >= i - 0.5) stars.push(<Star key={i} filled="half" />);
    else stars.push(<Star key={i} filled="empty" />);
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-2 text-sm text-gray-700 rating-text">
        {value.toFixed(1)} / 5
      </span>
    </div>
  );
};

export default Rating;
