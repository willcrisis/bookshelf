import { User, UserCredential } from '../types';

export default interface AuthService {
    listenToLoginChanges: (
        setCurrentUser: (user: User) => void,
        setAuthLoading: (authLoading: boolean) => void
    ) => void;

    loginWithGoogle: () => Promise<UserCredential>;

    logOut: () => Promise<void>;
}
