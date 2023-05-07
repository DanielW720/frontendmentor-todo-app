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
      onSubmit={handleSubmit}
      className="h-[3.5rem] mb-5 pl-4 dark:bg-veryDarkDesaturatedBlue rounded-md flex justify-start items-center"
    >
      <button type="submit">
        <div className="h-6 w-6 bg-inherit rounded-full border-[1px] border-darkGrayishBlue"></div>
      </button>
      <input
        placeholder="Create a new todo..."
        onChange={(e) => setNewTaskInput(e.target.value)}
        className="text-darkGrayishBlue ml-2 bg-inherit"
      />
    </form>
  );
};
