import { Fragment, useEffect, useState } from "react";
import { Store, ReactNotifications } from "react-notifications-component";
import DashBoardLayout from "../../components/dashboard";
import DashboardHome from "../../components/dashboard/dashboardLayout";
import "react-notifications-component/dist/theme.css";
import NewServiceLayout from "../../components/dashboard/newpost";
import NewFaqLayout from "../../components/dashboard/newpost/newFaq";
import NewGuaranteeLayout from "../../components/dashboard/newpost/newGuarantee";
import { useNavigate } from "react-router-dom";
import SettingsPage from "../../components/profileDashboard/settings";
import { useQuery, gql } from "@apollo/client";
import AllOrderLayout from "../../components/dashboard/allOrders";
import DashboardSettings from "../../components/dashboard/settingsLayout";
import SpinnerLayout from "../../components/spinner";
import UpdateSettings from "../../components/dashboard/updateSettings";

const Dashboard: React.FC = () => {
  const [home, setHome] = useState(true);
  const [newService, setNewService] = useState(false);
  const [profile, setProfile] = useState(false);
  const [faq, setFaq] = useState(false);
  const [orders, setOrders] = useState(false);
  const [guarantees, setGuarantees] = useState(false);
  const [settings, setSettings] = useState(false);
  const [updatesettings, setUpdateSettings] = useState(false);
  const user = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);
  const MY_ORDERS = gql`
    query Query {
      orders {
        _id
        academicLevel {
          _id
          academicLevel
        }
        attachmentUrl
        boostServices {
          _id
          title
        }
        deadline
        email
        instructions
        noOfPages
        noOfSources
        payment
        phonenumber
        createdAt
        price
        referencingStyle {
          _id
          referencingStyleType
        }
        status
        subject {
          _id
          subjectName
        }
        topic
        work {
          _id
          workType
        }
        user {
          _id
          username
        }
      }
      currentuser {
        _id
        email
        phone_number
        username
      }
      allPriceRates {
        _id
        hourlyRate
        pricePerDoublePage
        pricePerSinglePage
      }
      academicLevels {
        academicLevel
        _id
        amount
      }
      allWork {
        _id
        amount
        workType
      }
      referencingStyles {
        _id
        amount
        referencingStyleType
      }
      allSubjects {
        _id
        subjectName
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(MY_ORDERS);

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;
  const handleChangeToProfile = () => {
    setProfile(true);
    setHome(false);
    setNewService(false);
    setFaq(false);
    setGuarantees(false);
    setOrders(false);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToFaqs = () => {
    setProfile(false);
    setHome(false);
    setNewService(false);
    setFaq(true);
    setGuarantees(false);
    setOrders(false);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToGuarantees = () => {
    setProfile(false);
    setHome(false);
    setNewService(false);
    setFaq(false);
    setGuarantees(true);
    setOrders(true);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToPost = () => {
    setProfile(false);
    setHome(false);
    setNewService(true);
    setFaq(false);
    setGuarantees(false);
    setOrders(false);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToHome = () => {
    setProfile(false);
    setHome(true);
    setNewService(false);
    setFaq(false);
    setGuarantees(false);
    setOrders(false);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToAllPosts = () => {
    setProfile(false);
    setHome(false);
    setNewService(false);
    setFaq(false);
    setGuarantees(false);
    setOrders(true);
    setSettings(false);
    setUpdateSettings(false);
  };
  const handleChangeToAllSettings = () => {
    setProfile(false);
    setHome(false);
    setNewService(false);
    setFaq(false);
    setGuarantees(false);
    setOrders(false);
    setSettings(true);
    setUpdateSettings(false);
  };
  const handleChangeToUpdateSettings = () => {
    setProfile(false);
    setHome(false);
    setNewService(false);
    setFaq(false);
    setGuarantees(false);
    setOrders(false);
    setSettings(false);
    setUpdateSettings(true);
  };

  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden ">
        <ReactNotifications />

        <DashBoardLayout
          home={handleChangeToHome}
          post={handleChangeToPost}
          profile={handleChangeToProfile}
          faq={handleChangeToFaqs}
          guarantee={handleChangeToGuarantees}
          allPosts={handleChangeToAllPosts}
          settings={handleChangeToAllSettings}
          updatesettings={handleChangeToUpdateSettings}
        />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-10 ">
          {newService && <NewServiceLayout Store={Store} />}
          {home && <DashboardHome />}
          {faq && <NewFaqLayout Store={Store} />}
          {guarantees && <NewGuaranteeLayout Store={Store} />}
          {profile && (
            <SettingsPage Store={Store} currentuser={data.currentuser} />
          )}
          {settings && (
            <DashboardSettings
              Store={Store}
              allPricesRates={data.allPriceRates[0]}
            />
          )}
          {orders && (
            <AllOrderLayout
              Store={Store}
              myorders={data.orders}
              refetch={refetch}
            />
          )}

          {updatesettings && (
            <UpdateSettings Store={Store} details={data} refetch={refetch} />
          )}

          {/* {profile && (
            <DashboardProfile
              userDetails={user}
              Store={Store}
            />
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
