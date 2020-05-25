import { useReducer, useState, FormEvent, useEffect } from "react";
import Head from "next/head";

interface Todo {
  id: string;
  text: string;
  toggled?: boolean;
}

interface TodoState {
  [id: string]: Todo;
}

const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

interface SetTodosAction {
  type: typeof SET_TODOS;
  state: TodoState;
}

interface AddTodoAction {
  type: typeof ADD_TODO;
  text: string;
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  id: string;
}

function persistState(state: TodoState) {
  localStorage.setItem("todo_state", JSON.stringify(state));
}

const todoReducer = (
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

export interface TodoInputProps {
  onAdd: (todo: Pick<Todo, "text">) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [text, setText] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    onAdd({ text });
    setText("");
  };

  return (
    <form onSubmit={addTodo}>
      <input
        className="form-input mt-1 block w-full"
        placeholder="todo text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default function Home() {
  const [itemsDict, dispatch] = useReducer(todoReducer, {});

  useEffect(() => {
    const state = localStorage.getItem("todo_state");
    if (state) {
      dispatch({
        type: SET_TODOS,
        state: JSON.parse(state),
      });
    }
  }, []);

  const items = Object.values(itemsDict);

  const addTodo = (todo: Pick<Todo, "text">) =>
    dispatch({
      type: ADD_TODO,
      text: todo.text,
    });

  return (
    <div className="container mx-auto max-w-screen-sm">
      <Head>
        <title>Simple Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoInput onAdd={addTodo} />

      {items.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
