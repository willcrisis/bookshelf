import React, {
    createContext,
    useContext,
    FunctionComponent,
    PropsWithChildren
} from 'react';
import AuthService from 'services/AuthService';
import FirebaseAuthService from 'services/FirebaseAuthService';
import DataService from 'services/DataService';
import FirebaseDataService from 'services/FirebaseDataService';

type Services = {
    authService: AuthService;
    dataService: DataService;
};

const ServicesContext = createContext<Services>(null);

const ServicesContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({
    children
}) => {
    const dataService = new FirebaseDataService();
    const authService = new FirebaseAuthService(dataService);
    return (
        <ServicesContext.Provider
            value={{
                authService,
                dataService
            }}
        >
            {children}
        </ServicesContext.Provider>
    );
};

export const useService = (): Services => useContext(ServicesContext);

export default ServicesContextProvider;
