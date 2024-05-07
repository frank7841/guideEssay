import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import SpinnerLayout from "../../components/spinner";
// const Guarantees =()=>{

//     return(
//         <div>Test</div>
//     )
// }
// export default Guarantees

export default function Guarantees() {
  const navigate = useNavigate();
  const GET_GUARANTEES = gql`
    query Query {
      allGuarantees {
        _id
        title
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_GUARANTEES,{
    fetchPolicy: 'network-only',
  });

  if (loading) return <SpinnerLayout />;
  if (error) return <div>Error! {error.message}</div>;
  return (
    <div className="mt-10 mb-8 font-sans">
      <div className="text-center px-4 text-gray-600 flex justify-center items-center flex-col ">
        <div className="font-bold text-xl">Guarantees</div>
        {data.allGuarantees.map(
          (item: { _id: string; title: string; description: string }) => {
            const slugUrl = item.title
              .replace(/[^A-Z0-9.]+/gi, "-")
              .toLowerCase();

            return (
              <div
                className="flex flex-row space-x-2 justify-center mt-4 w-3/5"
                key={item._id}
              >
                <div className="border px-4 py-4 rounded">
                  <div className=" font-bold text-left text-xl">
                    <h1>{item.title}</h1>
                  </div>
                  <div className=" text-left text-md">{item.description}</div>
                  <button
                    className=" text-left text-md text-blue-400 justify-start items-start flex mt-2"
                    onClick={() =>
                      navigate(slugUrl, {
                        state: item._id,
                      })
                    }
                  >
                    Read more
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
