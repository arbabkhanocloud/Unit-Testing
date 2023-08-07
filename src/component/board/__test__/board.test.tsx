import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";

import Board from "../board";
import { renderWithProviders } from "../../utils/util";

describe("testing the board component", () => {
  test("Board should render initial columns and adding list option correctly", () => {
    renderWithProviders(<Board />);
    const columnTitles = ["To Do", "In Progress", "Done"];

    for (const title of columnTitles) {
      const columnElement = screen.getByText(title);
      expect(columnElement).toBeInTheDocument();
    }

    const addColumnButton = screen.getByText("+ Add another list");
    expect(addColumnButton).toBeInTheDocument();
  });
  test("Clicking the 'Add another list' button should show the text are and buttons for adding a new column", () => {
    renderWithProviders(<Board />);
    const addButton = screen.getByText("+ Add another list");
    fireEvent.click(addButton);

    const textarea = screen.getByPlaceholderText("List title");
    const addListButton = screen.getByRole("button", { name: "Add list" });
    const removeButton = screen.getByRole("button", { name: "Remove" });
    expect(textarea).toBeInTheDocument();
    expect(addListButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  test("Entering an empty title in the textarea and clicking the 'Add list' button should not add any new column to the board", () => {
    renderWithProviders(<Board />);
    const addButton = screen.getByText("+ Add another list");
    fireEvent.click(addButton);

    const textarea = screen.getByPlaceholderText("List title");
    const addListButton = screen.getByRole("button", { name: "Add list" });
    const removeButton = screen.getByRole("button", { name: "Remove" });
    expect(textarea).toBeInTheDocument();
    expect(addListButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    expect(textarea).toHaveValue("");
    fireEvent.click(addListButton);

    expect(textarea).toBeInTheDocument();
    expect(addListButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    const newColumn = screen.queryByText("New Column");
    expect(newColumn).not.toBeInTheDocument();
  });

  test("Entering a valid title in textare and clicking the 'Add list' button should add a new column to the board with the provided title", async () => {
    renderWithProviders(<Board />);
    const addButton = screen.getByText("+ Add another list");
    fireEvent.click(addButton);

    const inputField = screen.getByPlaceholderText(
      "List title"
    ) as HTMLInputElement;
    const addListButton = screen.getByText("Add list");

    fireEvent.change(inputField, { target: { value: "New Column" } });
    console.log("input after change:", inputField.value);
    fireEvent.click(addListButton);

    await waitFor(() => {
      const newColumn = screen.getByText("New Column");
      expect(newColumn).toBeInTheDocument();
    });
    const newColumn = screen.getByText("New Column");
    expect(newColumn).toBeInTheDocument();
  });
  test("Clicking the 'Remove' button should hide the input field and the 'Add list' and 'Remove' buttons", () => {
    renderWithProviders(<Board />);
    const addButton = screen.getByText("+ Add another list");
    fireEvent.click(addButton);

    const inputField = screen.getByPlaceholderText("List title");
    const addListButton = screen.getByText("Add list");
    const removeButton = screen.getByText("Remove");

    fireEvent.change(inputField, { target: { value: "New Column" } });
    fireEvent.click(removeButton);

    expect(inputField).not.toBeInTheDocument();
    expect(addListButton).not.toBeInTheDocument();
    expect(removeButton).not.toBeInTheDocument();
  });
  test("Add new column to the board", async () => {
    renderWithProviders(<Board />);
    const addColumnButton = screen.getByText("+ Add another list");
    fireEvent.click(addColumnButton);

    const textareaElement = screen.getByPlaceholderText("List title");
    const addButton = screen.getByRole("button", { name: "Add list" });
    fireEvent.change(textareaElement, {
      target: { value: "helo" },
    });
    fireEvent.click(addButton);

    const newColumn = await screen.findByText("helo");
    expect(newColumn).toBeInTheDocument();
  });
});
