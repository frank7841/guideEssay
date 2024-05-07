import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Input } from "antd";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface PROPS {
  styleReference: string;
  setPageNumber: (value: string) => void;
  setStyleReference: (value: string) => void;
  sourcesCount: number;
  setSourcesCount: (value: number) => void;
  topic: string;
  setTopic: (value: string) => void;
  file: any;
  setFile: any;
  instructions: string;
  setInstructions: (value: string) => void;
  moveToPageThree: () => void;
  allStyles: [
    {
      _id: string;
      subjectName: string;
    }
  ];
  referencingStyles: [
    {
      _id: string;
      amount: string;
      referencingStyleType: string;
    }
  ];
}

export default function AdditionalPaperDetailsCard(props: PROPS) {
  const {
    setPageNumber,
    styleReference,
    setStyleReference,
    sourcesCount,
    setSourcesCount,
    topic,
    setTopic,
    setFile,
    file,
    instructions,
    setInstructions,
    // allStyles,
    referencingStyles,
    moveToPageThree,
  } = props;

  const handleChangeStyleReference = (event: SelectChangeEvent) => {
    setStyleReference(event.target.value);
  };
  const handleInputChange = (event: any) => {
    // console.log(event);
    const value = parseInt(event.target.value);

    if (!isNaN(value)) {
      value >= 100 ? setSourcesCount(100) : setSourcesCount(value);
    }
  };
  const handleChangeTopic = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(event.target.value);
  };
  const handleChangeInstructions = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInstructions(event.target.value);
  };
  const handleInputImageChange = (value: any) => {
    if (value.target.files && value.target.files.length > 0) {
      console.log(value.target.files);
      // setCrop(undefined); // Makes crop preview update between images.
      setFile((prev: any) => [...prev, value.target.files]);
    }
    // setImage(value.target.value);
  };

  return (
    <Card sx={{ minWidth: 350, borderRadius: 4 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold" }}
          color="text.black"
          gutterBottom
        >
          Additional paper details
        </Typography>
        <div className="flex flex-col">
          <div className="flex lg:space-x-4 items-center justify flex-wrap">
            <div className="w-full lg:w-1/2">
              <div>Topic</div>
              <div>
                <Input.TextArea
                  className="border-2  py-4  rounded-md mt-1   mb-3 px-2 bg-gray-50  border-gray-500"
                  placeholder="Any topic (Writers choice)"
                  rows={1}
                  value={topic}
                  onChange={handleChangeTopic}
                  // onChange={handleChangeUsername}
                  // value={username}
                />
              </div>
            </div>
            <div className="">
              <div>Number of sources</div>
              <div className="border mt-2 border-gray-400 rounded-lg py-2 flex items-center space-x-2 text-center">
                <button
                  type="submit"
                  aria-label="reduce"
                  onClick={() => {
                    setSourcesCount(Math.max(sourcesCount - 1, 0));
                  }}
                  className="px-2 text-blue-400"
                >
                  <RemoveIcon fontSize="small" />
                </button>
                <div className="border border-gray-400 h-8 "></div>
                <div>
                  <input
                    value={sourcesCount}
                    onChange={handleInputChange}
                    className="w-12 border-none px-2 focus:border-none hover:border-none"
                  />
                </div>
                <div className="border border-gray-400 h-8  "></div>
                <button
                  aria-label="increase"
                  className=" px-2 text-blue-400"
                  onClick={() => {
                    if (sourcesCount >= 100) {
                      setSourcesCount(100);
                    } else {
                      setSourcesCount(sourcesCount + 1);
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>
            </div>
            <div>
              <div className="lg:-mt-4">Referencing style</div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Reference style
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={styleReference}
                  label="Reference style"
                  onChange={handleChangeStyleReference}
                >
                  {referencingStyles.map(
                    (item: {
                      _id: string;
                      amount: string;
                      referencingStyleType: string;
                    }) => {
                      return (
                        <MenuItem key={item._id} value={item._id}>
                          {item.referencingStyleType}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div>
          <Input.TextArea
            className="border-2  py-4  rounded-md mt-1   mb-3 px-2 bg-gray-50  border-gray-500"
            placeholder="Add any information for the writer that you consider necessary. you can add or edit your instructions later if needed."
            rows={4}
            value={instructions}
            onChange={handleChangeInstructions}
            // onChange={handleChangeUsername}
            // value={username}
          />
        </div>
        <div className="outline-2 outline-dashed  rounded-xl mt-4 border-gray-500 relative">
          <input
            type="file"
            accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            // value={}
            multiple
            onChange={handleInputImageChange}
            className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
          />
          <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#3aaade"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="#ccfff5"
                className="w-16 h-16 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
            </div>

            <div className="mt-2 text-gray-400">
              Drag &#38; Drop your files here
            </div>
          </div>
        </div>
        {file.map((singleFile: any) => {
          return (
            <div className="mt-4 space-x-4 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span>{singleFile[0].name}</span>
            </div>
          );
        })}
      </CardContent>
      <div className="justify-between flex mb-8 px-4">
        <button
          onClick={() => {
            setPageNumber("one");
            window.scrollTo(0, 0);
          }}
          className="text-gray-600 px-4 py-2 font-sans  rounded-md flex space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          <span>Previous Step</span>
        </button>
        <button
          onClick={moveToPageThree}
          className="bg-blue-400 px-4 py-2 font-sans  rounded-md text-white"
        >
          Next Step
        </button>
      </div>
    </Card>
  );
}
