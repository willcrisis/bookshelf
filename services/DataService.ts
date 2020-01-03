import BookHistory from 'types/BookHistory';
import { User, Book } from '../types';

export default interface DataService {
    updateUserData(user: User): Promise<void>;
    loadBooks(setBooks: (books: Book[]) => void): () => void;
    loadBook(id: string, setBook: (book: Book) => void): () => void;
    loadHistory(
        id: string,
        setHistory: (history: BookHistory[]) => void
    ): () => void;
    pickBook(id: string, userId: string): Promise<void>;
    returnBook(book: Book): Promise<void>;
}
