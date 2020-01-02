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
        const unsubscribes = [];
        unsubscribes.push(
            this.dbInstance.collection('books').onSnapshot(allSnaps => {
                const books = [];
                allSnaps.forEach(bookSnap => {
                    const book = extractData(bookSnap);
                    books.push(book);
                });
                setBooks(books);
            })
        );
        return unsubscribes;
    }
}
