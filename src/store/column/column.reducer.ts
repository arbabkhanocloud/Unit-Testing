import {
  ADD_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  MOVE_CARD,
  ADD_COLUMN,
} from "./column.types";
import { ColumnActionTypes } from "./column.types";
import { IColumn } from "./column.types";

export const initialState: IColumn[] = [
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

const columnsReducer = (state = initialState, action: ColumnActionTypes) => {
  switch (action.type) {
    case ADD_COLUMN:
      const newColumn = action.payload;
      console.log("here received newColumn is:", action.payload);
      return [...state, newColumn];
    case ADD_CARD:
      const { columnId: addColumnId, content } = action.payload;
      const newCard = { id: `card${Date.now()}`, content };
      return state.map((column) =>
        column.id === addColumnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      );
    case DELETE_CARD:
      const { columnId: deleteColumnId, cardId: deleteCardId } = action.payload;
      return state.map((column) =>
        column.id === deleteColumnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== deleteCardId),
            }
          : column
      );

    case UPDATE_CARD:
      const {
        columnId: updateColumnId,
        cardId: updateCardId,
        content: updatedContent,
      } = action.payload;
      return state.map((column) =>
        column.id === updateColumnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === updateCardId
                  ? { ...card, content: updatedContent }
                  : card
              ),
            }
          : column
      );

    case MOVE_CARD:
      const {
        sourceColumnId,
        destinationColumnId,
        cardId: moveCardId,
      } = action.payload;
      if (sourceColumnId === destinationColumnId) return state;

      const sourceColumn = state.find((column) => column.id === sourceColumnId);
      const cardToMove = sourceColumn?.cards.find(
        (card) => card.id === moveCardId
      );

      return state.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== moveCardId),
          };
        }

        if (column.id === destinationColumnId) {
          return { ...column, cards: [...column.cards, cardToMove] };
        }

        return column;
      });

    default:
      return state;
  }
};

export default columnsReducer;
