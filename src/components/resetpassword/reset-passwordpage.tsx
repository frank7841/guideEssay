import { gql, useMutation } from "@apollo/client";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword(props: any) {
  const { userId, resetToken, Store } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNotification, setErrorNotification] = useState("");
  const [update, setUpdate] = useState(true);
  const handleNewPasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const handleVerifyPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };
  const RESET_PASSWORD = gql`
    mutation Mutation(
      $token: String
      $resetpasswordId: String
      $confirmPassword: String
      $password: String
    ) {
      resetpassword(
        token: $token
        id: $resetpasswordId
        confirmPassword: $confirmPassword
        password: $password
      ) {
        _id
      }
    }
  `;

  const [resetPassword] = useMutation(RESET_PASSWORD);

  async function handleResetPassword() {
    Store.addNotification({
      title: "Updating",
      message: `Changing Password`,
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

    if (
      !password ||
      password.trim().length < 7 ||
      !confirmPassword ||
      confirmPassword.trim().length < 7
    ) {
      if (confirmPassword.trim().length < 7 || password.trim().length < 7) {
        setErrorNotification(
          "Password should have a minimum of eight characters."
        );
        return;
      }

      setErrorNotification("Invalid Input!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorNotification("Passwords don’t match.");

      return;
    }

    resetPassword({
      variables: {
        token: resetToken,
        resetpasswordId: userId,
        confirmPassword: confirmPassword,
        password: password,
      },
      onCompleted: (infoData) => {
        setErrorNotification("password has been updated");

        setConfirmPassword("");
        setPassword("");
        Store.addNotification({
          title: "Success",
          message: `password has been updated`,
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
        setUpdate(false);
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
      <div className="flex justify-center min-h-screen bg-gray-100 -mt-24">
        <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
          {update ? (
            <div>
              <div className="text-center my-6">
                <h1 className="text-3xl font-semibold text-gray-700">
                  Reset Password
                </h1>
                <p className="text-gray-500 pt-4">
                  Use at least 8 characters. Don’t use a password from another
                  site, or something too obvious like your pet’s name.
                </p>
              </div>
              <div className="text-red-500 ml-6">{errorNotification}</div>
              <div className="m-6">
                <form
                  className="mb-4"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="mb-6">
                    <label
                      htmlFor="newpassword"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newpassword"
                      id="newpassword"
                      placeholder="New Password"
                      minLength={7}
                      value={password}
                      onChange={handleNewPasswordChange}
                      required
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Repeat Password
                      </label>
                    </div>
                    <input
                      required
                      type="password"
                      name="password"
                      id="password"
                      minLength={7}
                      value={confirmPassword}
                      onChange={handleVerifyPasswordChange}
                      placeholder="Confirm new password"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="button"
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
                      onClick={handleResetPassword}
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className=" space-y-4">
              <div className="flex justify-center">
                Password updated successfully
              </div>
              <div className="flex justify-center">
                <Link to="/">
                  <button
                    className="bg-blue-400 px-2 rounded text-white"
                    // onClick={() => console.log("hey")}
                  >
                    Home
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
