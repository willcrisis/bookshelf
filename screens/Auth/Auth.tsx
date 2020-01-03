import React, { FunctionComponent } from 'react';
import { Image } from 'react-native';
import { ScreenContainer, Spacer, Button, Icon } from 'components';
import { useService } from 'contexts/ServicesContext';

const AuthScreen: FunctionComponent<{}> = () => {
    const { authService } = useService();

    return (
        <ScreenContainer centered padded pure>
            <Image
                source={require('assets/logo.png')}
                style={{ width: 100, height: 100 }}
            />
            <Spacer />
            <Button
                icon={style => <Icon name="google" {...style} />}
                onPress={authService.loginWithGoogle}
            >
                Sign-in with Mudano Account
            </Button>
        </ScreenContainer>
    );
};

export default AuthScreen;
