import React, { useState } from "react";
import MakeOrderCard from "../../components/order/makeOrder";
import AdditionalPaperDetailsCard from "../../components/order/AdditionalPaperDetails";
import BoostYourWork from "../../components/order/boostYourWork";
import PlaceOrderCard from "../../components/order/placeOrder";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Store, ReactNotifications } from "react-notifications-component";
import Checkout from "../../components/order/checkout";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
// import { useNavigate } from "react-router-dom";
import OrderConfirmed from "../../components/order/orderConfirmed";
import LoginModal from "../../components/modal/login";
import SpinnerLayout from "../../components/spinner";
const OrderPage = () => {
  const location = useLocation();
  const state = location.state;

  const orderDetails = useAppSelector((state) => state.orderInfo.value);

  // const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState("one");
  const [work, setWork] = React.useState(orderDetails.work);
  const [workText, setWorkText] = React.useState(orderDetails.workText);
  const [workAmount, setWorkAmount] = React.useState(orderDetails.workAmount);
  const [deadlinePrice, setDeadlinePrice] = React.useState(
    orderDetails.deadlinePrice
  );
  const [subject, setSubject] = React.useState("");
  const [price, setPrice] = React.useState(9.75);
  const [level, setLevel] = React.useState(orderDetails.essay);
  const [levelText, setLevelText] = React.useState(orderDetails.levelText);
  const [levelAmount, setLevelAmount] = React.useState(
    orderDetails.levelAmount
  );
  const [deadline, setDeadline] = React.useState(orderDetails.deadline);
  const [expertLevel, setExpertLevel] = React.useState("0");
  const [terms, setTerms] = React.useState(false);
  const [pagesCount, setPagesCount] = React.useState(state?.pagesCount || 1);
  const [alignment, setAlignment] = React.useState("0");
  const [alignmentAmount, setAlignmentAmount] = React.useState(
    state?.alignmentAmount || 0
  );
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [errorNot, setErrorNot] = React.useState("");
  const [styleReference, setStyleReference] = React.useState("");
  const [sourcesCount, setSourcesCount] = React.useState(1);
  const [expertPrice, setExpertPrice] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [file, setFile] = React.useState<any>([]);
  const [instructions, setInstructions] = React.useState("");
  const [version, setVersion] = useState(false);
  const [plagiarism, setPlagiarism] = useState(false);
  const [priority, setPriority] = useState(false);
  const [summary, setSummary] = useState(false);
  const [draft, setDraft] = useState(false);
  const [qualityCheck, setQualityCheck] = useState(false);
  const [boostPrice, setBoostPrice] = React.useState(0);
  const [boostIDs, setBoostIDs] = React.useState([]);
  const [boostDetails, setBoostDetails] = React.useState<any>([]);
  const [initiatePayment, setInitiatePayment] = useState(false);
  const [finalPrice, setFinalPrice] = React.useState(orderDetails.finalPrice);
  const [secretKey, setSecretKey] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Value, setValue] = React.useState();
  // @ts-ignore
  const userDetails = useAppSelector((state) => state.userInfo.value);

  const GET_ORDERSQUERY = gql`
    query Query {
      allSubjects {
        _id
        subjectName
      }
      academicLevels {
        academicLevel
        _id
        amount
      }
      allDaysOfCompletion {
        _id
        days
      }
      allWords {
        _id
        words
      }
      referencingStyles {
        _id
        amount
        referencingStyleType
      }
      allPriceRates {
        _id
        hourlyRate
        pricePerDoublePage
        pricePerSinglePage
      }
      allWork {
        _id
        amount
        workType
      }
      allBoostRates {
        _id
        price
        description
        title
      }
      expertLevels {
        _id
        amount
        expertLevel
      }
    }
  `;
  const ADDORDER = gql`
    mutation Mutation($createorder: createOrderInput) {
      createOrder(createorder: $createorder) {
        _id
      }
    }
  `;

  const [addOrder] = useMutation(ADDORDER);
  React.useEffect(() => {
    if (expertLevel === "0") {
      setExpertPrice(0);
    } else if (expertLevel === "1") {
      setExpertPrice(1.0);
    } else {
      setExpertPrice(2.01);
    }
  }, [setExpertPrice, expertLevel]);

  const { loading, error, data } = useQuery(GET_ORDERSQUERY);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return email;
    }
    return re.test(String(email).toLowerCase());
  };
  const validatePhoneNumber = () => {
    // checks if its an actual phone number not 1234569897
    const isValidPhoneNumber = isPossiblePhoneNumber(phoneNumber);

    if (isValidPhoneNumber) {
      //removes the spaces in the phonenumber
      const phoneno = phoneNumber.replace(/ /g, "");
      return phoneno;
    }

    setErrorNot("invalid phonenumber");
    return isValidPhoneNumber;
  };
  // function DataURIToBlob(dataURI: string) {
  //   const splitDataURI = dataURI.split(",");
  //   const byteString =
  //     splitDataURI[0].indexOf("base64") >= 0
  //       ? atob(splitDataURI[1])
  //       : decodeURI(splitDataURI[1]);
  //   const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  //   const ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++)
  //     ia[i] = byteString.charCodeAt(i);

  //   return new Blob([ia], { type: mimeString });
  // }
  // function getSecondPart(str: any) {
  //   return str.split("/")[1];
  // }

  const addOrderHandler = async () => {
    const phoneNo = validatePhoneNumber();
    const emailVerify = validateEmail();
    if (
      !work ||
      work.trim().length === 0 ||
      !subject ||
      subject.trim().length === 0 ||
      !level ||
      level.trim().length === 0 ||
      !deadline ||
      deadline.trim().length === 0 ||
      !expertLevel ||
      expertLevel.trim().length === 0 ||
      !terms ||
      !alignment ||
      alignment.trim().length === 0 ||
      !email ||
      email.trim().length === 0 ||
      !phoneNumber ||
      phoneNumber.trim().length === 0 ||
      !sourcesCount ||
      sourcesCount === 0 ||
      !topic ||
      topic.trim().length === 0 ||
      !instructions ||
      instructions.trim().length === 0 ||
      emailVerify === false ||
      phoneNo === false
    ) {
      if (!work || work.trim().length === 0) {
        //  setTitleStatus("error");
        Store.addNotification({
          title: "Missing Field!!",
          message: `Work is Required!`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      if (!subject || subject.trim().length === 0) {
        //  setServiceStatus("error");
        Store.addNotification({
          title: "Missing Field!!",
          message: `Deadline is Required!`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      if (!level || level.trim().length === 0) {
        Store.addNotification({
          title: "Missing Field!!",
          message: `Academic Level is Required!`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
      if (emailVerify === false) {
        Store.addNotification({
          title: "Missing Field!!",
          message: `Email is Required!`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      } else if (phoneNo === false) {
        Store.addNotification({
          title: "Missing Field!!",
          message: `phoneNo is Required!`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    }
    //  setIsLoading(true);
    Store.addNotification({
      title: "Processing",
      message: "Processing!",
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    if (file.length === 0) {
      addOrder({
        variables: {
          createorder: {
            academicLevel: level,
            // attachmentUrl: null,
            boostServices: boostIDs,
            deadline,
            email: email,
            expertLevel: data.expertLevels[0]._id,
            instructions: instructions,
            noOfPages: pagesCount.toString(),
            noOfSources: sourcesCount.toString(),
            payment: "1",
            price: finalPrice.toFixed(2).toString(),
            phonenumber: phoneNo,
            referencingStyle: styleReference,

            subject,
            topic,
            urgency: deadline,
            user: userDetails.id,
            work,
          },
        },
        onCompleted: (infoData) => {
          setCompleted(true);
          Store.addNotification({
            title: "Success",
            message: `Order added successfully!!`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          //  setTitle("");
          //  setService("");
          //  setText("");
          //  setTitleStatus("");
          //  setServiceStatus("");
          //  setIsLoading(false);
        },
        onError: ({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            //  setIsLoading(false);

            graphQLErrors.forEach(({ message, locations, path }) => {
              Store.addNotification({
                title: "Error!!",
                message: `${message}`,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
              });
            });
          }
          if (networkError) console.log(`[Network error]: ${networkError}`);
        },
      });
    } else {
      // console.log(file);
      const fileData = new FormData();

      file.forEach((singleFile: any, i: any) => {
        const fileName = singleFile[0].name.replace(/[^a-z.A-Z0-9 ]/g, "");
        fileData.append("Files", singleFile[0], fileName.replace(/\s/g, ""));
      });

      //Here you can append the post datas seperate from file

      //Here we have appended the image file
      //and all about image's data

      fileData.append("academicLevel", level);
      fileData.append("deadline", deadline);
      fileData.append("email", email);
      fileData.append("boostServices", JSON.stringify(boostIDs));
      fileData.append("expertLevel", data.expertLevels[0]._id);
      fileData.append("instructions", instructions);
      fileData.append("noOfPages", pagesCount.toString());
      fileData.append("noOfSources", sourcesCount.toString());
      fileData.append("payment", "1");
      fileData.append("price", finalPrice.toFixed(2).toString());
      // @ts-ignore
      fileData.append("phonenumber", phoneNo);
      fileData.append("referencingStyle", styleReference);
      fileData.append("subject", subject);
      fileData.append("topic", topic);
      fileData.append("urgency", deadline);
      fileData.append("user", userDetails.id);
      fileData.append("work", work);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const url = `https://api.guidemyclass.com/upload`;

      // console.log(imageData);
      try {
        await axios.put(url, fileData, config);

        setCompleted(true);
      } catch (err: any) {
        // console.log(err);
        Store.addNotification({
          title: "Error!!",
          message: `${err.message}`,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    }
    
  };
  

  const initiatePaymentHandler = () => {
    if (userDetails.id) {
      addOrderHandler()
      // axios
      //   .post("https://api.guidemyclass.com/payments/initiate", {
      //     amount: +finalPrice.toFixed(2) * 100,
      //   })
      //   .then((res: any) => {
      //     setSecretKey(res.data.paymentDetails.client_secret);
      //     setInitiatePayment(true);
      //     window.scrollTo(0, 0);
      //   })
      //   .catch((err: any) => {
      //     Store.addNotification({
      //       title: "Error!!",
      //       message: `${err.message}`,
      //       type: "danger",
      //       insert: "top",
      //       container: "top-right",
      //       animationIn: ["animate__animated", "animate__fadeIn"],
      //       animationOut: ["animate__animated", "animate__fadeOut"],
      //       dismiss: {
      //         duration: 5000,
      //         onScreen: true,
      //       },
      //     });
      //   });
    } else {
      setOpen(true);
    }
  };
  // console.log(+finalPrice.toFixed(2));
  // console.log(userDetails.id);
  // console.log(work);
  const moveToPageTwo = () => {
    const phoneNo = validatePhoneNumber();
    const emailVerify = validateEmail();
    // console.log(deadline);

    if (!work || work.trim().length === 0) {
      //  setTitleStatus("error");
      Store.addNotification({
        title: "Missing Field!!",
        message: `Type of Work is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (!subject || subject.trim().length === 0) {
      //  setServiceStatus("error");
      Store.addNotification({
        title: "Missing Field!!",
        message: `Subject is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (!level || level.trim().length === 0) {
      Store.addNotification({
        title: "Missing Field!!",
        message: `Academic Level is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (!deadline || deadline.toString().trim().length === 0) {
      console.log(deadline);
      Store.addNotification({
        title: "Missing Field!!",
        message: `Deadline is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (!terms) {
      Store.addNotification({
        title: "Missing Field!!",
        message: `You must agree to terms and condition`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (emailVerify === false) {
      Store.addNotification({
        title: "Missing Field!!",
        message: `Email is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }
    if (phoneNo === false) {
      Store.addNotification({
        title: "Missing Field!!",
        message: `phoneNo is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    if (new Date(deadline) <= new Date()) {
      Store.addNotification({
        title: "Missing Field!!",
        message: `Date and Time cannot be in the past is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    setPageNumber("two");
    window.scrollTo(0, 0);
  };

  const moveToPageThree = () => {
    if (!styleReference || styleReference.trim().length === 0) {
      //  setTitleStatus("error");
      Store.addNotification({
        title: "Missing Field!!",
        message: `Reference is Required!`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return;
    }

    setPageNumber("three");
    window.scrollTo(0, 0);
  };

  // console.log(boostIDs);

  return (
    <div>
      <ReactNotifications />
      <LoginModal open={open} setOpen={setOpen} Store={Store} />

      {initiatePayment ? (
        <>
          {!completed ? (
            <Checkout
              secretKey={secretKey}
              finalPrice={finalPrice}
              setInitiatePayment={setInitiatePayment}
              addOrderHandler={addOrderHandler}
            />
          ) : (
            <OrderConfirmed />
          )}
        </>
      ) : (
        <div className="flex flex-wrap lg:justify-center px-4 lg:px-0 space-x-0  lg:space-x-4 ">
          <div className="lg:w-3/5">
            <div className=" py-6">
              <div className="flex space-x-6">
                <button
                  className="w-1/4"
                  onClick={() => {
                    setPageNumber("one");
                  }}
                >
                  <div className="relative mb-2">
                    <div
                      className={`w-10 h-10 mx-auto ${
                        pageNumber === "one"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black"
                      } rounded-full text-lg  flex items-center`}
                    >
                      <span className="text-center  w-full">1</span>
                    </div>
                  </div>

                  <div className="text-xs text-center md:text-base">
                    Paper details
                  </div>
                </button>

                <button
                  className="w-1/4"
                  onClick={() => {
                    if (pageNumber !== "one") {
                      setPageNumber("two");
                    }
                  }}
                >
                  <div className="relative mb-2">
                    <div
                      className="absolute flex align-center items-center align-middle content-center"
                      // style="width: calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
                    >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div
                          className="w-0 bg-green-300 py-1 rounded"
                          // style="width: 100%;"
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`w-10 h-10 mx-auto ${
                        pageNumber === "two"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black"
                      } rounded-full text-lg  flex items-center`}
                    >
                      <span className="text-center  w-full">2</span>
                    </div>
                  </div>

                  <div className="text-xs text-center md:text-base">
                    Additional details
                  </div>
                </button>

                <button
                  className="w-1/4"
                  // onClick={() => {
                  //   setPageNumber("three");
                  // }}
                >
                  <div className="relative mb-2">
                    <div
                      className="absolute flex align-center items-center align-middle content-center"
                      style={{
                        width:
                          "calc(100% - 2.5rem - 1rem); top: 50%; transform: translate(-50%, -50%)",
                      }}
                    >
                      <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <div
                          className="w-0 bg-green-300 py-1 rounded"
                          style={{ width: "33%" }}
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`w-10 h-10 mx-auto ${
                        pageNumber === "three"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black"
                      } border-2 border-gray-200 rounded-full text-lg  flex items-center`}
                    >
                      <span className={`text-center  w-full`}>3</span>
                    </div>
                  </div>

                  <div className="text-xs text-center md:text-base">
                    Extra service
                  </div>
                </button>
              </div>
            </div>
            <div className=" py-6">
              {pageNumber === "one" ? (
                <MakeOrderCard
                  pageNumber={pageNumber}
                  setValue={setValue}
                  Value={Value}
                  setPageNumber={setPageNumber}
                  moveToPageTwo={moveToPageTwo}
                  work={work}
                  setWork={setWork}
                  setWorkText={setWorkText}
                  setWorkAmount={setWorkAmount}
                  subject={subject}
                  setSubject={setSubject}
                  level={level}
                  setLevel={setLevel}
                  setLevelText={setLevelText}
                  setLevelAmount={setLevelAmount}
                  levelAmount={levelAmount}
                  deadline={deadline}
                  setDeadline={setDeadline}
                  expertLevel={expertLevel}
                  setExpertLevel={setExpertLevel}
                  terms={terms}
                  setTerms={setTerms}
                  pagesCount={pagesCount}
                  setPagesCount={setPagesCount}
                  alignment={alignment}
                  setAlignment={setAlignment}
                  email={email}
                  setEmail={setEmail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  errorNot={errorNot}
                  setErrorNot={setErrorNot}
                  data={data}
                  price={price}
                  setPrice={setPrice}
                  setDeadlinePrice={setDeadlinePrice}
                  setAlignmentAmount={setAlignmentAmount}
                />
              ) : pageNumber === "two" ? (
                <AdditionalPaperDetailsCard
                  setPageNumber={setPageNumber}
                  styleReference={styleReference}
                  setStyleReference={setStyleReference}
                  sourcesCount={sourcesCount}
                  setSourcesCount={setSourcesCount}
                  topic={topic}
                  setTopic={setTopic}
                  file={file}
                  setFile={setFile}
                  instructions={instructions}
                  setInstructions={setInstructions}
                  allStyles={data.allSubjects}
                  referencingStyles={data.referencingStyles}
                  moveToPageThree={moveToPageThree}
                />
              ) : (
                <BoostYourWork
                  setPageNumber={setPageNumber}
                  version={version}
                  setVersion={setVersion}
                  plagiarism={plagiarism}
                  setPlagiarism={setPlagiarism}
                  priority={priority}
                  setPriority={setPriority}
                  summary={summary}
                  setSummary={setSummary}
                  draft={draft}
                  setDraft={setDraft}
                  qualityCheck={qualityCheck}
                  setQualityCheck={setQualityCheck}
                  allBoostRates={data.allBoostRates}
                  setBoostPrice={setBoostPrice}
                  boostPrice={boostPrice}
                  setBoostDetails={setBoostDetails}
                  boostDetails={boostDetails}
                  setBoostIDs={setBoostIDs}
                />
              )}
            </div>
          </div>
          <div className="mt-10 mb-8 ">
            <PlaceOrderCard
              pageNumber={pageNumber}
              work={workText}
              workAmount={workAmount}
              levelAmount={levelAmount}
              pagesCount={pagesCount}
              alignment={alignment}
              deadline={deadline}
              level={levelText}
              price={price}
              deadlinePrice={deadlinePrice}
              alignmentAmount={alignmentAmount}
              expertPrice={expertPrice}
              setBoostPrice={setBoostPrice}
              boostPrice={boostPrice}
              setBoostDetails={setBoostDetails}
              boostDetails={boostDetails}
              setInitiatePayment={setInitiatePayment}
              finalPrice={finalPrice}
              setFinalPrice={setFinalPrice}
              initiatePaymentHandler={initiatePaymentHandler}
              setBoostIDs={setBoostIDs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
