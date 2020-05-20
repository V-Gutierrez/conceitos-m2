import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

let repoNew = {
  id: "uuid()",
  title: "Conceitos Node",
  url: "https://github.com/V-Gutierrez/conceitosnode-m2/",
  techs: "Node.js",
  likes: 0,
};

function App() {
  const [repo, setRepo] = useState([]);
  const [title, setTitle] = useState();
  const [techs, setTech] = useState();
  const [url, setUrl] = useState();

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleTech(e) {
    setTech(e.target.value);
  }
  function handleurl(e) {
    setUrl(e.target.value);
  }

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `${title}`,
      url: `${url}`,
      techs: `${techs}`,
    });
    setRepo([...repo, response.data]);
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepo(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    api
      .post(`/repositories/${id}/like`)
      .then((response) => setRepo([response]));
    window.location.reload(true);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((response) => {
      setRepo([response]);
    });
    window.location.reload(true);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map((i) => (
          <li key={i.id}>
            {i.title} | {i.techs} | Likes: {i.likes}
            <button onClick={() => handleRemoveRepository(i.id)}>
              Remover
            </button>
            <button onClick={() => handleLikeRepository(i.id)}>
              Dar Like !
            </button>
          </li>
        ))}
      </ul>
      <form action="">
        <label htmlFor="">Title</label>
        <input value={title} onChange={handleTitle} type="text" />
        <label htmlFor="">Link</label>
        <input value={url} onChange={handleurl} type="text" />
        <label htmlFor="">techs</label>
        <input value={techs} onChange={handleTech} type="text" />

        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
    </div>
  );
}

export default App;
