import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../modal/login";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useAppSelector } from "../../redux/hooks";

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const [sidebar, setSidebar] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleOpenProfile = () => {
    navigate("/profile");
    setSidebar(false);
  };

  const userDetails = useAppSelector((state) => state.userInfo.value);

  

  return (
    <Fragment>
      <div className="antialiased bg-[#234764] dark-mode:bg-gray-900 font-bold font-sans flex top-0 sticky z-40 ">
        <div className="w-full  bg-[#234764] text-white dark-mode:text-gray-200 dark-mode:bg-gray-800 ">
          <div className="flex flex-col max-w-screen-xl px-4 sticky mx-auto lg:items-center lg:justify-between lg:flex-row ">
            <div className="flex flex-row items-center justify-between p-4">
              <Link
                to={"/"}
                className="text-lg font-semibold tracking-widest text-white  rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                GuideMyClass Researchers
              </Link>

              <button
                className="rounded-lg lg:hidden focus:outline-none focus:shadow-outline"
                onClick={() => {
                  setSidebar(!sidebar);
                }}
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-col flex-grow hidden pb-4 lg:pb-0 lg:flex lg:justify-end lg:flex-row ">
              <Link
                to={"/prices"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Prices
              </Link>
              <Link
                to={"/Faq"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: h dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                FAQ
              </Link>
              <Link
                to={"/samples"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-modedark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Samples
              </Link>
              <Link
                to={"/guarantees"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Guarantees
              </Link>
              <Link
                to={"/about-us"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                About Us
              </Link>
              <Link
                to={"/services"}
                className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-blue-600   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                Services
              </Link>

              {userDetails.id.length ? (
                <>
                  {userDetails.role === "Admin" ? (
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                      className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenProfile}
                      className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                    >
                      My Profile
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleOpen}
                  className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                >
                  Log in
                </button>
              )}
              {/* <button
                  onClick={handleOpen}
                  className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                >
                  My Profile
                </button> */}
              <Link
                to={"/order"}
                className="text-white bg-blue-600 items-center px-2 py-2 font-sans font-bold rounded-xl"
              >
                <span>Order Now</span>
                {/* <svg fill="currentColor" viewBox="0 0 20 20"  className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"  clipRule="evenodd"></path></svg> */}
              </Link>
            </nav>
            {sidebar && (
              <div className=" md:flex md:flex-col md:items-center md:justify-end">
                <ul>
                  <li>
                    <Link
                      to={"/prices"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      Prices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Faq"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: h dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/samples"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-modedark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      Samples
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/guarantees"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      Guarantees
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/about-us"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2 mb-2">
                    <Link
                      to={"/services"}
                      className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode: dark-mode:text-gray-200 md:mt-0 md:ml-4  hover:text-blue-500 focus:text-white   focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setSidebar(false)}
                    >
                      Services
                    </Link>
                  </li>
                  <li className="mt-2 mb-2">
                    {userDetails.id.length ? (
                      <>
                        {userDetails.role === "Admin" ? (
                          <button
                            onClick={() => {
                              navigate("/dashboard");
                              setSidebar(false);
                            }}
                            className="text-white px-4 mr-2 font-bold font-sans "
                          >
                            Dashboard
                          </button>
                        ) : (
                          <button
                            onClick={handleOpenProfile}
                            className="text-white px-4 mr-2 font-bold font-sans "
                          >
                            My Profile
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={handleOpen}
                        className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                      >
                        Log in
                      </button>
                    )}
                  </li>

                  {/* <button
                  onClick={handleOpen}
                  className="text-white border px-4 mr-2 font-bold font-sans border-white rounded-md"
                >
                  My Profile
                </button> */}
                  <li className="mt-4 mb-4">
                    <Link
                      to={"/order"}
                      onClick={() => setSidebar(false)}
                      className="text-white  items-center px-4 py-2 font-sans font-bold rounded-xl"
                    >
                      <span>Order Now</span>
                      {/* <svg fill="currentColor" viewBox="0 0 20 20"  className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"  clipRule="evenodd"></path></svg> */}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal open={open} setOpen={setOpen} Store={Store} />

      <ReactNotifications />
    </Fragment>
  );
}
