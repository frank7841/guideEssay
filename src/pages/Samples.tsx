import React from "react";
import SamplesCard from "../components/samples/sampleCard";
import OrderCard from "../components/order/addOrder";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { samplesArrays } from "../helpers/sampleData";

export default function Samples() {
  const [essay, setEssay] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEssay(event.target.value);
  };
  return (
    <div className="px-4 md:px-8 mt-4 mb-4">
      <h1 className="font-bold text-2xl text-center sm:text-start mb-4 sm:ml-2 ">
        Samples
      </h1>
      <div className="flex flex-wrap">
        <div>
          <div className="ml-2">Academic level</div>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">All</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={essay}
              label="All"
              onChange={handleChange}
            >
              <MenuItem value={1}>High School</MenuItem>
              <MenuItem value={10}>College</MenuItem>
              <MenuItem value={20}>undergraduate</MenuItem>
              <MenuItem value={30}>Master </MenuItem>
              <MenuItem value={30}>Ph.D </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <div className="ml-2">Discipline</div>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">All</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={essay}
              label="All"
              onChange={handleChange}
            >
              <MenuItem value={1}>Sociology</MenuItem>
              <MenuItem value={10}>Psychology</MenuItem>
              <MenuItem value={20}>Business studies</MenuItem>
              <MenuItem value={30}>Biology(and other Life sciences) </MenuItem>
              <MenuItem value={30}>English 101 </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-row  justify-between mt-4   ">
        <div className="w-5/5 md:w-4/5 ">
          {samplesArrays.map((item) => {
            return <SamplesCard items={item} />;
          })}
        </div>
        <div className="hidden lg:block mt-4 px-8 text-center font-bold">
          <OrderCard />
        </div>
      </div>
    </div>
  );
}
