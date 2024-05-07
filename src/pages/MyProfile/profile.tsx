import { Fragment, useEffect, useState } from "react";
import { Store, ReactNotifications } from "react-notifications-component";
import DashboardHome from "../../components/dashboard/dashboardLayout";
import "react-notifications-component/dist/theme.css";
import { useNavigate } from "react-router-dom";
import DashBoardProfileLayout from "../../components/profileDashboard";
import OrderLayout from "../../components/profileDashboard/orderLayout";
import { useQuery, gql } from "@apollo/client";
import SettingsPage from "../../components/profileDashboard/settings";
import SpinnerLayout from "../../components/spinner";

const Profile: React.FC = () => {
  const [home, setHome] = useState(true);
  const [myOrders, setMyOrders] = useState(false);
  const [settings, setSetting] = useState(false);
  const user = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  const MY_ORDERS = gql`
    query Query {
      myorders {
        _id
        academicLevel {
          _id
          academicLevel
        }
        attachmentUrl
        boostServices {
          _id
          description
          title
        }
        createdAt
        deadline
        email
        instructions
        noOfPages
        payment
        noOfSources
        price
        referencingStyle {
          _id
          referencingStyleType
        }
        subject {
          subjectName
          _id
        }
        topic
        urgency
        status
        work {
          _id
          workType
        }
      }
      currentuser {
        _id
        email
        phone_number
        username
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(MY_ORDERS);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;

  const handleChangeToSettings = () => {
    setSetting(true);
    setHome(false);
    setMyOrders(false);
  };
  const handleChangeToOrders = () => {
    setSetting(false);
    setHome(false);
    setMyOrders(true);
  };

  const handleChangeToHome = () => {
    setMyOrders(false);
    setHome(true);
    setSetting(false);
  };

  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden ">
        <ReactNotifications />

        <DashBoardProfileLayout
          home={handleChangeToHome}
          settings={handleChangeToSettings}
          myOrders={handleChangeToOrders}
        />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-10 ">
          {settings && (
            <SettingsPage Store={Store} currentuser={data.currentuser} />
          )}
          {home && <DashboardHome />}
          {myOrders && (
            <OrderLayout
              Store={Store}
              myorders={data.myorders}
              refetch={refetch}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
