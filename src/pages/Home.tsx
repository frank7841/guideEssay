// import logo from './logo.svg';

import { Link } from "react-router-dom";
import OrderCard from "../components/order/addOrder";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import FeatureCard from "../components/features/featureCard";
import ProcessCard from "../components/process/processCard";
import ServiceLists from "../components/services/serviceLists";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { samplesArrays } from "../helpers/sampleData";
import SamplesHomepage from "../components/samples/samplesHomepage";
import PriceCardHomePage from "../components/prices/priceCardHomepage";
interface SAMPLES {
  ratings: number;
  title: string;
  Academic: string;
  Discipline: string;
  url: string;
  pages: string;
}
const processDescription = [
  {
    id: 1,
    icon: "../images/icon-file.svg",
    title: "Set up an order",
    body: "Make a profile and complete all of the order instructions.",
  },
  {
    id: 2,
    icon: "../images/icon-support.svg",
    title: "Message us",
    body: "Reach out to our support staff to confirm if writers can complete your order",
  },
  {
    id: 3,
    icon: "../images/icon-done.svg",
    title: "Download the document",
    body: "Get the paper sent to your email ready to be downloaded",
  },
];
const prices = [
  {
    id: 1,
    title: "High School",
    priceRange: "$7",
  },
  {
    id: 2,
    title: "College/Undergraduate",
    priceRange: "$10-12",
  },
  {
    id: 3,
    title: "Masters/PHD",
    priceRange: "$12-14",
  },
];
const Features = [
  {
    id: 1,
    title: "Plagiarism-free papers",
    body: "To guarantee that it identifies plagiarized materials with a high degree of accuracy and assurance, our plagiarism detection program is continuously updated.",
  },
  {
    id: 2,
    title: "Loyalty discounts",
    body: "You will receive a 15% discount on any subsequent papers if you choose to defer more than ten papers to us. Nothing is obligated!",
  },
  {
    id: 3,
    title: "Free revisions",
    body: "It can take several attempts to achieve perfection, therefore it&#39;s especially important to know that you can ask for free revisions if you don&#39;t like the work.",
  },
  {
    id: 4,
    title: "Money back guarantee",
    body: "Before accepting the paper, you are entitled to a 100% money-back refund if you discover that it was not completed in accordance with your instructions.",
  },
  {
    id: 5,
    title: "Safe & Secure payments",
    body: "We work with PayPal to allow you to pay with a credit or debit card as well as your balance. PayPal is a safe way to make payments.",
  },
  {
    id: 6,
    title: "24/7 support",
    body: "Our channels of communication are always open. The helpful and accommodating staff works to ensure that your experience is seamless and feasible.",
  },
];

export default function Home() {
  const value = 4.5;
  return (
    <div className="">
      <div className=" bg-[url('./components/images/home-banner.png')]   h-full sm:h-screen  bg-no-repeat w-full bg-cover ">
        <div className=" flex flex-col sm:flex-row  justify-between   px-4 backdrop-opacity-25 backdrop-blur-lg h-full sm:h-screen  ">
          <div className=" mt-20 font-bold font-sans  text-white flex justify-center  items-center ">
            <div className="2xl:w-3/5">
              <h1 className="text-4xl md:text-7xl    text-start">
                Affordable <code>Essays</code> written by academic experts
              </h1>

              <div className="text-md">
                we write your papers- you get top grades
              </div>
              <div className="mt-8">
                <Link
                  to={"/order"}
                  className="bg-[#234764] px-2 py-2   rounded-md"
                >
                  Order Now
                </Link>
              </div>

              <div className="mt-20  flex space-x-4 text-start">
                <div className="flex items-center space-x-2">
                 
                 
                </div>
                <div className="flex items-center space-x-2">
                
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-4 md:px-8 text-center font-bold items-center flex ">
            <OrderCard />
          </div>
        </div>
      </div>
      <div className="justify-center px-2  mb-10 text-center ">
        <div className="mt-4 text-4xl font-bold">How it works</div>

        <div className="flex flex-wrap space-x-2 justify-center mt-4">
          {processDescription.map((item) => {
            return (
              <div key={item.id}>
                <ProcessCard
                  id={item.id}
                  title={item.title}
                  body={item.body}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="justify-center px-2  mb-10 text-center ">
        <div className="mt-4 text-4xl font-bold">Our Prices</div>
        <div className=" mt-2 text-gray-400 ">
          The cheapest Prices for rocket high quality
        </div>
        <div className="flex flex-wrap space-x-0 space-y-6 md:space-x-4 md:space-y-0 justify-center mt-4">
          {prices.map((item) => {
            return (
              <div key={item.id}>
                <PriceCardHomePage
                  id={item.id}
                  title={item.title}
                  priceRange={item.priceRange}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="justify-center px-2  mb-10 text-center ">
        <div className="mt-4 text-4xl font-bold">Features</div>
        <div className=" mt-2 text-gray-400 "></div>
        <div className="flex flex-wrap space-x-2 justify-center mt-4">
          {Features.map((item) => {
            return (
              <div key={item.id}>
                <FeatureCard id={item.id} title={item.title} body={item.body} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-4xl text-center font-bold">
        Real-time customer reviews
      </div>
      <div className="flex justify-center  items-center mt-4">
        <div className="w-full">
          <Carousel
            autoPlay
            infiniteLoop
            interval={6000}
            width="80%"
            centerMode
            thumbWidth={40}
            showThumbs={false}
          >
            {samplesArrays.map((item: SAMPLES) => {
              return (
                <div className="">
                  <SamplesHomepage items={item} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div className=" mt-4  flex justify-center">
        <div className="w-full">
          <ServiceLists />
        </div>
      </div>
      <div className="mt-4 text-4xl text-center font-bold">Samples</div>
      <div className="flex justify-center  items-center mt-4">
        <div className="w-full">
          <Carousel
            autoPlay
            infiniteLoop
            interval={6000}
            width="80%"
            centerMode
            thumbWidth={40}
            showThumbs={false}
          >
            {samplesArrays.map((item: SAMPLES) => {
              return (
                <div className="">
                  <SamplesHomepage items={item} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
