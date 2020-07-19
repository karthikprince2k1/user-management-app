import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function EditRenderer(props) {
  const handleEdit = function (e) {
    console.log(e.target, props.value);
  };
  return <button onClick={handleEdit}>Edit</button>;
}

function DeleteRenderer(props) {
  return <button>Delete</button>;
}

function UsersTable(props) {
  const columnDefs = [
    {
      headerName: "First Name",
      field: "firstname",
    },
    {
      headerName: "Last Name",
      field: "lastname",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Date of Birth",
      field: "dateofbirth",
    },
    {
      headerName: "Gender",
      field: "gender",
    },
    {
      headerName: "Role(s)",
      field: "role",
    },
    {
      headerName: "Edit",
      field: "user_id",
      editable: false,
      cellRenderer: "editRenderer",
    },
    ,
    {
      headerName: "Delete",
      field: "user_id",
      editable: false,
      cellRenderer: "deleteRenderer",
    },
  ];
  const rowData = props.rowData;

  const defaultColDef = {
    editable: true,
    resizable: true,
    sortable: true,
  };
  const onGridReady = (params) => {
    console.log("Grid Params", params);
    gridOptions.api = params.api;
    gridOptions.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };
  const gridOptions = {
    api: {},
    columnApi: {},
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: defaultColDef,
    onGridReady: onGridReady,
    frameworkComponents: {
      editRenderer: EditRenderer,
      deleteRenderer: DeleteRenderer,
    },
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "250px",
        width: "1000px",
        position: "relative",
        margin: "0 auto",
      }}
    >
      <AgGridReact
        columnDefs={gridOptions.columnDefs}
        rowData={gridOptions.rowData}
        defaultColDef={gridOptions.defaultColDef}
        onGridReady={gridOptions.onGridReady}
        frameworkComponents={gridOptions.frameworkComponents}
      ></AgGridReact>
    </div>
  );
}

export default UsersTable;
