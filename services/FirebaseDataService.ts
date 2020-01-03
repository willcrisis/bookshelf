import firebase from 'firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@firebase/firestore';
import { User, Book, BookHistory } from 'types';
import DataService from './DataService';

export default class FirebaseDataService implements DataService {
    dbInstance: firebase.firestore.Firestore;

    constructor() {
        this.dbInstance = firebase.firestore();
    }

    updateUserData(user: User) {
        const { displayName, photoURL, email } = user;

        return this.dbInstance.doc(`users/${user.uid}`).set({
            displayName,
            photoURL,
            email
        });
    }

    loadBooks(setBooks: (books: Book[]) => void) {
        return this.dbInstance
            .collection('books')
            .orderBy('name', 'asc')
            .onSnapshot(async allSnaps => {
                const snaps = [];
                allSnaps.forEach(bookSnap => snaps.push(bookSnap));
                const books = [];
                await Promise.all(
                    snaps.map(async bookSnap => {
                        const book = await Book.asyncConstructor(bookSnap);
                        books.push(book);
                    })
                );
                setBooks(books);
            });
    }

    loadBook(id: string, setBook: (book: Book) => void) {
        return this.dbInstance.doc(`books/${id}`).onSnapshot(async bookSnap => {
            const book = await Book.asyncConstructor(bookSnap);
            setBook(book);
        });
    }

    loadHistory(id: string, setHistory: (history: BookHistory[]) => void) {
        return this.dbInstance
            .collection(`books/${id}/history`)
            .orderBy('pickedAt', 'asc')
            .onSnapshot(async allSnaps => {
                const snaps = [];
                allSnaps.forEach(snap => snaps.push(snap));
                const entries = [];
                await Promise.all(
                    snaps.map(async snap => {
                        const history = await BookHistory.asyncConstructor(
                            snap
                        );
                        entries.push(history);
                    })
                );
                setHistory(entries);
            });
    }

    pickBook(id: string, userId: string) {
        return this.dbInstance.doc(`books/${id}`).set(
            {
                pickedAt: new Date(),
                pickedBy: this.dbInstance.doc(`users/${userId}`)
            },
            {
                merge: true
            }
        );
    }

    returnBook(book: Book) {
        this.dbInstance.collection(`books/${book.id}/history`).add({
            pickedAt: book.pickedAt,
            pickedBy: this.dbInstance.doc(`users/${book.pickedBy.uid}`),
            returnedAt: new Date()
        });
        return this.dbInstance.doc(`books/${book.id}`).set(
            {
                pickedAt: null,
                pickedBy: null
            },
            {
                merge: true
            }
        );
    }
}
