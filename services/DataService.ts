import BookHistory from 'types/BookHistory';
import { User, Book, Office } from 'types';

export default interface DataService {
    updateUserData(user: User): Promise<void>;
    loadBooks(setBooks: (books: Book[]) => void, office: Office): () => void;
    loadBook(id: string, setBook: (book: Book) => void): () => void;
    loadHistory(
        id: string,
        setHistory: (history: BookHistory[]) => void
    ): () => void;
    pickBook(id: string, userId: string): Promise<void>;
    returnBook(book: Book): Promise<void>;
    loadOffices(setOffices: (offices: Office[]) => void): () => void;
}
