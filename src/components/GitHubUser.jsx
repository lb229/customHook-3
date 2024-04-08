import React, { useState } from "react";
import { UserList } from "./UserList";
import { useGithubUser } from "./UserGitHubUser";

export function GitHubUser() {
  const [username, setUsername] = useState(""); 
  const {users, loading, error, fetchGithubUser} = useGithubUser();

  function handleUsername(e) {
    setUsername(e.target.value); 
  }

  async function handleUserSubmit(e) {
    e.preventDefault();
    await fetchGithubUser(username)
  }

  return (
    <div>
      <form name="inputUserGit">
        <input
          type="text"
          placeholder="Search user"
          value={username}
          onChange={handleUsername}
        />
        <button onClick={handleUserSubmit}>Submit</button>
      </form>

      {loading && <div>Loading....</div>}
      {error && <div>{error}</div>}

      <h1>User List:</h1>
      <UserList users={users}/>
      <hr />
    </div>
  );
}
