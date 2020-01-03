import React, { FunctionComponent, useCallback, useState } from 'react';
import { OverflowMenu, TopNavigationAction } from 'react-native-ui-kitten';
import { useService } from 'contexts/ServicesContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from 'contexts/AuthContext';
import UserAvatar from '../UserAvatar/UserAvatar';

type UserAvatarProps = {
    width: number;
    height: number;
};

const UserMenu: FunctionComponent<{}> = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const { currentUser } = useAuth();
    const { authService } = useService();

    const options = useCallback(() => {
        return [{ title: 'Log Out', onSelect: () => authService.logOut() }];
    }, []);

    return (
        <OverflowMenu
            visible={isMenuVisible}
            data={options()}
            placement="bottom end"
            onSelect={index => {
                options()[index].onSelect();
                setMenuVisible(false);
            }}
            onBackdropPress={() => setMenuVisible(false)}
        >
            <TopNavigationAction
                onPress={() => setMenuVisible(true)}
                icon={props => (
                    <UserAvatar source={currentUser.photoURL} {...props} />
                )}
            />
        </OverflowMenu>
    );
};

export default UserMenu;
