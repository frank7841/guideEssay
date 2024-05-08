import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { gql, useMutation } from "@apollo/client";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAppDispatch } from "../../redux/hooks";
import { addUser } from "../../redux/states/userState";
import ResetPassModal from "./reset-password";

interface PROPS {
  open: boolean;
  setOpen: (value: boolean) => void;
  Store: any;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
  borderRadius: 4,
};

export default function LoginModal(props: PROPS) {
  const dispatch = useAppDispatch();
  const { open, setOpen, Store } = props;
  const handleClose = () => setOpen(false);
  const [errorNot, setErrorNot] = React.useState("");
  const [Value, setValue] = React.useState();

  const [signup, setSignup] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const LOGINUSER = gql`
    # Increments a back-end counter and gets its resulting value
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        userId
        tokenExpiration
        username
        role
      }
    }
  `;
  const SIGNUPUSER = gql`
    mutation CreateUser($createAcc: CreateAcc) {
      createUser(createAcc: $createAcc) {
        email
        role
        username
      }
    }
  `;
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
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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
  const newno = (event: string) => {
    setPhoneNumber(event);
    setValue(Value);
  };

  const [loginUser] = useMutation(LOGINUSER);
  const [signupUser] = useMutation(SIGNUPUSER);
  const LoginHandler = () => {
    const mail = validateEmail();
    if (password.trim().length === 0 || mail === false) {
      if (mail === false) {
        setErrorNot("enter a valid Email");
      } else {
        setErrorNot("All fields are required");
      }
    }
    Store.addNotification({
      title: "Login!",
      message: "Logining!",
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
    loginUser({
      variables: {
        email: email,
        password: password,
      },
      onCompleted: (infoData) => {
        const user = infoData.login;

        localStorage.setItem("token", JSON.stringify(user));

        Store.addNotification({
          title: "Success",
          message: `Login successfully!!`,
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
        dispatch(
          addUser({
            id: user.userId,
            role: user.role,
            username: user.username,
          })
        );
        setPassword("");
        setEmail("");
        handleClose();
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
  const SignupHandler = () => {
    const mail = validateEmail();
    const phoneno = validatePhoneNumber();

    if (
      password.trim().length === 0 ||
      mail === false ||
      phoneno === false ||
      username.trim().length === 0 ||
      confirmPassword !== password
    ) {
      if (mail === false) {
        setErrorNot("enter a valid Email");
      } else if (phoneno === false) {
        setErrorNot("enter a valid phonenumber");
      } else if (confirmPassword !== password) {
        setErrorNot("Password doesn't match");
      } else {
        setErrorNot("All fields are required");
      }
    }

    Store.addNotification({
      title: "Signing Up!",
      message: "Signing Up!",
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
    signupUser({
      variables: {
        createAcc: {
          confirmpassword: confirmPassword,
          email: email.toLowerCase(),
          password: password,
          phone_number: phoneNumber,
          username: username.toLowerCase(),
        },
      },
      onCompleted: (infoData) => {
        setSignup(false);
        Store.addNotification({
          title: "Success",
          message: `Signup successfully!!`,
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
        setPassword("");
        setConfirmPassword("");
        setUsername("");
        setPhoneNumber("");
        setEmail("");
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isOpen ? (
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            // p: 6,
            borderRadius: 4,
          }}
        >
          <ResetPassModal
            setIsOpen={setIsOpen}
            close={handleClose}
            setSignup={setSignup}
          />
        </Box>
      ) : (
        <>
          {!signup ? (
            <Box sx={style}>
              <div className="px-12 pb-4 text-center text-2xl text-gray-600">
                {" "}
                Login
              </div>
              <div className="px-12 pb-4 text-center text-red-600">
                {" "}
                {errorNot}
              </div>
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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
              <button
                className="text-xs bg-white text-red-400 hover:text-red-600 mb-4"
                onClick={() => setIsOpen(true)}
                type="button"
              >
                Forgot Password?
              </button>

              <div>
                <button
                  onClick={LoginHandler}
                  className="mt-2 bg-blue-400 px-2 w-full text-white py-2 rounded-md"
                >
                  Login
                </button>
              </div>
              <div className="w-full flex items-center justify-center">
                <p>Don't have an account ?<button
                  onClick={() => setSignup(true)}
                  className="mt-2 hover:text-blue-700 px-2 text-center  text-blue-400 py-2 rounded-md"
                >
                  signup
                </button></p>
              </div>
            </Box>
          ) : (
            <Box sx={style}>
              <div className="px-12 pb-4 text-center text-2xl text-gray-600">
                {" "}
                Signup
              </div>
              <div className="px-12 pb-4 text-center text-red-600">
                {" "}
                {errorNot}
              </div>
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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
              <FormControl sx={{ m: 1, width: "95%" }} variant="outlined">
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

              <div>
                <button
                  onClick={SignupHandler}
                  className="mt-2 bg-blue-400 px-2 w-full text-white py-2 rounded-md"
                >
                  Signup
                </button>
              </div>
              <div className="w-full flex items-center justify-center">
                <p> Already have an account? <button
                  onClick={() => setSignup(false)}
                  className="mt-2 hover:text-blue-700 px-2 text-center  text-blue-400 py-2 rounded-md"
                >
                  login
                </button>
                </p>
              </div>
            </Box>
          )}
        </>
      )}
    </Modal>
  );
}
