import { RootState } from "../store";
import { IColumn } from "./column.types";

export const selectColumns = (state: RootState): IColumn[] => state.columns;
