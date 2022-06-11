import React from 'react';
import { Link } from 'react-router-dom';

function NoFoundPage() {
  return (
    <div className="noFound">
      <Link to="/Segware-Feeds">Voltar</Link>
      <h1>OPS !!! Página não encontrada.</h1>
    </div>
  );
}

export default NoFoundPage;
