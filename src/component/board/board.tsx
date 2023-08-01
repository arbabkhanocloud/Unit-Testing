import classes from "./board.module.scss";
import React, { useState } from "react";
import Column from "../column/column";

export interface ICard {
  id: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  cards: ICard[];
}

const Board: React.FC = () => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [showRemoveColumnButton, setShowRemoveColumnButton] = useState(false);
  const [columns, setColumns] = useState([
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
  ]);

  const addCard = (columnId: any, content: any) => {
    const newCard = { id: `card${Date.now()}`, content };
    setColumns((prevColumns: any) => {
      const updatedColumns = prevColumns.map((column: any) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      );
      return updatedColumns;
    });
  };

  const deleteCard = (columnId: any, cardId: any) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card: any) => card.id !== cardId),
            }
          : column
      );
      return updatedColumns;
    });
  };

  const updateCard = (columnId: any, cardId: any, content: any) => {
    setColumns((prevColumns: any) => {
      const updatedColumns = prevColumns.map((column: any) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card: any) =>
                card.id === cardId ? { ...card, content } : card
              ),
            }
          : column
      );
      return updatedColumns;
    });
  };

  const moveCard = (
    sourceColumnId: any,
    destinationColumnId: any,
    cardId: any
  ) => {
    if (sourceColumnId === destinationColumnId) return;
    setColumns((prevColumns: any) => {
      const sourceColumn = prevColumns.find(
        (column: any) => column.id === sourceColumnId
      );
      const destinationColumn = prevColumns.find(
        (column: any) => column.id === destinationColumnId
      );
      const cardToMove = sourceColumn.cards.find(
        (card: any) => card.id === cardId
      );

      const updatedColumns = prevColumns.map((column: any) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            cards: column.cards.filter((card: any) => card.id !== cardId),
          };
        }

        if (column.id === destinationColumnId) {
          return { ...column, cards: [...column.cards, cardToMove] };
        }
        return column;
      });

      return updatedColumns;
    });
  };

  const handleAddColumn = () => {
    if (!showInput) {
      setShowInput(true);
      setShowRemoveColumnButton(true);
    } else if (newColumnTitle.trim() !== "") {
      const newColumn: IColumn = {
        id: `column${Date.now()}`,
        title: newColumnTitle,
        cards: [],
      };
      setColumns((prevColumns: any) => [...prevColumns, newColumn]);
      setNewColumnTitle("");
      setShowInput(false);
      setShowRemoveColumnButton(false);
    }
  };

  const handleRemoveColumn = () => {
    setShowInput(false);
    setShowRemoveColumnButton(false);
  };

  return (
    <div className={`${classes["board-wrapper"]}`}>
      <div className={`${classes["board"]}`}>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            addCard={addCard}
            deleteCard={deleteCard}
            updateCard={updateCard}
            moveCard={moveCard}
          />
        ))}
        {showInput ? (
          <div data-cy="add-column" className={`${classes["add-column"]}`}>
            <textarea
              placeholder="List title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <div className={classes["add-column-buttons"]}>
              <button style={{ marginLeft: "10px" }} onClick={handleAddColumn}>
                Add list
              </button>
              {showRemoveColumnButton && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={handleRemoveColumn}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            data-cy="add-column"
            className={`${classes["add-column"]}`}
            onClick={handleAddColumn}
          >
            + Add another list
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
