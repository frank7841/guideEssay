import React from "react";
import { Link } from "react-router-dom";

interface PROPS {
  id: string;
  name: string;
}

const ServiceCard = (props: PROPS) => {
  const { name, id } = props;
  const slugUrl = name.replace(/[^A-Z0-9.]+/gi, "-").toLowerCase();
  return (
    <Link to={slugUrl} state={id}>
      <button className="border border-blue-500 rounded-md w-56  text-center py-2 text-blue-500">
        {name}
      </button>
    </Link>
  );
};

export default ServiceCard;
