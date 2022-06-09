import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <div className="user-review">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
      </div>
      <p className="reviewCardComment">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
