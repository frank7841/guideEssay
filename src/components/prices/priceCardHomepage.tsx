import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PROPS {
  id: number;
  title: string;
  priceRange: string;
}
export default function PriceCardHomePage(props: PROPS) {
  // const [essay, setEssay] = React.useState('');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setEssay(event.target.value);
  // };
  return (
    <Card sx={{ minWidth: 350, borderRadius: 4 }}>
      <div className=" peer/published hover:bg-blue-400 hover:text-white ">
        <CardContent>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold" }}
            color="text.#ffffff"
            gutterBottom
          >
            {props.title}
          </Typography>
          <div>
            <span className="">From</span>{" "}
            <span className="font-bold text-blue-400 text-4xl hover:text-white">
              {props.priceRange}
            </span>{" "}
            <span className="">/page</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
