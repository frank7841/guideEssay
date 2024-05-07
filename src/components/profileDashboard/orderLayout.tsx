import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { ORDER } from "../../types/order";

const columns: GridColDef[] = [
  {
    field: "topic",
    headerName: "topic",
    width: 150,
  },

  {
    field: "price",
    headerName: "price",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => `$${params.row.price}`,
  },
  {
    field: "academicLevel",
    headerName: "Academic Level",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.academicLevel?.academicLevel,
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.subject?.subjectName,
  },
  {
    field: "Work",
    headerName: "Work",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => params.row.work?.workType,
  },
  {
    field: "noOfPages",
    headerName: "No of Pages",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 220,
  },
  {
    field: "status",
    headerName: "Status",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.status === "0" ? "in Progess" : "Completed"}`,
  },
  {
    field: "attachmentUrl",
    headerName: "File",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params: GridRenderCellParams<any>) => (
      <strong>
        <button
          onClick={() => {
            // params.value.forEach((value: string) => window.open(value));
            for (var i = 0; i < params.value.length; i++) {
              // link.setAttribute("href", urls[i]);
              // link.click();
              window.open(params.value[i], "_blank");
            }
          }}
          className="text-blue-400"
        >
          Download
        </button>
      </strong>
    ),
    // valueGetter: (params: GridValueGetterParams) => `Download`,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function OrderLayout(props: ORDER) {
  const { myorders } = props;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        // @ts-ignore
        rows={myorders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(item) => item._id}
        // @ts-ignore
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
