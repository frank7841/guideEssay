import React, { useEffect } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
const axios = require("axios").default;

export default function QuillInput(props) {
  const { setText, text } = props;

  const theme = "snow";
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const placeholder = "What's on your on mind today...";

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
    "video",
    "color",
    "background",
    "clean",
  ];

  const { quillRef, quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });
  function quill_img_handler() {
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute(
      "accept",
      "image/png, image/PNG, image/gif, image/jpeg, image/svg,image/jpg, image/bmp, image/x-icon, image/hevc,image/heif"
    );
    fileInput.click();

    fileInput.onchange = () => {
      const files = fileInput.files;

      if (!files || !files.length) {
        console.log("No files selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", files[0]);

      // this.quill.enable(false);

      axios
        .post("/api/post/imageupload", formData)
        .then((response) => {
          // this.quill.enable(true);
          insertToEditor(response.data.image);
          // this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
          // fileInput.value = "";
        })
        .catch((error) => {
          console.log("quill image upload failed");
          console.log(error);
          // this.quill.enable(true);
        });
    };
  }
  useEffect(() => {
    if (quill) {
      quill.getModule("toolbar").addHandler("image", quill_img_handler);
      quill.clipboard.dangerouslyPasteHTML(text);
      quill.on("text-change", (delta, oldDelta, source) => {
        setText(quill.root.innerHTML); // Get innerHTML using quill
        //  console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("Your Image Server URL", {
      method: "POST",
      body,
    });
    insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  return (
    <div className="w-full container h-72">
      <div ref={quillRef} className="container" />
    </div>
  );
}
