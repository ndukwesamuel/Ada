import React from "react";
import AuthForm from "../Auth";

function SignInPage() {
  return (
    <AuthForm
      title="Login as Administrator"
      buttonLabel="Sign In"
      inputs={[
        {
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
    />
  );
}

export default SignInPage;
