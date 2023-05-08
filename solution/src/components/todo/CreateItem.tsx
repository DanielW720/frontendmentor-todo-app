import React, { useState } from "react";

export const CreateItem = ({
  addTodo,
}: {
  addTodo: (title: string) => void;
}) => {
  const [newTaskInput, setNewTaskInput] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    addTodo(newTaskInput);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="h-[3.2rem] w-full mt-5 mb-5 pl-4 bg-veryLightGray dark:bg-veryDarkDesaturatedBlue rounded-md flex justify-start items-center"
    >
      <button type="submit">
        <div className="h-6 w-6 bg-inherit rounded-full border-[1px] border-lightGrayishBlue dark:border-darkGrayishBlue"></div>
      </button>
      <input
        type="text"
        id="create_new_todo"
        className="text-darkGrayishBlue ml-2 bg-inherit outline-none text-sm"
        placeholder="Create a new todo..."
        onChange={(e) => setNewTaskInput(e.target.value)}
        required
      ></input>
    </form>
  );
};
