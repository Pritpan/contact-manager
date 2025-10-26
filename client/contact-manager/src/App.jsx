import React from 'react';
import { ContactProvider } from './context/ContactContext';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <ContactProvider>
      <Dashboard />
    </ContactProvider>
  );
}
