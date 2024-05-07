import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ORDER } from "../../../types/order";
import { Button } from "@mui/material";
import OrderDetailsModal from "../../modal/orderDetails";

export default function AllOrderLayout(props: ORDER) {
  const { myorders, Store, refetch } = props;
  const [open, setOpen] = React.useState(false);
  const [currentRowDetails, setCurrentRowDetails] = React.useState<any>({});
  const handleOpen = () => setOpen(true);
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
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.status === "0" ? "in Progess" : "Completed"}`,
    },
    {
      field: "phonenumber",
      headerName: "Contact Number",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) => params.row.phonenumber,
    },
    {
      field: "email",
      headerName: "Email Address",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) => params.row.email,
    },
    {
      field: "View",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e: any) => {
          const currentRow = params.row;
          setCurrentRowDetails(currentRow);
          handleOpen();
        };

        return <Button onClick={onClick}>View</Button>;
      },
    },
    // {
    //   field: "Files",
    //   headerName: "Files",
    //   sortable: false,
    //   renderCell: (params) => {
    //     const onClick = (e: any) => {
    //       const currentRow = params.row;
    //       setCurrentRowDetails(currentRow);
    //       handleOpen();
    //     };

    //     return <Button onClick={onClick}>Download</Button>;
    //   },
    // },
  ];
  return (
    <div>
      <OrderDetailsModal
        open={open}
        setOpen={setOpen}
        refetch={refetch}
        Store={Store}
        currentRowDetails={currentRowDetails}
      />

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
    </div>
  );
}
