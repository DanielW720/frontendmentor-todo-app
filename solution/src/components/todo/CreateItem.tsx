import React, { useState } from "react";

export const CreateItem = ({
  addTodo,
}: {
  addTodo: (title: string) => void;
}) => {
  const [newTaskInput, setNewTaskInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(newTaskInput);
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="mb-5 mt-5 flex min-h-[3rem] w-full items-center justify-start rounded-md bg-veryLightGray pl-4 dark:bg-veryDarkDesaturatedBlue"
    >
      <button type="submit">
        <div className="h-6 w-6 rounded-full border-[1px] border-lightGrayishBlue bg-inherit dark:border-darkGrayishBlue"></div>
      </button>
      <input
        type="text"
        className="ml-2 w-full cursor-text bg-inherit text-sm text-darkGrayishBlue caret-brightBlue outline-none focus:text-veryDarkGrayishBlueLightTheme dark:focus:text-lightGrayishBlue md:text-[0.9rem]"
        placeholder="Create a new todo..."
        onChange={(e) => setNewTaskInput(e.target.value)}
        required
      ></input>
    </form>
  );
};
