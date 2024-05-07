import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmed() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen px-4 lg:px-2">
      <Card sx={{ minWidth: 350 }}>
        <CardContent>
          <div className="flex justify-center mb-4">
            <img
              src={require("../images/iconscongs.png")}
              alt="congratulation"
            />
          </div>
          <Typography variant="h5" component="div">
            Your Order is Complete
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 2 }} color="text.secondary">
            your order has been received successfully. you can view your orders
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate("/profile")}>
            View your orders
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
