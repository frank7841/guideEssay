import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface PROPS {
  id: number;
  icon: string;
  title: string;
  body: string;
}
export default function ProcessCard(props: PROPS) {
  const { title, body, id } = props;
  return (
    <Card sx={{ width: 400, p: 4, boxShadow: "none" }}>
      <CardContent>
        <div className="items-center justify-center flex">
          <img
            src={
              id === 1
                ? require("../images/icon-file.svg").default
                : id === 2
                ? require("../images/icon-support.svg").default
                : require("../images/icon-done.svg").default
            }
            className="bg-[#234764] px-3 py-3 rounded-full shadow-2xl"
            alt="icon svg"
          />
        </div>
        <Typography
          sx={{
            fontSize: 24,
            border: "none",
            boxShadow: "none",
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
