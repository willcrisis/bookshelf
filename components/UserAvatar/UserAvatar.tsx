import React, { FunctionComponent } from 'react';
import { Avatar, Icon } from 'react-native-ui-kitten';
import { useAuth } from 'contexts/AuthContext';

type UserAvatarProps = {
    width: number;
    height: number;
};

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ width, height }) => {
    const props = { style: { width, height } };
    const { currentUser } = useAuth();

    if (currentUser && currentUser.photoURL) {
        return <Avatar {...props} source={currentUser.photoURL} />;
    }
    return <Icon {...props} name="person" />;
};

export default UserAvatar;
