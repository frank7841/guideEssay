import ResetPassword from "../components/resetpassword/reset-passwordpage";
// import ResetPasswordPage from '../../../components/ResetPasswordPage';
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token, id } = useParams();
  return (
    <Fragment>
      <ReactNotifications />
      <ResetPassword userId={id} resetToken={token} Store={Store} />
    </Fragment>
  );
};

export default ResetPasswordPage;
