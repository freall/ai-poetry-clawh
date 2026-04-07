import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PoetryListPage } from './pages/PoetryListPage';
import { PoetryDetailPage } from './pages/PoetryDetailPage';
import { PracticePage } from './pages/PracticePage';
import { SearchPage } from './pages/SearchPage';
import { ProfilePage } from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="poetry" element={<PoetryListPage />} />
        <Route path="poetry/:id" element={<PoetryDetailPage />} />
        <Route path="practice/:poetryId" element={<PracticePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
