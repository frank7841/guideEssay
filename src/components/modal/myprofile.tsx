import * as React from "react";
import Typography from "@mui/material/Box";
import "react-phone-number-input/style.css";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Popover } from "@mui/material";


interface PROPS {
  open: boolean;
  setOpen: (value: boolean) => void;
  Store: any;
}
// const style = {
//   position: "relative" as "relative",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,

//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 6,
//   borderRadius: 4,
// };
export default function MyProfileModal(props: PROPS) {
  const navigate = useNavigate();
  const { open, setOpen, Store } = props;
  const handleClose = () => {
    localStorage.removeItem("token");

    setOpen(false);
  };

  function handleClick() {

    navigate('/myProfile');
    setOpen(false);
  }


  return (
    <Popover

      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Typography sx={{ p: 2 }}>
        <div className="px-12 pb-4  text-center text-2xl text-blue-600">
          Joe Doe
        </div>
        <div className="px-12 pb-4 text-center text-blue-600">
          joedoe@gmail.com
        </div>
        <div>
          {/* <Link to={"/myProfile"}> */}
          <button
            onClick={handleClick}
            className="bg-orange-400 px-2 text-white py-2 rounded-md align-items-left mx-4">
            All My Orders
          </button>
          {/* </Link> */}
          <button
            onClick={handleClose}
            className="bg-orange-400 px-2  text-white py-2 rounded-md mx-4"
          >
            Log Out
          </button>
        </div>
      </Typography>
    </Popover>
  );
}
