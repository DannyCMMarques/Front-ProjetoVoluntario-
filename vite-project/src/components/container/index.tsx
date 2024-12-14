const ContainerItem = ({ children })=> {
  return (
    <div className="flex justify-center items-start mt-4 h-screen">
    <div className="bg-white p-4 shadow-md w-[97%] rounded-md">
      {children}
    </div>
  </div>
  );
}
  export default ContainerItem;
