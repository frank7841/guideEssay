import { gql, useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default function ResetPassModal(props: {
  setIsOpen: (value: boolean) => void;
  setSignup: (value: boolean) => void;
  close: () => void;
}) {
  const { setIsOpen, close, setSignup } = props;

  const [email, setEmail] = useState("");
  const [enterMail, setEnterMail] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return email;
    }
    return re.test(String(email).toLowerCase());
  };
  const RESET_PASSWORD = gql`
    mutation Mutation($email: String!) {
      requestResetPassword(email: $email) {
        email
      }
    }
  `;

  const [resetPassword] = useMutation(RESET_PASSWORD);
  async function resetPasswordHandler() {
    const mail = validateEmail();
    if (mail === false) {
      Store.addNotification({
        title: "Error",
        message: `Enter a valid Email`,
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

    resetPassword({
      variables: {
        email: email.toLowerCase(),
      },
      onCompleted: async (infoData) => {
        Store.addNotification({
          title: "Success",
          message: `Password reset link has been sent to your email!`,
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
        setEnterMail(false);
      },

      onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
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
  }
  return (
    <Fragment>
      <ReactNotifications />
      <div className=" container  max-w-md border-2 border-gray-200 p-3 bg-white ">
        <div className=" ">
          <svg
            className="ml-auto fill-current text-gray-700 w-6 h-6  cursor-pointer right-0 top-8 relative"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            onClick={() => {
              close();
              setIsOpen(false);
            }}
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
        </div>
        {enterMail ? (
          <div>
            <div className="text-center m-6">
              <h1 className="text-3xl font-semibold text-gray-700">
                Forgot your password?
              </h1>
              <p className="text-gray-500">
                Just enter your email address below and we'll send you a link to
                reset your password!
              </p>
            </div>
            <div className="m-6">
              <form
                className="mb-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleEmailChange}
                    value={email}
                    minLength={6}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 text-black"
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="button"
                    className="w-full px-3 py-4 text-white bg-blue-400 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                    onClick={resetPasswordHandler}
                  >
                    Send reset link
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?
                  <button
                    className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                    onClick={() => {
                      setIsOpen(false);
                      setSignup(true);
                    }}
                  >
                    Sign up
                  </button>
                  .
                </p>
              </form>

              <div className="flex flex-row justify-center mb-8">
                <span className="absolute bg-white px-4 text-gray-500">
                  or{" "}
                  <button
                    className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                    onClick={() => {
                      setIsOpen(false);
                      setSignup(false);
                    }}
                  >
                    Sign in
                  </button>
                </span>
                <div className="w-full bg-gray-200 mt-3 h-px"></div>
              </div>
            </div>{" "}
          </div>
        ) : (
          <div className="m-6 py-12 text-gray-600 border-2 px-2">
            <p className="space-y-2 pb-4">
              We've sent an email to {email}. Click the link in the email to
              reset your password.
            </p>
            <p className="space-y-2 pb-2">
              If your don't see the email, check other places it might be, like
              your junk, spam, social, or other folders
            </p>
            <p className="space-y-2 pb-2">The link is valid for 15 minutes.</p>

            <hr className="mt-2" />
            <div className="flex justify-center ">
              <button
                className="text-blue mt-2 "
                onClick={resetPasswordHandler}
              >
                {" "}
                resend email
              </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
