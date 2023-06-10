export const EmptyListMessage = () => {
  return (
    <div className="grid h-28 w-full grid-rows-emptyTodo justify-center gap-0 rounded-t-md bg-gradient-to-b from-brightBlue to-veryDarkDesaturatedBlue p-2">
      <p className="m-0 w-fit justify-self-center text-2xl">⬆️</p>
      <p className="text-semibold m-0 text-lg text-white">
        Add your first todo-item
      </p>
    </div>
  );
};
