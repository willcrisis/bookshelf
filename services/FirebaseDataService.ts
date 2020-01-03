import firebase from 'firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@firebase/firestore';
import { User, Book } from 'types';
import DataService from './DataService';

const extractData = (snapshot: firebase.firestore.QueryDocumentSnapshot) => ({
    ...snapshot.data(),
    id: snapshot.id
});

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
            .onSnapshot(async allSnaps => {
                const snaps = [];
                allSnaps.forEach(bookSnap => {
                    snaps.push(bookSnap);
                });
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
}
