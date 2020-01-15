import firebase from 'firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@firebase/firestore';
import { User, Book, BookHistory, Office } from 'types';
import DataService from './DataService';

export default class FirebaseDataService implements DataService {
    dbInstance: firebase.firestore.Firestore;

    constructor() {
        this.dbInstance = firebase.firestore();
    }

    loadCollection(
        collection: string,
        setCollection: (collection: any) => void,
        entryConstructor: (
            snap: firebase.firestore.QueryDocumentSnapshot
        ) => Promise<any>,
        filters?: Array<[string, firebase.firestore.WhereFilterOp, any]>,
        orderBy?: Array<[string, firebase.firestore.OrderByDirection]>
    ) {
        let collectionRef: firebase.firestore.Query = this.dbInstance.collection(
            collection
        );
        if (orderBy && orderBy.length > 0) {
            orderBy.forEach(order => {
                collectionRef = collectionRef.orderBy(...order);
            });
        }
        if (filters) {
            filters.forEach(filter => {
                collectionRef = collectionRef.where(...filter);
            });
        }
        return collectionRef.onSnapshot(async allSnaps => {
            const snaps = [];
            allSnaps.forEach(snap => snaps.push(snap));
            const data = [];
            await Promise.all(
                snaps.map(async snap => {
                    const entry = await entryConstructor(snap);
                    data.push(entry);
                })
            );
            setCollection(data);
        });
    }

    updateUserData(user: User) {
        const { displayName, photoURL, email } = user;

        return this.dbInstance.doc(`users/${user.uid}`).set({
            displayName,
            photoURL,
            email
        });
    }

    loadBooks(setBooks: (books: Book[]) => void, office: Office) {
        return this.loadCollection(
            'books',
            setBooks,
            snap => Book.asyncConstructor(snap),
            office && [['office', '==', office.ref]],
            [['name', 'asc']]
        );
    }

    loadBook(id: string, setBook: (book: Book) => void) {
        return this.dbInstance.doc(`books/${id}`).onSnapshot(async bookSnap => {
            const book = await Book.asyncConstructor(bookSnap);
            setBook(book);
        });
    }

    loadHistory(id: string, setHistory: (history: BookHistory[]) => void) {
        return this.loadCollection(
            `books/${id}/history`,
            setHistory,
            snap => BookHistory.asyncConstructor(snap),
            null,
            [['pickedAt', 'asc']]
        );
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

    loadOffices(setOffices: (offices: Office[]) => void) {
        return this.loadCollection(
            'offices',
            setOffices,
            snap => Office.asyncConstructor(snap),
            null,
            [['name', 'asc']]
        );
    }
}
