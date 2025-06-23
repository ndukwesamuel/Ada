

const AppWrapperContainer = ({ children, className }) => {
  
  return (
    <div className={`2xl:container w-full mx-auto bg-transparent relative ${className}`}>
        {children}
    </div>
  );
};

export default AppWrapperContainer;
