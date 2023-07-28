import { screen, render, fireEvent } from "@testing-library/react";
import Column from "./column";
import { IColumn } from "../board/board";

describe("testing the column component", () => {
  let mockColumn: IColumn;
  const mockAddCard = jest.fn();
  const mockDeleteCard = jest.fn();
  const mockUpdateCard = jest.fn();
  const mockMoveCard = jest.fn();

  beforeEach(() => {
    mockColumn = {
      id: "column1",
      title: "Test Column",
      cards: [
        { id: "card1", content: "Test Card 1" },
        { id: "card2", content: "Test Card 2" },
      ],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`column component should have "column" class`, () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );
    const columnElementCssClass = screen.getByTestId("column-component");
    expect(columnElementCssClass).toHaveClass("column");
  });

  test("column should display title and add card", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const columnTitle = screen.getByText(mockColumn.title);
    expect(columnTitle).toBeInTheDocument();
    expect(columnTitle.textContent).toBe("Test Column");

    const addButton = screen.getByText("+ Add Card");
    expect(addButton).toBeInTheDocument();
  });

  test("Clicking 'Add Card' button should show the textarea and 'Add Card' and 'Remove' buttons", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const addButton = screen.getByText("+ Add Card");
    fireEvent.click(addButton);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();

    const newText = "Updated Card Content";
    fireEvent.change(textarea, { target: { value: newText } });

    expect(textarea.value).toBe("Updated Card Content");

    const saveButton = screen.getByText("Add Card");
    expect(saveButton).toBeInTheDocument();

    const removeButton = screen.getByText("Remove");
    expect(removeButton).toBeInTheDocument();
  });

  test("clinking on 'Remove' button should hide textarea and 'Add Card', 'Remove' buttons", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );
    const addCardButton = screen.getByText("+ Add Card");
    fireEvent.click(addCardButton);

    const textarea = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add Card" });
    const removeButton = screen.getByRole("button", { name: "Remove" });

    expect(textarea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);

    expect(textarea).not.toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
    expect(removeButton).not.toBeInTheDocument();
  });

  test("if no card description is given then clinking on 'Add Card' button should not add card into the caloumn", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const addCardButton = screen.getByText("+ Add Card");
    fireEvent.click(addCardButton);

    const addButton = screen.getByRole("button", { name: "Add Card" });
    const removeButton = screen.getByRole("button", { name: "Remove" });
    const textarea = screen.getByRole("textbox");

    expect(textarea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    expect(textarea).toHaveValue("");
    fireEvent.click(addButton);

    expect(textarea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  test("if card description is given then clinking on 'Add Card' button should  add card into the caloumn and call the addCard function", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const addCardButton = screen.getByText("+ Add Card");
    fireEvent.click(addCardButton);

    const addButton = screen.getByRole("button", { name: "Add Card" });
    const removeButton = screen.getByRole("button", { name: "Remove" });
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    const newText = "Updated Card Content";
    fireEvent.change(textarea, { target: { value: newText } });
    expect(textarea.value).toBe("Updated Card Content");

    fireEvent.click(addButton);

    expect(textarea).not.toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
    expect(removeButton).not.toBeInTheDocument();

    expect(mockAddCard).toHaveBeenCalled();
    expect(mockAddCard).toHaveBeenCalledWith(
      mockColumn.id,
      "Updated Card Content"
    );
    expect(mockAddCard).toBeCalledTimes(1);
    expect(mockAddCard.mock.calls[0][0]).toBe("column1");
    expect(mockAddCard.mock.calls[0][1]).toBe("Updated Card Content");
  });

  test("Column should render No cards", () => {
    const mockEmptyCardColumn = {
      id: "column1",
      title: "Test Column",
      cards: [],
    };

    render(
      <Column
        column={mockEmptyCardColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const columnTitle = screen.getByText(mockEmptyCardColumn.title);
    expect(columnTitle).toBeInTheDocument();

    const cardElements = screen.queryAllByTestId("card-component");
    expect(cardElements).toHaveLength(0);
  });

  test("Column should render 1 cards", () => {
    const mockOneCardColumn = {
      id: "column1",
      title: "Test Column",
      cards: [{ id: "card1", content: "Test Card 1" }],
    };

    render(
      <Column
        column={mockOneCardColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const columnTitle = screen.getByText(mockOneCardColumn.title);
    expect(columnTitle).toBeInTheDocument();

    const cardElements = screen.queryAllByTestId("card-component");
    expect(cardElements).toHaveLength(1);
  });

  test("Column should render multiple cards", () => {
    const mockMultipleCardsColumn = {
      id: "column1",
      title: "Test Column",
      cards: [
        { id: "card1", content: "Test Card 1" },
        { id: "card2", content: "Test Card 2" },
        { id: "card3", content: "Test Card 3" },
      ],
    };

    render(
      <Column
        column={mockMultipleCardsColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const columnTitle = screen.getByText(mockMultipleCardsColumn.title);
    expect(columnTitle).toBeInTheDocument();

    const cardElements = screen.queryAllByTestId("card-component");
    expect(cardElements).toHaveLength(3);
  });

  test("Dragging over the column should prevent default behavior", () => {
    render(
      <Column
        column={mockColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );
    const columnElement = screen.getByTestId("column-component");
    const dragOverEvent = new Event("dragover", {
      bubbles: true,
      cancelable: true,
    });

    fireEvent(columnElement, dragOverEvent);
    expect(dragOverEvent.defaultPrevented).toBe(true);
  });

  test("Dropping a card in the column should move the card into the column by calling the moveCard function", () => {
    const mockOneCardColumn = {
      id: "column1",
      title: "Test Column",
      cards: [{ id: "card1", content: "Test Card 1" }],
    };
    render(
      <Column
        column={mockOneCardColumn}
        addCard={mockAddCard}
        deleteCard={mockDeleteCard}
        updateCard={mockUpdateCard}
        moveCard={mockMoveCard}
      />
    );

    const columnElement = screen.getByTestId("column-component");
    expect(mockMoveCard).toHaveBeenCalledTimes(0);

    fireEvent.drop(columnElement, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            cardId: "card1",
            sourceColumnId: "sourceColumn",
          }),
      },
    });
    expect(mockMoveCard).toHaveBeenCalled();
    expect(mockMoveCard).toHaveBeenCalledTimes(1);
    expect(mockMoveCard.mock.calls).toHaveLength(1);
    expect(mockMoveCard).toHaveBeenCalledWith(
      "sourceColumn",
      "column1",
      "card1"
    );
    expect(mockMoveCard.mock.calls[0][0]).toBe("sourceColumn");
    expect(mockMoveCard.mock.calls[0][1]).toBe("column1");
    expect(mockMoveCard.mock.calls[0][2]).toBe("card1");
  });
});
