import React from 'react';
import { Text } from 'react-native';
import {
    ScreenContainer,
    TopNavigation,
    TopNavigationAction,
    UserAvatar
} from 'components';
import { UIScreen } from 'types';

const BookList: UIScreen<{}> = () => {
    return (
        <ScreenContainer padded centered>
            <Text>Open up App.tsx to start working on your app!</Text>
        </ScreenContainer>
    );
};

const SettingsMenu = () => (
    <TopNavigationAction icon={props => <UserAvatar {...props} />} />
);

const AppScreenHeader = () => (
    <TopNavigation title="Bookshelf" rightControls={[<SettingsMenu />]} />
);

BookList.navigationOptions = {
    header: () => <AppScreenHeader />
};

export default BookList;
