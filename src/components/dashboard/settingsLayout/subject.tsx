import { gql, useMutation } from "@apollo/client";
import { Button } from "antd";
import { useState } from "react";

interface AccountInterface {
  Store: any;
}
const SubjectLayout: React.FC<AccountInterface> = (props) => {
  const { Store } = props;

  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ADDSUBJECT = gql`
    mutation CreateSubject($subjectName: String!) {
      createSubject(subjectName: $subjectName) {
        _id
      }
    }
  `;

  const [addSubject] = useMutation(ADDSUBJECT);

  const handleChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleUpdateDetails = () => {
    setIsLoading(true);

    Store.addNotification({
      title: "Adding...",
      message: `Adding Subject`,
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
    try {
      addSubject({
        variables: {
          subjectName: subject,
        },
        onCompleted: (infoData) => {
          Store.addNotification({
            title: "Success",
            message: `Subject Added successfully!!`,
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
          setIsLoading(false);
        },
        onError: ({ graphQLErrors, networkError }) => {
          setIsLoading(false);

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
    } catch (err: any) {
      Store.addNotification({
        title: "Error!!",
        message: `${err.message}`,
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
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 ml-2">
      <div className="font-bold text-xl ">Subject</div>

      <div className=" font-semibold text-gray-700 mt-2 italic">
        Subject Name
      </div>
      <div>
        <input
          className="border-2 w-56   rounded-md mt-1 mb-3 px-2 bg-warmgray h-10 border-gray-500"
          placeholder="subject name"
          type="text"
          onChange={handleChangeSubject}
          value={subject}
        />
      </div>

      <div className=" mt-4 w-full flex">
        <Button
          loading={isLoading}
          // disabled={isLoading}
          className="bg-blue-400 font-bold text-white space-x-2  rounded-lg  "
          onClick={handleUpdateDetails}
        >
          Add Subject
        </Button>
      </div>
    </div>
  );
};

export default SubjectLayout;
