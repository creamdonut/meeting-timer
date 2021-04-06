interface Note {
  time: number;
  note: string;
  id: number;
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
  payload: { id: number; note: string };
};

type ActionRemove = {
  type: ActionType.REMOVE;
  payload: { id: number };
};

type Action = ActionAdd | ActionEdit | ActionRemove;

export const mainReducer = (state: Note[], action: Action): Note[] => {
  switch (action.type) {
    case ActionType.ADD:
      const newNote = {
        time: action.payload.freezedTime,
        note: action.payload.note,
        id: state.length,
      };

      return [...state, newNote];
    case ActionType.EDIT:
      const noteToEdit = state.find((el) => el.id === action.payload.id);

      if (!noteToEdit) return state;

      const arr = [...state];

      const editedNote = { ...noteToEdit, note: action.payload.note };

      arr.splice(action.payload.id, 1, editedNote);

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
