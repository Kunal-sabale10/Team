import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProvider } from './context/ScrollContext';
import { DualLayerScaffold } from './components/scaffold/DualLayerScaffold';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <DualLayerScaffold />
      </ScrollProvider>
    </ThemeProvider>
  );
};

export default App;
