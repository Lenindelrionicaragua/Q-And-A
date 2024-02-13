import React, { useEffect, useState } from "react";

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const postedDate = new Date(createdAt);
      const timeDifference = currentDate - postedDate;

      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let result;
      if (days > 0) {
        result = `${days} day${days === 1 ? "" : "s"} ago`;
      } else if (hours > 0) {
        result = `${hours} hour${hours === 1 ? "" : "s"} ago`;
      } else {
        result = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      }

      setTimeAgo(result);
    };

    calculateTimeAgo();

    // Update the time every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
