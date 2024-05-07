// import { blueGrey } from "@mui/material/colors";
import PriceCard from "./priceCard";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
export default function Prices() {
  const GET_ACADEMICLEVEL = gql`
    query Query {
      academicLevels {
        academicLevel
        _id
        amount
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ACADEMICLEVEL);

  if (loading) return <div> Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;
  return (
    <div className="mt-10 mb-8 font-sans text-center">
      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
        Select the price that corresponds to your level
      </h1>
    <div className=" px-4  justify-center font-bold flex flex-wrap space-x-4 space-y-4 mb-8  ">
        {data.academicLevels.map(
          (subject: { academicLevel: string; _id: string; amount: string }) => {
            return (
              <div key={subject._id} className="w-96 mt-4">
                <PriceCard subject={subject} />
              </div>
            );
          }
        )}
        {/* <PriceCard1 />
        <PriceCard2 />
        <PriceCard3 /> */}
      </div>
      <div className="text-center px-4 text-gray-600">
        <div className="font-bold text-xl">
          {" "}
          *all the prices are displayed in US dollars for 1 double-spaced page,
          i.e. 275 words.
        </div>

        <br />
        <Link
          to={"/order"}
          className="bg-blue-400 px-4 py-2 font-sans  rounded-md text-white"
        >
          Order Now
        </Link>
      </div>
      <div className="justify-center px-4 py-4 mx-10 text-center">
        <div className="mt-4 text-xl font-bold">Additional Services</div>
      </div>
      <div className="flex flex-row space-x-2 justify-center mt-4 px-4">
        <div className="border px-4 py-4 rounded">
          <div className=" font-bold text-left text-xl">
            <h1>Requested writer</h1>
          </div>
          <div className=" text-left text-md">
            Choose a writer from one of your last 10 orders or ask support
            agents for guidance.
          </div>
        </div>
      </div>
      <div className="justify-center px-4 py-4   mb-10 text-center">
        <div className="mt-4 text-xl font-bold">
          How does the price for my order form?
        </div>
      </div>
      <div className="flex flex-row space-x-1 justify-center mt-4 px-4 w-5/5">
        <div className="border px-4 py-4 rounded">
          <div className=" text-left text-md">
            Four (4) very basic factors determine how much your order will cost.
            These factors include:
            <br />
            . Type of Course level
            <br />
            . Number of pages
            <br />
            . Urgency
            <br />
            Please take into consideration that certain additional services may
            alter how you are charged.
          </div>
        </div>
      </div>
      <div className="justify-center px-4 py-4 mx-10 text-center">
        <div className="mt-4 text-xl font-bold">
          What currency can I pay with?
        </div>
      </div>
      <div className="flex flex-row space-x-1 justify-center mt-4 px-4 w-5/5">
        <div className="border px-4 py-4 rounded">
          <div className=" text-left text-md">
            You can make payments in any currency convenient for you. We work
            only with time-tested partners to protect your financial data, so
            this payment method enables our customers to make operations online
            safely and securely using Visa and Master credit/debit cards. Rest
            assured that all your transactions are safe and you can always make
            a refund if something goes wrong.
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-2 justify-center mt-4  mr-4 mb-4 px-4 w-5/5 ">
        <div className="border px-4 py-4  rounded-md bg-blue-400">
          <h1 className="font-bold fontSize: 20 text-2xl text-white">
            Don’t wait, order your essay
          </h1>
          <br />
          <Link
            to={"/order"}
            className="bg-orange-400 mt-4 px-4 py-2 font-sans  rounded-md text-white"
          >
            Get your 10% off
          </Link>
        </div>
      </div>
    </div>
  );
}
