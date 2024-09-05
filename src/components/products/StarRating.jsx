import React from "react";
import { Star, StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const StarRating = ({ rating }) => {
  return (
    <div>
      {Array.from(Array(5), (e, i) => {
        const isActive = i < rating;
        return (
          <IconButton key={i} sx={{ color: isActive ? "#FFFF00" : "#808080" }}>
            {isActive ? (
              <Star fontSize="small" />
            ) : (
              <StarBorder fontSize="small" />
            )}
          </IconButton>
        );
      })}
    </div>
  );
};

export default StarRating;
