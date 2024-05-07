import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { gql, useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import Datetime from "react-datetime";
import moment from "moment";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import SpinnerLayout from "../spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addOrder } from "../../redux/states/orderState";

export default function OrderCard() {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.orderInfo.value);

  const [essay, setEssay] = React.useState(orderDetails.essay);
  const [work, setWork] = React.useState(orderDetails.work);

  const [pagesCount, setPagesCount] = React.useState(orderDetails.pagesCount);
  const [deadline, setDeadline] = React.useState(orderDetails.deadline);
  const [deadlinePrice, setDeadlinePrice] = React.useState(
    orderDetails.deadlinePrice
  );
  const [workText, setWorkText] = React.useState(orderDetails.workText);
  const [workAmount, setWorkAmount] = React.useState(orderDetails.workAmount);
  const [levelText, setLevelText] = React.useState(orderDetails.levelText);
  const [levelAmount, setLevelAmount] = React.useState(
    orderDetails.levelAmount
  );
  const [finalPrice, setFinalPrice] = React.useState(orderDetails.finalPrice);
  const [alignmentAmount, setAlignmentAmount] = React.useState(
    orderDetails.alignmentAmount
  );

  React.useEffect(() => {
    setFinalPrice(workAmount  +  (levelAmount*pagesCount));
  }, [workAmount, levelAmount, deadlinePrice, setFinalPrice, alignmentAmount, pagesCount]);
  const GET_ORDERSQUERY = gql`
    query Query {
      allWork {
        _id
        amount
        workType
      }
      allPriceRates {
        _id
        hourlyRate
        pricePerDoublePage
        pricePerSinglePage
      }
      academicLevels {
        academicLevel
        amount
        _id
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ORDERSQUERY);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  const handleChangeWork = (event: SelectChangeEvent) => {
    setWork(event.target.value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setEssay(event.target.value);
  };
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

  var yesterday = moment().subtract(1, "day");
  var valid = function (current: any) {
    return current.isAfter(yesterday);
  };
  const handleInputChange = (event: any) => {
    // console.log(event);
    let num = pagesCount;

    const value = parseInt(event.target.value);

    if (!isNaN(value)) {
      value >= 200 ? setPagesCount(200) : setPagesCount(value);
      value >= 200 ? (num = 200) : (num = value);
    }
    // setAlignmentAmount(
    //   // num * parseInt(data.allPriceRates[0].pricePerDoublePage)
    //   num * levelAmount
    // );
  };

  return (
    <Card sx={{ minWidth: 350, borderRadius: 4 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 24, fontWeight: "bold" }}
          color="text.black"
          gutterBottom
        >
          Place Your Order
        </Typography>
        <div className="flex flex-col">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Essay</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={work}
              label="Essay"
              onChange={handleChangeWork}
            >
              {data.allWork.map(
                (item: { _id: string; workType: string; amount: string }) => {
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
                }
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              College
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={essay}
              label="College"
              onChange={handleChange}
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
          <div className="mb-4 font-normal">
            <div className="text-start">Days</div>
            <div className="flex  w-full space-x-4  items-center">
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
          </div>
          <div className="mt-2 font-normal">
            <div className="text-start">Number of pages</div>
            <div className="border mt-2 border-gray-400 rounded-lg py-2 flex items-center space-x-2 text-center">
              <button
                type="submit"
                aria-label="reduce"
                onClick={() => {
                  let num = pagesCount;
                  if (pagesCount !== 1) {
                    num = pagesCount - 1;
                    setPagesCount(Math.max(pagesCount - 1, 0));
                  }
                  setAlignmentAmount(
                    num * levelAmount
                  );
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
                  className="w-full border-none px-2 focus:border-none hover:border-none"
                />
              </div>
              <div className="border border-gray-400 h-8  "></div>
              <button
                aria-label="increase"
                className=" px-2 text-blue-400"
                onClick={() => {
                  let num = pagesCount;
                  if (pagesCount >= 200) {
                    setPagesCount(200);
                    num = 200;
                  } else {
                    setPagesCount(pagesCount + 1);
                    num = pagesCount + 1;
                  }
                  setAlignmentAmount(
                    num *levelAmount
                  );
                }}
              >
                <AddIcon fontSize="small" />
              </button>
            </div>
            <div className="text-sm ml-4 mt-4">{pagesCount * 275} Words</div>
          </div>
        </div>
        <div className="my-2">
          Standard Price{" "}
          <span className="text-green-600 text-bold">
            ${finalPrice.toFixed(2)}
          </span>
        </div>
        {/* <div className="bg-[#abb8c3] py-4 -mx-4">
          <Typography sx={{ mb: 1.5 }} className="text-white">
            Special price (Locked){" "}
            <span className="text-2xl text-bold font-serif text-end ml-10">
              {" "}
              $6.41
            </span>
          </Typography>
          <div className="">
            <input
              className="px-2 rounded-tl-md rounded-bl-md py-2"
              placeholder="Enter email to unlock"
            />
            <button className="bg-blue-600 px-2 rounded-tr-md text-white  py-2 rounded-br-md">
              Unlock
            </button>
          </div>
        </div> */}
      </CardContent>
      <div className="justify-center mb-8 px-4">
        <Link
          to={"/order"}
          state={{
            essay,
            pagesCount,
            deadline,
            deadlinePrice,
            workText,
            workAmount,
            levelText,
            levelAmount,
            finalPrice,
            alignmentAmount,
          }}
        >
          <button
            className="bg-[#ffa608] px-4 py-2 font-sans w-full rounded-md text-white"
            onClick={() => {
              dispatch(
                addOrder({
                  essay,
                  work,
                  pagesCount,
                  deadline,
                  deadlinePrice,
                  workText,
                  workAmount,
                  levelText,
                  levelAmount,
                  finalPrice,
                  alignmentAmount,
                })
              );
            }}
          >
            Order Now
          </button>
        </Link>
      </div>
    </Card>
  );
}
