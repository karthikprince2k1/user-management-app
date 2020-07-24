import React from "react";
import { Router } from "react-router-dom";
import { createStore } from "redux";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup, waitForDomChange } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

afterEach(cleanup);

describe("View Users Route test Suite", () => {
  it("should render the view users screen with data from store", async () => {
    const store = createStore(() => {
      users: [
        {
          user_id: 5,
          suffix: "Mr.",
          firstname: "ricky",
          lastname: "karthik",
          email: "ricky.karthik@gmail.com",
          dateofbirth: "2020-07-04",
          gender: "male",
          role: "read;admin",
        },
      ];
    });
    const history = createMemoryHistory();
    history.push("/viewusers");
    const { getByText, debug } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitForDomChange();

    debug();

    const ricky = getByText("ricky");
    expect(ricky).toBeInTheDocument();
    const email = getByText(/ricky.karthik@gmail.com/i);
    expect(email).toBeInTheDocument();
  });
});
