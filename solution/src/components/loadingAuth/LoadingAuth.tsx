export const LoadingAuth = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-veryDarkBlue">
      <div className="h-14 w-14 animate-spin  rounded-full border-[5px] border-formRight border-b-brightBlue"></div>
      <div className="mt-10 text-2xl text-brightBlue">Loading...</div>
    </div>
  );
};
