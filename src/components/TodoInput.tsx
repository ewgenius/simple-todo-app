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
    <form onSubmit={addTodo} className="flex flex-row">
      <input
        className="form-input block w-full rounded-r-none"
        placeholder="todo text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        disabled={!text}
        className={`bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded rounded-l-none ${
          !text
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-500 hover:text-white hover:border-transparent"
        }`}
      >
        add
      </button>
    </form>
  );
};
