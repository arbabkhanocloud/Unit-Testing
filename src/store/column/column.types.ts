export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const MOVE_CARD = "MOVE_CARD";
export const ADD_COLUMN = "ADD_COLUMN";

export interface ICard {
  id: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  cards: ICard[];
}

export interface AddColumnAction {
  type: typeof ADD_COLUMN;
  payload: { newColumn: IColumn };
}

export interface AddCardAction {
  type: typeof ADD_CARD;
  payload: { columnId: string; content: string };
}

export interface DeleteCardAction {
  type: typeof DELETE_CARD;
  payload: { columnId: string; cardId: string };
}

export interface UpdateCardAction {
  type: typeof UPDATE_CARD;
  payload: { columnId: string; cardId: string; content: string };
}

export interface MoveCardAction {
  type: typeof MOVE_CARD;
  payload: {
    sourceColumnId: string;
    destinationColumnId: string;
    cardId: string;
  };
}

export type ColumnActionTypes =
  | AddCardAction
  | DeleteCardAction
  | UpdateCardAction
  | AddColumnAction
  | MoveCardAction;
