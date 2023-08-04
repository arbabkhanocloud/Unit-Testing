import {
  ADD_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  MOVE_CARD,
  ADD_COLUMN,
} from "./column.types";
import { IColumn } from "./column.types";

export const addColumn = (newColumn: IColumn) => ({
  type: ADD_COLUMN,
  payload: newColumn,
});

export const addCard = (columnId: string, content: string) => ({
  type: ADD_CARD,
  payload: { columnId, content },
});

export const deleteCard = (columnId: string, cardId: string) => ({
  type: DELETE_CARD,
  payload: { columnId, cardId },
});

export const updateCard = (
  columnId: string,
  cardId: string,
  content: string
) => ({
  type: UPDATE_CARD,
  payload: { columnId, cardId, content },
});

export const moveCard = (
  sourceColumnId: string,
  destinationColumnId: string,
  cardId: string
) => ({
  type: MOVE_CARD,
  payload: { sourceColumnId, destinationColumnId, cardId },
});
