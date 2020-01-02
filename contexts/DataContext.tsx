import React, {
    createContext,
    useState,
    useContext,
    FunctionComponent,
    PropsWithChildren,
    useEffect
} from 'react';
import { Book } from 'types';
import { useAuth } from './AuthContext';
import { useService } from './ServicesContext';

type Data = {
    books: Book[];
};

const DataContext = createContext<Data>(null);

const DataContextProvider: FunctionComponent<PropsWithChildren<{}>> = ({
    children
}) => {
    const [books, setBooks] = useState([]);
    const { currentUser } = useAuth();
    const { dataService } = useService();

    useEffect(() => {
        let unsubscribes = [];
        if (currentUser) {
            unsubscribes = dataService.loadBooks(setBooks);
        }

        return () => {
            unsubscribes.forEach(unsubscribe => unsubscribe());
        };
    }, [currentUser]);

    return (
        <DataContext.Provider
            value={{
                books
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): Data => useContext(DataContext);

export default DataContextProvider;
