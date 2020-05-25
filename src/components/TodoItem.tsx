import { useCallback } from "react";

import { Todo } from "../store";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  const toggle = useCallback((e) => onToggle(todo.id), [todo.id]);
  return (
    <div className="flex flex-row items-center pt-1 pb-1 mt-1 border-solid border border-gray-300 rounded overflow-hidden">
      <input
        type="checkbox"
        className="form-checkbox mr-2 ml-2"
        checked={todo.toggled}
        onChange={toggle}
      />
      <div>{todo.text}</div>
    </div>
  );
};
