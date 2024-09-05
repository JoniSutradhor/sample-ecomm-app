import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.product.cart);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#333", color: "#fff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
          >
            JK ECOMM
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/products")}
          >
            Products
          </Typography>
          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
