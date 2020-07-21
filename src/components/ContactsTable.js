import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { DeleteRenderer } from "./DeleteRenderer";
import { EditRenderer } from "./EditRenderer";
import { Link } from "react-router-dom";

const defaultColDef = {
  editable: true,
  resizable: true,
  sortable: true,
};

class ContactsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {},
      columnApi: {},
      defaultColDef: defaultColDef,
      frameworkComponents: {
        editRenderer: EditRenderer,
        deleteRenderer: DeleteRenderer,
      },
      columnDefs: [
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
      ],
    };
  }

  onGridReady = (params) => {
    this.setState({
      api: params.api,
      columnApi: params.columnApi,
    });
    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{
          height: "180px",
          width: "600px",
        }}
      >
        <div className="util-btns">
          <Link to={"/createcontact/" + this.props.userId}>
            <button>Add Contact</button>
          </Link>
          {/* <button onClick={this.handleColumnSelection}>Select Columns</button>
          <div>
            {this.state.columnDefs.map(c => )}
          </div> */}
        </div>

        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.contacts}
          defaultColDef={this.state.defaultColDef}
          onGridReady={this.onGridReady}
          frameworkComponents={this.state.frameworkComponents}
        ></AgGridReact>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(ContactsTable);

/*

function ContactsTable(props) {

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

export default ContactsTable;*/
