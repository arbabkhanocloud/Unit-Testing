import React from "react";
import configureMockStore from "redux-mock-store";
import { screen, render, fireEvent } from "@testing-library/react";
import Board from "../board";
import { IColumn } from "../../../store/column/column.types";
import { Provider } from "react-redux";

describe("testing the board component", () => {
  let mockInitialColumns: IColumn[];
  let Store: any;
  beforeEach(() => {
    mockInitialColumns = [
      {
        id: "todo",
        title: "To Do",
        cards: [],
      },
      {
        id: "inProgress",
        title: "In Progress",
        cards: [],
      },
      {
        id: "done",
        title: "Done",
        cards: [],
      },
    ];
    const mockStore = configureMockStore([]); // You can add middleware if needed
    Store = mockStore({
      columns: mockInitialColumns,
    });
  });
  test("Board should render initial columns and adding list option correctly", () => {
    render(
      <Provider store={Store}>
        <Board />
      </Provider>
    );
    const columnTitles = ["To Do", "In Progress", "Done"];

    for (const title of columnTitles) {
      const columnElement = screen.getByText(title);
      expect(columnElement).toBeInTheDocument();
    }

    const addColumnButton = screen.getByText("+ Add another list");
    expect(addColumnButton).toBeInTheDocument();
  });
  test("Clicking the 'Add another list' button should show the text are and buttons for adding a new column", () => {
    render(
      <Provider store={Store}>
        <Board />
      </Provider>
    );
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
    render(
      <Provider store={Store}>
        <Board />
      </Provider>
    );
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

  // test("Entering a valid title in textare and clicking the 'Add list' button should add a new column to the board with the provided title", () => {
  //   render(
  //     <Provider store={Store}>
  //       <Board />
  //     </Provider>
  //   );
  //   const addButton = screen.getByText("+ Add another list");
  //   fireEvent.click(addButton);

  //   const inputField = screen.getByPlaceholderText("List title");
  //   const addListButton = screen.getByText("Add list");

  //   fireEvent.change(inputField, { target: { value: "New Column" } });
  //   fireEvent.click(addListButton);

  //   const newColumn = screen.getByText("New Column");
  //   expect(newColumn).toBeInTheDocument();
  // });
  test("Clicking the 'Remove' button should hide the input field and the 'Add list' and 'Remove' buttons", () => {
    render(
      <Provider store={Store}>
        <Board />
      </Provider>
    );
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
  // test("Add new column to the board", async () => {
  //   render(
  //     <Provider store={Store}>
  //       <Board />
  //     </Provider>
  //   );
  //   const addColumnButton = screen.getByText("+ Add another list");
  //   fireEvent.click(addColumnButton);

  //   const textareaElement = screen.getByPlaceholderText("List title");
  //   const addButton = screen.getByRole("button", { name: "Add list" });
  //   screen.debug();
  //   fireEvent.change(textareaElement, {
  //     target: { value: "helo" },
  //   });
  //   fireEvent.click(addButton);
  //   screen.debug();

  //   const newColumn = await screen.findByText("helo");
  //   expect(newColumn).toBeInTheDocument();
  // });
});
