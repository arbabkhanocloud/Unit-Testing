import classes from "./column.module.scss";
import React, { useState, useRef, useEffect } from "react";
import Card from "../card/card";
import { IColumn } from "../board/board";

interface ColumnProps {
  column: IColumn;
  addCard: (columnId: string, content: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  updateCard: (columnId: string, cardId: string, content: string) => void;
  moveCard: (
    sourceColumnId: string,
    destinationColumnId: string,
    cardId: string
  ) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  addCard,
  deleteCard,
  updateCard,
  moveCard,
}) => {
  const [newCardContent, setNewCardContent] = useState("");
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [showRemoveCardButton, setShowRemoveCardButton] = useState(false);

  const handleAddCard = () => {
    if (!showAddCardInput) {
      setShowAddCardInput(true);
      setShowRemoveCardButton(true);
    } else if (newCardContent.trim() !== "") {
      addCard(column.id, newCardContent);
      setNewCardContent("");
      setShowAddCardInput(false);
      setShowRemoveCardButton(false);
    }
  };

  const handleDeleteCard = (cardId: any) => {
    deleteCard(column.id, cardId);
  };

  const handleUpdateCard = (cardId: any, content: any) => {
    updateCard(column.id, cardId, content);
  };

  const handleDragStart = (event: any, cardId: any) => {
    console.log("cardId:", cardId);
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ cardId, sourceColumnId: column.id })
    );
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const { cardId, sourceColumnId } = JSON.parse(data);
    moveCard(sourceColumnId, column.id, cardId);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      data-testid="column-component"
      className={`${classes["column"]}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className={`${classes["column-header"]}`}>
        <div>{column.title}</div>
        <div className={`${classes["dots"]}`}>{"..."}</div>
      </div>
      <div className={`${classes["cards-container"]}`}>
        {column.cards.map((card) => (
          <Card
            data-testid="card-component"
            key={card.id}
            card={card}
            onDelete={handleDeleteCard}
            onUpdate={handleUpdateCard}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      {showAddCardInput ? (
        <div className={`${classes["add-card"]}`}>
          <textarea
            placeholder="Add Card description"
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
          />
          <div className={classes["add-card-buttons"]}>
            <button onClick={handleAddCard}>Add Card</button>
            {showRemoveCardButton && (
              <button
                style={{ marginLeft: "3px" }}
                onClick={() => setShowAddCardInput(false)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={`${classes["add-card"]}`} onClick={handleAddCard}>
          + Add Card
        </div>
      )}
    </div>
  );
};

export default Column;
