import React from "react";
import AuthForm from "../Auth";

function SignUpPage() {
  return (
    <div className="">
      <AuthForm
        title="Create Your Account"
        buttonLabel="Sign Up"
        inputs={[
          {
            label: "Email Address",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            label: "Phone Number",
            type: "tel",
            placeholder: "Enter your phone number",
          }, // Optional
          {
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
          {
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm your password",
          },
        ]}
      />
    </div>
  );
}

export default SignUpPage;
