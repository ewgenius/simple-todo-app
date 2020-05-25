import { useState, FormEvent } from "react";

import { Todo } from "../store";

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
