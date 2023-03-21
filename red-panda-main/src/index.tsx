import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { ChakraProvider } from '@chakra-ui/react';
import { LessonPage } from './pages/LessonPage';
import { WelcomePage } from './pages/WelcomePage';
import { HomePage } from './pages/HomePage';
import { StartTestPage } from './pages/StartTestPage';
import { StartLessonPage } from './pages/StartLessonPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/onboarding" element={<LandingPage />} />
          <Route path="/startTest" element={<StartTestPage />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/startLesson" element={<StartLessonPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
