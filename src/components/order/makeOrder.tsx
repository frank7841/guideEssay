import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import DiamondIcon from "@mui/icons-material/Diamond";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

interface PROPS {
  pageNumber: string;
  setValue: any;
  Value: any;
  setPageNumber: (value: string) => void;
  work: string;
  setWork: (value: string) => void;
  setWorkText: (value: string) => void;
  setWorkAmount: (value: number) => void;
  subject: string;
  setSubject: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  setLevelText: (value: string) => void;
  setLevelAmount: (value: number) => void;
  setDeadlinePrice: (value: number) => void;
  setAlignmentAmount: (value: number) => void;
  deadline: string;
  levelAmount: number;
  setDeadline: (value: string) => void;
  expertLevel: string;
  setExpertLevel: (value: string) => void;
  terms: boolean;
  setTerms: (value: boolean) => void;
  pagesCount: number;
  setPagesCount: (value: number) => void;
  alignment: string;
  setAlignment: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  errorNot: string;
  setErrorNot: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  moveToPageTwo: () => void;
  data: {
    allWork: [
      {
        _id: string;
        workType: string;
        amount: string;
      }
    ];
    allSubjects: [
      {
        _id: string;
        subjectName: string;
      }
    ];
    academicLevels: [
      {
        academicLevel: string;
        _id: string;
        amount: string;
      }
    ];
    allDaysOfCompletion: [
      {
        _id: string;
        days: string;
      }
    ];
    allWords: [
      {
        _id: string;
        words: string;
      }
    ];
    allPriceRates: [
      {
        _id: string;
        hourlyRate: string;
        pricePerDoublePage: string;
        pricePerSinglePage: string;
      }
    ];
  };
}

export default function MakeOrderCard(props: PROPS) {
  const {
    work,
    setWork,
    setWorkText,
    setWorkAmount,
    subject,
    setSubject,
    level,
    levelAmount,
    setLevel,
    setLevelText,
    setLevelAmount,
    setDeadlinePrice,
    setAlignmentAmount,
    // deadline,
    setDeadline,
    expertLevel,
    setExpertLevel,
    terms,
    setTerms,
    pagesCount,
    setPagesCount,
    alignment,
    setAlignment,
    email,
    setEmail,
    setPhoneNumber,
    moveToPageTwo,
    setValue,
    Value,
    // errorNot,
    data,
  } = props;

  React.useEffect(() => {
    if (alignment === "0") {
      // console.log(pagesCount * levelAmount)
      setAlignmentAmount(pagesCount * levelAmount);
    } else {
      setAlignmentAmount(pagesCount * levelAmount * 2);
    }
  }, [alignment, setAlignmentAmount, levelAmount, pagesCount]);
  // React.useEffect(() => {
  //   if (alignment === "0") {
  //     setAlignmentAmount(
  //       pagesCount * parseInt(data.allPriceRates[0].pricePerDoublePage)
  //     );
  //   } else {
  //     setAlignmentAmount(
  //       pagesCount * parseInt(data.allPriceRates[0].pricePerSinglePage)
  //     );
  //   }
  // }, [alignment, setAlignmentAmount, data.allPriceRates, pagesCount]);

  const timeChangeHandler = (value: any) => {
    // @ts-ignore
    let hoursTaken = (new Date(value._d) - new Date()) / (60 * 60 * 1000);

    let hourlyRate = data.allPriceRates[0].hourlyRate;
    if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 1))
    ) {
      // console.log(new Date(hoursTaken));
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate) * 40);
    } else if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 2))
    ) {
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate) * 10);
    } else if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 3))
    ) {
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate) * 5);
    } else if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 4))
    ) {
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate) * 2);
    } else if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 8))
    ) {
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate));
    } else if (
      new Date(value._d) <=
      new Date(new Date().setHours(new Date().getHours() + 24))
    ) {
      setDeadlinePrice(hoursTaken * parseInt(hourlyRate));
    } else {
      setDeadlinePrice((hoursTaken / 2) * parseInt(hourlyRate));
    }

    setDeadline(new Date(value._d).toISOString());
  };

  const handleChangeExpertLevel = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpertLevel(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeWork = (event: SelectChangeEvent) => {
    setWork(event.target.value);
    // setWorkText(event.target.value);
  };
  const handleChangeSubject = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
  };

  const handleInputChange = (event: any) => {
    // console.log(event);
    const value = parseInt(event.target.value);

    if (!isNaN(value)) {
      value >= 200 ? setPagesCount(200) : setPagesCount(value);
    }
  };
  const handleChangeElement = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const newno = (event: string) => {
    setPhoneNumber(event);
    setValue(event);
  };

  var yesterday = moment().subtract(1, "day");
  var valid = function (current: any) {
    return current.isAfter(yesterday);
  };

  return (
    <Card sx={{ minWidth: 350, borderRadius: 4 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold" }}
          color="text.black"
          gutterBottom
        >
          Type of work and deadline
        </Typography>
        <div className="flex flex-col">
          <div className="flex space-x-4 items-center flex-wrap">
            <div>
              <div>Type of work</div>
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Type of work
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={work}
                  label="Work"
                  onChange={handleChangeWork}
                >
                  {data.allWork.map((item) => {
                    return (
                      <MenuItem
                        key={item._id}
                        value={item._id}
                        onClick={() => {
                          setWorkText(item.workType);
                          setWorkAmount(parseInt(item.amount));
                        }}
                      >
                        {item.workType}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="mt-6">
              <div>Number of pages</div>
              <div className="border mt-2 border-gray-400 rounded-lg py-2 flex items-center space-x-2 text-center">
                <button
                  type="submit"
                  aria-label="reduce"
                  onClick={() => {
                    setPagesCount(Math.max(pagesCount - 1, 0));
                  }}
                  className="px-2 text-blue-400"
                >
                  <RemoveIcon fontSize="small" />
                </button>
                <div className="border border-gray-400 h-8 "></div>
                <div>
                  <input
                    value={pagesCount}
                    onChange={handleInputChange}
                    className="w-12 border-none px-2 focus:border-none hover:border-none"
                  />
                </div>
                <div className="border border-gray-400 h-8  "></div>
                <button
                  aria-label="increase"
                  className=" px-2 text-blue-400"
                  onClick={() => {
                    if (pagesCount >= 200) {
                      setPagesCount(200);
                    } else {
                      setPagesCount(pagesCount + 1);
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>
              <div className="text-sm ml-4 mt-4">{pagesCount * 275} Words</div>
            </div>
            <div>
              <div className="lg:-mt-4">Spacing</div>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                className="mt-3"
                onChange={handleChangeElement}
                aria-label="Platform"
              >
                <ToggleButton value="0">Double</ToggleButton>
                <ToggleButton value="1">Single</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div>
              <div>Subject</div>

              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  subject
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={subject}
                  label="subject"
                  onChange={handleChangeSubject}
                >
                  {data.allSubjects.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item._id}>
                        {item.subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Academic level</div>
              <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  College
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={level}
                  label="College"
                  onChange={handleChangeLevel}
                >
                  {data.academicLevels.map(
                    (item: {
                      _id: string;
                      academicLevel: string;
                      amount: string;
                    }) => {
                      return (
                        <MenuItem
                          key={item._id}
                          value={item._id}
                          onClick={() => {
                            setLevelText(item.academicLevel);

                            setLevelAmount(parseInt(item.amount));
                          }}
                        >
                          {item.academicLevel}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mb-4">
            <div>Deadline in</div>
            <div className="flex  w-full space-x-4 mt-4 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#3aaade"
                  className="w-6 h-6 mt-5 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>

              <div>
                <Datetime
                  onChange={timeChangeHandler}
                  isValidDate={valid}
                  dateFormat="DD/MM/YYYY"
                  closeOnSelect
                  initialValue={
                    new Date(new Date().setHours(new Date().getHours() + 1))
                  }
                  className="mt-4 border-none"
                  inputProps={{
                    placeholder: "click here to select a date and time",
                  }}
                  // initialValue={new Date()}
                  // input={false}
                  // renderInput={}
                />
              </div>
            </div>

            {/* <FormControl sx={{ m: 1, minWidth: 240 }}>
              <InputLabel id="demo-simple-select-helper-label">days</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={deadline}
                label="days"
                onChange={handleChangeDeadline}
              >
                {data.allDaysOfCompletion.map(
                  (item: { _id: string; days: string }) => {
                    return (
                      <MenuItem key={item._id} value={item._id}>
                        {item.days}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl> */}
          </div>
        </div>
        <div>
          <div>Choose the experts level</div>

          <div className="flex flex-wrap space-x-0 space-y-4 md:space-x-4 md:space-y-0 ">
            <div className="w-52 px-4 py-2 border border-gray-400 rounded-md">
              <div className="flex space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>

                <span>Best available</span>
              </div>
              <div className="mt-4 mb-10">
                An expert in your field of study who’s available right now.
              </div>
              <hr />
              <div className="flex flex-row justify-between  items-center text-sm">
                <div className="mt-2">No extra cost</div>
                <Radio
                  value="0"
                  checked={expertLevel === "0"}
                  onChange={handleChangeExpertLevel}
                />
              </div>
            </div>
            <div className="w-52 px-4 py-2 border border-gray-400 rounded-md">
              <div className="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="blue"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <span>Top expert</span>
              </div>
              <div className="mt-4 mb-4">
                One of our top-30 writers in your discipline according to
                customers’ reviews.
              </div>
              <hr />
              <div className="flex flex-row justify-between items-center text-sm">
                <div className="mt-2">+$1.00 per page</div>
                <Radio
                  value="1"
                  checked={expertLevel === "1"}
                  onChange={handleChangeExpertLevel}
                />
              </div>
            </div>
            <div className="w-52 px-4 py-2 border   border-gray-400 rounded-md">
              <div className="flex space-x-2 items-center">
                <DiamondIcon color="primary" />
                <span>Premium expert</span>
              </div>
              <div className="mt-4 mb-4">
                The highly demanded expert with the highest rate among the
                customers.
              </div>
              <hr />
              <div className="flex flex-row justify-between items-center text-sm">
                <div className="mt-2">+$2.01 per page</div>
                <Radio
                  value="2"
                  checked={expertLevel === "2"}
                  onChange={handleChangeExpertLevel}
                />
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>

        <div className="bg-gray-200 py-4 px-2   mt-4 rounded-md ">
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-1/2">
              <div>Your email</div>
              <FormControl
                sx={{ m: 1, width: "90%", backgroundColor: "white" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={"email"}
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormControl>
            </div>
            <div className=" w-full lg:w-1/2">
              <div>Phone number</div>
              <div className=" mb-2 mt-4">
                <div className="flex items-center">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={true}
                    defaultCountry="US"
                    value={Value}
                    onChange={newno}
                    className="-mx-6 px-8  w-full border rounded  py-3 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Checkbox
              inputProps={{ "aria-label": "controlled" }}
              checked={terms}
              onChange={() => {
                setTerms(!terms);
              }}
            />
            I agree to{" "}
            <a href ="https://docs.google.com/document/d/1Bfi8lhHdV0WhehwXj0XFyGFbw4fdaCIoTYUcQxDmXf0/edit?usp=sharing" className="underline text-blue-400">
              Terms And conditions
            </a>{" "}
            and{" "}
            <button className="underline text-blue-400">Privacy Policy</button>
          </div>
        </div>
      </CardContent>
      <div className="justify-end flex mb-8 px-4">
        <button
          onClick={() => {
            moveToPageTwo();
          }}
          className="bg-blue-400 px-4 py-2 font-sans  rounded-md text-white"
        >
          Next Step
        </button>
      </div>
    </Card>
  );
}
