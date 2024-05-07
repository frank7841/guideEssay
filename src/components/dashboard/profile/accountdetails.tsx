import { Button } from "antd";
import { useState } from "react";
const axios = require("axios").default;

interface AccountInterface {
  userDetails: any;
  Store: any;
}
const AccountDetails: React.FC<AccountInterface> = (props) => {
  const { userDetails, Store } = props;

  const [names, setNames] = useState(userDetails.firstNames);
  const [email, setEmail] = useState(userDetails.email);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [about, setAbout] = useState("" || userDetails.about);
  const [description, setDescription] = useState("" || userDetails.description);
  const [username, setUsername] = useState(userDetails.username);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim().replace(/[^A-Z0-9.]+/gi, ""));
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNames(event.target.value);
  };
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleChangeAbout = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleUpdateDetails = () => {
    Store.addNotification({
      title: "Updating Your Information",
      message: `Updating Your Information`,
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
      !username ||
      username.trim() === "" ||
      !names ||
      names.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !description ||
      description.trim().length < 7 ||
      !about ||
      about.trim().length < 7
    ) {
      if (!username || username.trim() === "") {
        Store.addNotification({
          title: "Error!!",
          message: `Username Cannot be Empty`,
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
      if (!names || names.trim() === "") {
        Store.addNotification({
          title: "Error!!",
          message: `First Name is Required`,
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
      if (!lastName || lastName.trim() === "") {
        Store.addNotification({
          title: "Error!!",
          message: `Last Name is Required`,
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
      if (!description || description.trim() === "") {
        Store.addNotification({
          title: "Error!!",
          message: `Description is Required`,
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
        if (!about || about.trim() === "") {
          Store.addNotification({
            title: "Error!!",
            message: `About is Required`,
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
    }
    setIsLoading(true);
    axios
      .patch("/api/profile/updateDetails", {
        firstNames: names,
        lastName: lastName,
        description: description,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        about: about,
      })
      .then((response: { data: any }) => {
        // const data = response.data;

        setIsLoading(false);
        Store.addNotification({
          title: "Success",
          message: `Profile Updated successfully!!`,
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
      })
      .catch((error: Error) => {
        setIsLoading(false);
        Store.addNotification({
          title: "Error",
          message: `${error.message}`,
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
  };

  return (
    <div className="mt-2 ml-2">
      <div className="font-bold text-xl ">Account Details</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">Username</div>
      <div>
        <input
          className="border-2 w-56 text-white rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="username"
          type="text"
          onChange={handleChangeUsername}
          value={username}
        />
      </div>
      <div className=" font-semibold text-gray-700 mt-2 italic">Email</div>
      <div>
        <input
          className="border-2 w-56 text-white rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Email"
          type="email"
          onChange={handleChangeEmail}
          value={email}
        />
      </div>
      <div className="font-semibold italic text-gray-700">First Name</div>
      <div>
        <input
          className="border-2 w-56 text-white rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Names"
          type="text"
          onChange={handleChangeNames}
          value={names}
        />
      </div>
      <div className="font-semibold italic text-gray-700">Last Name</div>
      <div>
        <input
          className="border-2 w-56 text-white rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="Names"
          type="text"
          onChange={handleChangeLastName}
          value={lastName}
        />
      </div>
      <div className="font-semibold italic text-gray-700">Description</div>

      <div>
        <textarea
          className="border-2 py-1 w-10/12 px-2 text-black rounded-md mt-3 bg-gray-400  border-gray-500"
          rows={4}
          onChange={handleChangeDescription}
          value={description}
        />
      </div>

      <div className="font-semibold italic text-gray-700">About</div>

      <div>
        <textarea
          className="border-2 py-1 w-10/12 px-2 text-black rounded-md mt-3 bg-gray-400  border-gray-500"
          rows={8}
          onChange={handleChangeAbout}
          value={about}
        />
      </div>
      <div className=" mt-4 w-full flex">
        <Button
          loading={isLoading}
          // disabled={isLoading}
          className="bg-green-500 px-2 py-2 space-x-2  rounded-lg text-white"
          onClick={handleUpdateDetails}
        >
          Update Details
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
