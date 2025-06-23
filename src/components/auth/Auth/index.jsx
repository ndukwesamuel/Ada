import React from "react";
import Button from "../../reuseable/button";

const AuthForm = ({ title, subtitle, buttonLabel, inputs }) => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="text-center p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-[14px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight text-blackish font-roboto-slab mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-lightGreyish mb-6">{subtitle}</p>
        )}
        <div className="mt-12">
          {inputs.map((input, index) => (
            <div key={index} className="mb-4  text-left">
              <label className="block text-lightGreyish text-sm font-bold mb-2">
                {input.label}
              </label>
              <input
                className="w-full p-3 sm:p-4 h-10 sm:h-11 border border-gray-300 rounded-[14px]"
                type={input.type}
                placeholder={input.placeholder}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-11">
          <Button
            label={buttonLabel}
            customClass="bg-green-600 hover:bg-green-700 text-white w-full mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
