

const AppWrapperContainer = ({ children }) => {
  

  

  return (
    <div className="2xl:container w-[100%] mx-auto bg-primary-500 min-h-[100vh] relative">
        {children}
    </div>
  );
};

export default AppWrapperContainer;
