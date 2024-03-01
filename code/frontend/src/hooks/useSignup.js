import { useState } from 'react';

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (username, email, password, date_of_birth, phone_number) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, date_of_birth, phone_number }),
    });

    const user = await response.json();

    if (!response.ok) {
      setError(user.message);
      setIsLoading(false);
      return user.message
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { signup, isLoading, error };
};