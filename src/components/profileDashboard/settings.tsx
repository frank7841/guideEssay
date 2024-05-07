import React from "react";
import FormControl from "@mui/material/FormControl";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { gql, useMutation } from "@apollo/client";
interface PROPS {
  Store: any;
  currentuser: {
    _id: string;
    email: string;
    phone_number: string;
    username: string;
  };
}

const SettingsPage = (props: PROPS) => {
  const { Store, currentuser } = props;
  const [errorNot, setErrorNot] = React.useState("");
  const [Value, setValue] = React.useState(currentuser.phone_number);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState(currentuser.email);
  const [username, setUsername] = React.useState(currentuser.username);
  const [phoneNumber, setPhoneNumber] = React.useState(
    currentuser.phone_number
  );

  const UPDATE_USER = gql`
    mutation Mutation($input: updateAcc) {
      updateuser(input: $input) {
        _id
      }
    }
  `;
  const UPDATE_PASSWORD = gql`
    mutation Updatepassword($input: updatePassword) {
      updatepassword(input: $input) {
        _id
      }
    }
  `;
  const [updateUser] = useMutation(UPDATE_USER);
  const [updatePasswordMutation] = useMutation(UPDATE_PASSWORD);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const newno = (event: string) => {
    setPhoneNumber(event);
    setValue(Value);
  };
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

  const updateProfileHandler = () => {
    const mail = validateEmail();
    const phoneno = validatePhoneNumber();

    if (mail === false || phoneno === false || username.trim().length === 0) {
      if (mail === false) {
        setErrorNot("enter a valid Email");
      } else if (phoneno === false) {
        setErrorNot("enter a valid phonenumber");
      } else {
        setErrorNot("All fields are required");
      }
    }

    Store.addNotification({
      title: "Updating profile!",
      message: "Updating...",
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
    updateUser({
      variables: {
        input: {
          email: email.toLowerCase(),
          phone_number: phoneNumber,
          username: username.toLowerCase(),
        },
      },
      onCompleted: (infoData) => {
        Store.addNotification({
          title: "Success",
          message: `Updated successfully!!`,
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
  };
  const updatePassword = () => {
    if (password.trim().length === 0 || confirmPassword !== password) {
      if (confirmPassword !== password) {
        setErrorNot("Password doesn't match");
      } else {
        setErrorNot("All fields are required");
      }
    }
    Store.addNotification({
      title: "Updating Password!",
      message: "Updating...",
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
    updatePasswordMutation({
      variables: {
        input: {
          password: password,
          confirmpassword: confirmPassword,
        },
      },
      onCompleted: (infoData) => {
        Store.addNotification({
          title: "Success",
          message: `Updated successfully!!`,
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
  };
  return (
    <div>
      <div className="px-12 pb-4 text-center text-red-600"> {errorNot}</div>
      <div className="flex flex-wrap">
        <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"text"}
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={"email"}
            label="Email"
            value={email}
            disabled
            onChange={handleEmailChange}
          />
        </FormControl>
      </div>
      <div className="w-full mb-2 mt-4">
        <div className="flex items-center">
          <PhoneInput
            international
            countryCallingCodeEditable={true}
            defaultCountry="US"
            value={Value}
            onChange={newno}
            className="-mx-6 px-8  w-full border rounded  py-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <button
          onClick={updateProfileHandler}
          className="mt-2 bg-blue-400 px-2  text-white py-2 rounded-md"
        >
          Update Profile
        </button>
      </div>
      <div className="mt-10 font-bold text-lg mb-4 ml-2">
        Update Your Password
      </div>
      <div className="flex flex-wrap">
        <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={handlePasswordChange}
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Confirm Password"
          />
        </FormControl>
      </div>

      <div>
        <button
          onClick={updatePassword}
          className="mt-2 bg-blue-400 px-2  text-white py-2 rounded-md"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
