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

function ContactsTable(props) {
  const columnDefs = [
    {
      headerName: "Type",
      field: "type",
    },
    {
      headerName: "Contact",
      field: "contact",
    },
    {
      headerName: "Edit",
      field: "contact_id",
      editable: false,
      cellRenderer: "editRenderer",
    },
    ,
    {
      headerName: "Delete",
      field: "row",
      editable: false,
      cellRenderer: "deleteRenderer",
    },
  ];
  const rowData = [
    { type: "Phone", contact: "123-476-1789", contact_id: 1 },
    { type: "Mobile", contact: "345-476-1789", contact_id: 2 },
  ];

  const defaultColumnDefs = {
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
    defaultColDef: defaultColumnDefs,
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
        height: "180px",
        width: "600px",
      }}
    >
      <AgGridReact
        columnDefs={gridOptions.columnDefs}
        rowData={gridOptions.rowData}
        defaultColDef={gridOptions.defaultColumnDefs}
        onGridReady={gridOptions.onGridReady}
        frameworkComponents={gridOptions.frameworkComponents}
      ></AgGridReact>
    </div>
  );
}

export default ContactsTable;
