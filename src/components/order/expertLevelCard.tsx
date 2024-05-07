import React from "react";
interface PROPS {
  item: {
    _id: string;
    title: string;
    description: string;
    cost: string;
    select: boolean;
  };
}
const ExpertLevelCard = (props: PROPS) => {
  const { title, description, cost, select } = props.item;
  return (
    <div className="w-52 px-4 py-2 border border-gray-400 rounded-md">
      <div className="">{title}</div>
      <div className="mt-4 mb-4">{description}</div>
      <hr />
      <div className="flex flex-row justify-between items-center text-sm">
        <div className="mt-2">{cost}</div>
        <div
          className={`rounded-full border ${
            select ? "border-blue-400 bg-blue-400" : "border-gray-400"
          }  w-4 h-4`}
        ></div>
      </div>
    </div>
  );
};

export default ExpertLevelCard;
