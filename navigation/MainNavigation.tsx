import React, { useEffect } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Book from 'screens/Book/Book';
import LoadingScreen from 'screens/LoadingScreen';
import BookList from 'screens/BookList/BookList';
import AuthScreen from 'screens/Auth/Auth';
import { useAuth } from 'contexts/AuthContext';
import { useApp } from 'contexts/AppContext';

const AppNavigator = createStackNavigator(
    {
        Books: BookList,
        Book
    },
    {
        initialRouteName: 'Books',
        cardStyle: { flex: 1 }
    }
);

const AuthNavigator = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        navigationOptions: {
            header: null
        }
    }
});

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator
    },
    {
        initialRouteName: 'App'
    }
);

const MainNavigation: any = props => {
    const { isAuthLoading, currentUser } = useAuth();
    const { isAppLoading } = useApp();

    const isLoading = isAuthLoading || isAppLoading;

    useEffect(() => {
        if (!isLoading) {
            props.navigation.navigate(currentUser ? 'App' : 'Auth');
        }
    }, [isAppLoading, isAuthLoading, currentUser]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <SwitchNavigator {...props} />;
};

MainNavigation.router = SwitchNavigator.router;

export default MainNavigation;
