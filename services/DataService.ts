import { User, Book } from '../types';

export default interface DataService {
    updateUserData(user: User): Promise<void>;
    loadBooks(setBooks: (books: Book[]) => void): () => void;
    loadBook(id: string, setBook: (book: Book) => void): () => void;
    pickBook(id: string, userId: string): Promise<void>;
}
