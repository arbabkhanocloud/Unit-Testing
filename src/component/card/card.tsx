import classes from "./card.module.scss";
import React, { useState } from "react";
import { ICard } from "../../store/column/column.types";

interface CardProps {
  card: ICard;
  onDelete: (cardId: string) => void;
  onUpdate: (cardId: string, content: string) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, cardId: string) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  onDelete,
  onUpdate,
  onDragStart,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content);

  const handleDelete = () => {
    onDelete(card.id);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(card.id, editedContent);
    setEditMode(false);
  };

  return (
    <div
      data-testid="card-component"
      data-cy="card-component"
      className={`${classes["card"]}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, card.id)}
    >
      {editMode ? (
        <textarea
          data-testid="card-textarea"
          data-cy="card-textarea"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <span>{card.content}</span>
      )}
      <div className={`${classes["card-actions"]}`}>
        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button style={{ marginLeft: "3px" }} onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
