import { Button } from "antd";
import { useState } from "react";
interface PrivacyInterface {
  Store: any;
}
const PrivacyAndSecurity: React.FC<PrivacyInterface> = (props) => {
  const { Store } = props;
  const [errorNotification, setErrorNotification] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value);
  };
  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };
  const handleVerifyPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPassword(event.target.value);
  };

  async function handleChangePassword() {
    Store.addNotification({
      title: "Changing Password",
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
      !oldPassword ||
      oldPassword.trim() === "" ||
      !newPassword ||
      newPassword.trim().length < 7 ||
      !verifyPassword ||
      verifyPassword.trim().length < 7
    ) {
      if (newPassword.trim().length < 7 || verifyPassword.trim().length < 7) {
        setErrorNotification(
          "Password should have a minimum of eight characters."
        );
        return;
      }

      setErrorNotification("Invalid Input!");
      return;
    }
    if (newPassword !== verifyPassword) {
      setErrorNotification("Passwords don’t match.");

      return;
    }
    setIsLoadingUpdate(true);

    const response = await fetch("/api/profile/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        verifyPass: verifyPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setErrorNotification(data.message);
      setIsLoadingUpdate(false);
      Store.addNotification({
        title: "Error!!",
        message: `${data.message}`,
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
    setErrorNotification(data.message);
    // setNewPassword(""), setOldPassword("");
    setVerifyPassword("");
    Store.addNotification({
      title: "Success",
      message: `${data.message}`,
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
    setIsLoadingUpdate(false);
  }
  return (
    <div className="ml-2 mt- py-1 mb-4">
      <div className="text-xl font-bold font-sans">Privacy and security</div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="text-sm mt-3">
          <div className="justify-start">
            <h3 className="font-bold text-lg text-gray-700  ml-1">
              Change Password
            </h3>
          </div>
          <div className="text-red-500">{errorNotification}</div>
          <div className="flex flex-col mt-3">
            <label
              htmlFor="current"
              className="font-semibold text-gray-700 mt-2 italic "
            >
              Current Password
            </label>
            <input
              className="border-2 w-56 px-2 text-white rounded-md mt-3 bg-warmgray h-10 border-gray-500"
              placeholder="current password"
              type="password"
              onChange={handleOldPasswordChange}
              value={oldPassword}
            />
            <label
              htmlFor="newpass"
              className="font-semibold text-gray-700 mt-2 italic "
            >
              New Password
            </label>
            <input
              id="newpass"
              className="border-2 w-56 px-2 text-white rounded-md mt-2 bg-warmgray h-10 border-gray-500"
              placeholder="New password"
              type="password"
              onChange={handleNewPasswordChange}
              value={newPassword}
            />

            <input
              className="border-2 w-56 px-2 text-white rounded-md mt-3  bg-warmgray h-10 border-gray-500"
              placeholder="Verify password"
              type="password"
              onChange={handleVerifyPasswordChange}
              value={verifyPassword}
            />
          </div>
          <div className=" mt-4 w-full flex">
            <Button
              loading={isLoadingUpdate}
              disabled={isLoadingUpdate}
              className="bg-green-500 px-2 py-2 rounded-lg space-x-2  text-white"
              onClick={handleChangePassword}
            >
              Update Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrivacyAndSecurity;
