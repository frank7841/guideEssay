import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface PROPS {
  id: number;
  title: string;
  body: string;
}
export default function FeatureCard(props: PROPS) {
  const { title, body } = props;
  return (
    <Card sx={{ width: 400, p: 4, boxShadow: "none" }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 24,
            border: "none",

            fontWeight: "bold",
          }}
          //   color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <div className="text-gray-600">{body}</div>
      </CardContent>
    </Card>
  );
}
