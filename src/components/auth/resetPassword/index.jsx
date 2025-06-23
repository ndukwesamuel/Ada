import React from "react";
import AuthForm from "../Auth";

const ResetPassword = () => {
  const inputs = [
    { label: "Email", type: "email", placeholder: "Email" },
    { label: "New Password", type: "password", placeholder: "New Password" },
    {
      label: "Confirm New Password",
      type: "password",
      placeholder: "Confirm New Password",
    },
  ];

  return (
    <AuthForm
      title="Reset Password"
      subtitle="Create your new password"
      buttonLabel="Reset Password"
      inputs={inputs}
    />
  );
};

export default ResetPassword;
