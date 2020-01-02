import firebase from 'firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@firebase/auth';
import { Platform } from 'react-native';
import * as Google from 'expo-google-app-auth';
import Config from 'config';
import { User, UserCredential } from 'types';
import AuthService from './AuthService';
import DataService from './DataService';

export default class FirebaseAuth implements AuthService {
    authInstance: firebase.auth.Auth;

    dataService: DataService;

    constructor(dataService: DataService) {
        this.authInstance = firebase.auth();
        this.dataService = dataService;
    }

    listenToLoginChanges = (
        setCurrentUser: (user: User) => void,
        setAuthLoading: (authLoading: boolean) => void
    ) =>
        this.authInstance.onAuthStateChanged(user => {
            setCurrentUser(user);
            setAuthLoading(false);
            if (user) {
                this.dataService.updateUserData(user);
            }
        });

    loginWithGoogle = (): Promise<UserCredential> => {
        const login = Platform.select({
            web: () =>
                this.authInstance.signInWithPopup(
                    new firebase.auth.GoogleAuthProvider()
                ),
            default: async () => {
                const { type, accessToken, idToken } = await Google.logInAsync(
                    Config.googleConfig
                );
                if (type === 'success') {
                    const credential = firebase.auth.GoogleAuthProvider.credential(
                        idToken,
                        accessToken
                    );
                    return this.authInstance.signInWithCredential(credential);
                }
                throw new Error('login error');
            }
        });
        return login();
    };

    logOut = async (): Promise<void> => this.authInstance.signOut();
}
