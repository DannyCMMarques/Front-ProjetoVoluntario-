const Box = ({ children }) => {
  return (
    <div
      className="
        shadow-md
        rounded-md
        bg-white
        p-5
        min-h-[500px]
      "
    >
      {children}
    </div>
  );
};

export default Box;
