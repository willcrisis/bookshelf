import React from 'react';
import { Platform, StatusBar } from 'react-native';
import Config from 'config';
import ServicesContextProvider from 'contexts/ServicesContext';
import AuthContextProvider from 'contexts/AuthContext';
import AppContextProvider from 'contexts/AppContext';
import ThemeContextProvider from 'contexts/ThemeContext';
import DataContextProvider from 'contexts/DataContext';
import AppNavigator from './navigation/AppNavigator';

Config.initialize();

const App = () => (
    <ThemeContextProvider>
        <ServicesContextProvider>
            <AuthContextProvider>
                <DataContextProvider>
                    <AppContextProvider>
                        {Platform.OS === 'ios' && (
                            <StatusBar barStyle="default" />
                        )}
                        <AppNavigator />
                    </AppContextProvider>
                </DataContextProvider>
            </AuthContextProvider>
        </ServicesContextProvider>
    </ThemeContextProvider>
);

export default App;
