import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizGame from './screens/Quiz.jsx';
import Apoio from './screens/Apoio.jsx';
import Home from './screens/Home.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizGame />} />
        <Route path="/apoio" element={<Apoio />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
