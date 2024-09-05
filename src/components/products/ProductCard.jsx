import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/productSlice";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={product?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price : {product?.price}
        </Typography>
        <div className="flex justify-center">
          <Typography variant="p">
            <StarRating rating={product?.rating} />
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleAddToCart(product)} size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
