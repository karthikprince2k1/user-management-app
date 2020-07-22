import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

afterEach(cleanup);

test("renders View Users link", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const linkElement = getByText(/View Users/i);
  expect(linkElement).toBeInTheDocument();

  const createUserLink = getByText(/Create User/i);
  expect(createUserLink).toBeInTheDocument();
});

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  const { container, getByText, getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(container.innerHTML).toMatch("Home Component");

  fireEvent.click(getByText(/View Users/i));

  // check that the content changed to the new page
  expect(container.innerHTML).toMatch("View Users");

  fireEvent.click(getByTestId("createuser-link"));

  // check that the content changed to the new page
  expect(container.innerHTML).toMatch("Create/Update User");
});

test("landing on a bad page shows 404 page", () => {
  const history = createMemoryHistory();
  history.push("/bad/route");
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const notFoundEl = getByText(/Not Found/i);
  expect(notFoundEl).toBeInTheDocument();
});
