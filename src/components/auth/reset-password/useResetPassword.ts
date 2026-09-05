"use client";

import { useState } from "react";

export function useResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatch = password && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength || !hasNumber) {
      setError("Password must be at least 8 characters and include at least one number.");
      return;
    }
    if (!isMatch) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    submitted,
    error,
    hasMinLength,
    hasNumber,
    hasSpecial,
    handleSubmit,
  };
}
