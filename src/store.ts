export interface Todo {
  id: string;
  text: string;
  toggled?: boolean;
}

export interface TodoState {
  [id: string]: Todo;
}

export const SET_TODOS = "SET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export interface SetTodosAction {
  type: typeof SET_TODOS;
  state: TodoState;
}

export interface AddTodoAction {
  type: typeof ADD_TODO;
  text: string;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: string;
}

export function persistState(state: TodoState) {
  localStorage.setItem("todo_state", JSON.stringify(state));
}

export const todoReducer = (
  state: TodoState,
  action: SetTodosAction | AddTodoAction | ToggleTodoAction
) => {
  switch (action.type) {
    case SET_TODOS: {
      return action.state;
    }
    case ADD_TODO: {
      const nextId = String(Object.values(state).length);
      const newState = {
        ...state,
        [nextId]: {
          id: nextId,
          text: action.text,
        },
      };
      persistState(newState);
      return newState;
    }
    case TOGGLE_TODO: {
      const item = state[action.id];
      if (!item) return state;
      const newState = {
        ...state,
        [action.id]: {
          ...item,
          toggled: !item.toggled,
        },
      };
      persistState(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
};
