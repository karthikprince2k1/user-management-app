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

class UsersTable extends React.Component {
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
        {
          headerName: "Delete",
          field: "user_id",
          editable: false,
          cellRenderer: "deleteRenderer",
        },
      ],
    };
  }

  handleExcelExport = () => {
    let params = {
      fileName: "export.csv",
    };
    this.state.api.exportDataAsCsv(params);
  };

  onGridReady = (params) => {
    this.setState({
      api: params.api,
      columnApi: params.columnApi,
    });
    params.api.sizeColumnsToFit();
  };

  // handleColumnSelection = () => {};

  render() {
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
        <div className="util-btns">
          <Link to="/createuser">
            <button>Create User</button>
          </Link>
          <button onClick={this.handleExcelExport}>CSV Export</button>

          {/* <button onClick={this.handleColumnSelection}>Select Columns</button>
          <div>
            {this.state.columnDefs.map(c => )}
          </div> */}
        </div>

        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.users}
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
    users: state.users,
  };
};

export default connect(mapStateToProps)(UsersTable);
