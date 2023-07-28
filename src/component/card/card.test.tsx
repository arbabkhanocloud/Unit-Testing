import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Card from "./card";

describe("Testing the card component", () => {
  let mockCard: any;
  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();
  const mockOnDragStart = jest.fn();

  beforeEach(() => {
    mockCard = {
      id: "card1",
      content: "Test Card Content",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`card component should have "card" class`, () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const cardElementCssClass = screen.getByTestId("card-component");
    expect(cardElementCssClass).toHaveClass("card");
  });

  test("card should have content and edit/delete buttons", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const cardContent = screen.getByText("Test Card Content");
    expect(cardContent).toBeInTheDocument();
    const editButton = screen.getByRole("button", { name: "Edit" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("On delete button click it should call onDelete function to delete the card", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("card1");
  });

  test("On Edit button click, it should show textarea and hide the edit/delete buttons and display the save button", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const cardTextArea = screen.getByTestId("card-textarea");
    expect(cardTextArea).toBeInTheDocument();
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Edit" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Delete" })).toBeNull();
  });

  test("check that textarea input is working fine", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    const cardTextArea = screen.getByTestId(
      "card-textarea"
    ) as HTMLTextAreaElement;
    expect(cardTextArea).toBeInTheDocument();
    fireEvent.change(cardTextArea, { target: { value: "Updated Content" } });
    expect(cardTextArea.value).toBe("Updated Content");
  });

  test("clicking on Save button it should call onUpdate function and hide textarea and Save button and display the edit/delete buttons", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
    // screen.debug();
    fireEvent.click(editButton);
    const cardTextArea = screen.getByTestId(
      "card-textarea"
    ) as HTMLTextAreaElement;
    expect(cardTextArea).toBeInTheDocument();
    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
    // screen.debug();
    fireEvent.click(saveButton);
    // screen.debug();
    expect(mockOnUpdate).toHaveBeenCalled();
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate.mock.calls[0][0]).toBe("card1");
    expect(mockOnUpdate.mock.calls[0][1]).toBe("Test Card Content");
    expect(cardTextArea).not.toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test("card should be draggable", () => {
    render(
      <Card
        card={mockCard}
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
        onDragStart={mockOnDragStart}
      />
    );
    const cardElement = screen.getByTestId("card-component");
    expect(cardElement).toBeInTheDocument();
    fireEvent.dragStart(cardElement);
    expect(mockOnDragStart).toHaveBeenCalled();
    expect(mockOnDragStart).toHaveBeenCalledTimes(1);
    expect(mockOnDragStart).toHaveBeenCalledWith(expect.any(Object), "card1");
    expect(mockOnDragStart.mock.calls[0][1]).toBe("card1");
  });
});
