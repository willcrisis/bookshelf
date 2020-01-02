import { User, Book } from '../types';

export default interface DataService {
    updateUserData(user: User): Promise<void>;
    loadBooks(setBooks: (books: Book[]) => void): Array<() => void>;
}
