import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Simulador from './screens/Simulador.jsx';
import QuizGame from './screens/Quiz.jsx';
import Apoio from './screens/Apoio.jsx';
import Home from './screens/Home.jsx';
import Mole from './screens/Toupeira.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/poluicao_e_coral-sol">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/apoio" element={<Apoio />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/toupeira" element={<Mole />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
