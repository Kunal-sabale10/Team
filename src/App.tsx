import React from 'react';
import { ScrollProvider } from './context/ScrollContext';
import { DualLayerScaffold } from './components/scaffold/DualLayerScaffold';

export const App: React.FC = () => {
  return (
    <ScrollProvider>
      <DualLayerScaffold />
    </ScrollProvider>
  );
};

export default App;
