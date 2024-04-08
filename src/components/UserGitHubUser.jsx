import { useState } from "react";

export function useGithubUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchGithubUser(username) {
    try {
      setLoading(true);
      if (username !== "") {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const userData = await response.json();
          setUsers((prev) => [...prev, userData]);
          setError(null);
        } else {
          const errorData = await response.json();
          setError(`Error: ${errorData.message}`);
        }
      } else {
        setError("Please enter a username");
      }
    } catch (error) {
      console.error(error);
      setError("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return { users, loading, error, fetchGithubUser };
}

