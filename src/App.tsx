import React from 'react';

import Routes from './routes';
import AuthProvider from './components/AuthProvider';

import GlobalStyles from './GlobalStyles';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes />
            <GlobalStyles />
        </AuthProvider>
    );
}

export default App;
