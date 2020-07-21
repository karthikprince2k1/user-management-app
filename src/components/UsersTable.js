import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getUsers, deleteUserByUserId } from "../helpers/userHelpers";
import { updateUsers } from "../actions/userActions";

function EditRenderer(props) {
  const history = useHistory();
  const handleEdit = function (e) {
    console.log(e.target, props.value);
    history.push("/createuser/" + props.value);
  };
  return <button onClick={handleEdit}>Edit</button>;
}

function DeleteRenderer(props) {
  const dispatch = useDispatch();
  const handleDelete = function (e) {
    if (window.confirm("Do you want to delete user?")) {
      deleteUserByUserId(props.value).then((data) => {
        console.log("Successfully Deleted", data);

        getUsers().then((users) => {
          console.log(users.data);
          dispatch(updateUsers(users.data));
        });
      });
    } else {
      // Do nothing!
      console.log("Nothing deleted");
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}

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
        <div>
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
