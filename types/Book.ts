import firebase from 'firebase';
import User from './User';
import Office from './Office';

export default class Book {
    static async asyncConstructor(
        bookQuery: firebase.firestore.QueryDocumentSnapshot
    ): Promise<Book> {
        const book = new Book();
        book.id = bookQuery.id;
        book.ref = bookQuery.ref;

        const {
            name,
            link,
            imageUrl,
            pickedBy,
            pickedAt,
            office
        } = bookQuery.data();
        book.name = name;
        book.link = link;
        book.imageUrl = imageUrl;
        if (pickedAt) {
            book.pickedAt = new Date(pickedAt.seconds * 1000);
        }
        if (pickedBy) {
            const userSnap = await pickedBy.get();
            const user = {
                ...userSnap.data(),
                uid: userSnap.id
            };
            book.pickedBy = user;
        }
        if (office) {
            const snap = await office.get();

            book.office = await Office.asyncConstructor(snap);
        }
        return book;
    }

    id: string;

    name: string;

    link: string;

    imageUrl: string;

    pickedBy: User;

    pickedAt: Date;

    office: Office;

    ref: firebase.firestore.DocumentReference;
}
