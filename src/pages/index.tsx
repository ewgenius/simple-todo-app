import { useReducer, useEffect } from "react";
import Head from "next/head";

import { Todo, todoReducer, ADD_TODO, SET_TODOS, TOGGLE_TODO } from "../store";
import { TodoItem } from "../components/TodoItem";
import { TodoInput } from "../components/TodoInput";

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

  const items = Object.values(itemsDict).reverse();

  const addTodo = (todo: Pick<Todo, "text">) =>
    dispatch({
      type: ADD_TODO,
      text: todo.text,
    });

  const toggleTodo = (id: string) =>
    dispatch({
      type: TOGGLE_TODO,
      id,
    });

  return (
    <div className="container mx-auto max-w-screen-sm p-4">
      <Head>
        <title>Simple Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoInput onAdd={addTodo} />

      {items.map((item) => (
        <TodoItem key={item.id} todo={item} onToggle={toggleTodo} />
      ))}
    </div>
  );
}
