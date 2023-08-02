import React from "react";
import { screen, render } from "@testing-library/react";
import Heading from "./heading";

describe("Testing the Heading component", () => {
  it("display title if we pass any non-empty string", () => {
    const title = "OCS Trello Board";
    render(<Heading title={title} />);
    const titleElement = screen.getByText("OCS Trello Board");
    expect(titleElement).toBeInTheDocument();
  });
  it("should not display the title if title is empty", () => {
    const title = "";
    render(<Heading title={title} />);
    const titleElement = screen.queryByText("OCS Trello Board");
    expect(titleElement).not.toBeInTheDocument();
  });
  it("should also not display the title if props is null", () => {
    const title = null;
    render(<Heading title={title} />);
    const titleElement = screen.queryByText("OCS Trello Board");
    expect(titleElement).not.toBeInTheDocument();
  });
  it(`check if component have "heading" class`, () => {
    const title = "OCS Trello Board";
    render(<Heading title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toHaveClass("heading");
  });
  it(`check if component rendering successfully`, () => {
    const title = "OCS Trello Board";
    render(<Heading title={title} />);
    const headingComponent = screen.getByTestId("heading-component");
    expect(headingComponent).toBeTruthy();
  });
});
