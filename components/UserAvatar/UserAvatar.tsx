import React, { FunctionComponent } from 'react';
import { Avatar, Icon } from 'react-native-ui-kitten';

type UserAvatarProps = {
    width: number;
    height: number;
    source: string;
};

const UserAvatar: FunctionComponent<UserAvatarProps> = ({
    width,
    height,
    source
}) => {
    const props = { style: { width, height } };

    if (source) {
        return <Avatar {...props} source={source} />;
    }
    return <Icon {...props} name="person" />;
};

export default UserAvatar;
