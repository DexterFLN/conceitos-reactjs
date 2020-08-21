import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/DexterFLN/conceitos-reactjs',
      techs: ['Java', 'JS', 'ReactJS']
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`); //o comando delete não retorna nada, por isso não é utilizado o const response
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
