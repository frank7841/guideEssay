import { Button, Input } from "antd";
import { useState } from "react";
import QuillInput from "../../quill";
import { gql, useMutation } from "@apollo/client";

const NewGuaranteeLayout = (props: { Store: any }) => {
  const { Store } = props;
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleStatus, setTitleStatus] = useState<any>("");
  const [descriptionStatus, setDescriptionStatus] = useState<any>("");
  const [text, setText] = useState("");

  const ADDSERVICE = gql`
    mutation Mutation($createguarantee: GuaranteesCreate) {
      createGuarantee(createguarantee: $createguarantee) {
        _id
      }
    }
  `;

  const [addService] = useMutation(ADDSERVICE);

  // console.log(imageUrl);
  const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const createNewGuarantee = () => {
    if (
      !title ||
      title.trim().length === 0 ||
      !description ||
      description.trim().length === 0 ||
      !text ||
      text.trim().length === 0
    ) {
      if (!title || title.trim().length === 0) {
        setTitleStatus("error");
        Store.addNotification({
          title: "Missing Field!!",
          message: `Title is Required!`,
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
      if (!description || description.trim().length === 0) {
        setDescriptionStatus("error");
        Store.addNotification({
          title: "Missing Field!!",
          message: `service is Required!`,
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
      if (!text || text.trim().length === 0) {
        Store.addNotification({
          title: "Missing Field!!",
          message: `Content is Required!`,
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
    setIsLoading(true);
    Store.addNotification({
      title: "Uploading",
      message: "Uploading!",
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
    addService({
      variables: {
        createguarantee: {
          content: text,
          description,
          title,
        },
      },
      onCompleted: (infoData) => {
        Store.addNotification({
          title: "Success",
          message: `Guarantee added successfully!!`,
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
        setTitle("");
        setDescription("");
        setText("");
        setTitleStatus("");
        setDescriptionStatus("");
        setIsLoading(false);
      },
      onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          setIsLoading(false);

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
    <main className="w-full">
      <div className="px-2 text-lg font-bold text-gray-900">
        CREATE A NEW GUARANTEE
      </div>

      <div className=" font-semibold text-gray-700 mt-2 ml-2 italic text-lg">
        Title
      </div>
      <div>
        <Input.TextArea
          className="border-2  py-1 w-9/12  rounded-md mt-1 ml-2 mb-3 px-2 bg-gray-50  border-gray-500"
          placeholder="Title"
          rows={3}
          value={title}
          onChange={handleChangeTitle}
          status={titleStatus}
        />
      </div>
      <div className=" font-semibold text-gray-700 mt-2 ml-2 italic text-lg">
        Short Description
      </div>
      <div>
        <Input.TextArea
          className="border-2  py-1 w-9/12 rounded-md mt-1 ml-2 mb-3 px-2 bg-gray-50  border-gray-500"
          placeholder="Short Description"
          rows={3}
          value={description}
          onChange={handleChangeDescription}
          status={descriptionStatus}
          // onChange={handleChangeUsername}
          // value={username}
        />
      </div>

      <div className=" font-semibold text-gray-700 mt-2 ml-2 italic text-lg">
        Content
      </div>
      <div className="w-full mt-2 px-2  mb-20 container ">
        <QuillInput text={text} setText={setText} />
      </div>

      <div className="flex flex-row space-x-4 ml-4 mt-2 mb-4">
        <Button
          className="px-4  border border-sky-600 bg-blue-800 rounded-lg text-sky-400 space-x-2 bg-transparent"
          // ghost
          onClick={createNewGuarantee}
          loading={isLoading}
        >
          Publish
        </Button>
      </div>
    </main>
  );
};

export default NewGuaranteeLayout;
