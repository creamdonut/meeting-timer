import { v4 as uuidv4 } from "uuid";

export interface Note {
  time: number;
  note: string;
  id: string;
}

export const initialState: Note[] | [] = [];

export enum ActionType {
  ADD = "ADD",
  EDIT = "EDIT",
  REMOVE = "REMOVE",
}

type ActionAdd = {
  type: ActionType.ADD;
  payload: { freezedTime: number; note: string };
};

type ActionEdit = {
  type: ActionType.EDIT;
  payload: { id: string; note: string };
};

type ActionRemove = {
  type: ActionType.REMOVE;
  payload: { id: string };
};

type Action = ActionAdd | ActionEdit | ActionRemove;

export const mainReducer = (state: Note[], action: Action): Note[] => {
  switch (action.type) {
    case ActionType.ADD:
      const newNote = {
        time: action.payload.freezedTime,
        note: action.payload.note,
        id: uuidv4(),
      };

      return [...state, newNote];
    case ActionType.EDIT:
      const noteToEdit = state.find((el) => el.id === action.payload.id);

      if (!noteToEdit) return state;

      const arr = [...state];

      const editedNote = { ...noteToEdit, note: action.payload.note };

      const idx = state.findIndex((el) => el.id === action.payload.id);

      arr.splice(idx, 1, editedNote);

      return [...arr];
    case ActionType.REMOVE:
      const stateWithoutNote = state.filter(
        (el) => el.id !== action.payload.id
      );

      return [...stateWithoutNote];
    default:
      return state;
  }
};
