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
      className="min-h-[3rem] w-full mt-5 mb-5 pl-4 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-md flex justify-start items-center"
    >
      <button type="submit">
        <div className="h-6 w-6 bg-inherit rounded-full border-[1px] border-lightGrayishBlue dark:border-darkGrayishBlue"></div>
      </button>
      <input
        type="text"
        id="create_new_todo"
        className="w-full text-darkGrayishBlue focus:text-veryDarkGrayishBlueLightTheme dark:focus:text-lightGrayishBlue ml-2 bg-inherit outline-none text-sm md:text-[0.9rem] cursor-pointer"
        placeholder="Create a new todo..."
        onChange={(e) => setNewTaskInput(e.target.value)}
        required
      ></input>
    </form>
  );
};
