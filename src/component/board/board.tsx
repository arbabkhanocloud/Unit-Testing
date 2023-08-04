import classes from "./board.module.scss";
import React, { useState } from "react";
import Column from "../column/column";
import { RootState } from "../../store/store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { IColumn } from "../../store/column/column.types";
import { selectColumns } from "../../store/column/column.selector";
import {
  addColumn,
  addCard,
  deleteCard,
  updateCard,
  moveCard,
} from "../../store/column/column.action";

const Board: React.FC = () => {
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [showRemoveColumnButton, setShowRemoveColumnButton] = useState(false);
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const columns = useAppSelector(selectColumns);
  const dispatch = useDispatch();

  const handleAddCard = (columnId: any, content: any) => {
    dispatch(addCard(columnId, content));
  };

  const handleDeleteCard = (columnId: any, cardId: any) => {
    dispatch(deleteCard(columnId, cardId));
  };

  const handleUpdateCard = (columnId: any, cardId: any, content: any) => {
    dispatch(updateCard(columnId, cardId, content));
  };

  const handleMoveCard = (
    sourceColumnId: any,
    destinationColumnId: any,
    cardId: any
  ) => {
    dispatch(moveCard(sourceColumnId, destinationColumnId, cardId));
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
      dispatch(addColumn(newColumn));
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
        {columns.map((column: IColumn) => (
          <Column
            key={column.id}
            column={column}
            addCard={handleAddCard}
            deleteCard={handleDeleteCard}
            updateCard={handleUpdateCard}
            moveCard={handleMoveCard}
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
