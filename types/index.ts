import { FunctionComponent } from 'react';
import { NavigationStackOptions } from 'react-navigation-stack';
import User from './User';
import UserCredential from './UserCredential';
import Book from './Book';
import BookHistory from './BookHistory';
import Office from './Office';

export type UIScreen<P> = FunctionComponent<P> & {
    navigationOptions?: NavigationStackOptions;
};

export { User, UserCredential, Book, BookHistory, Office };
