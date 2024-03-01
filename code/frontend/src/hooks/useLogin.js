import { useState } from 'react';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    if (!username || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return error;
    }

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const user = await response.json();

    if (!response.ok) {
      setError("Invalid username or password");
      setIsLoading(false);
      return error;
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);
  };

  return { login, isLoading, error };
};
