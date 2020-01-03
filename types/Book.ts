import firebase from 'firebase';
import User from './User';

export default class Book {
    static async asyncConstructor(
        bookQuery: firebase.firestore.QueryDocumentSnapshot
    ): Promise<Book> {
        const book = new Book();
        book.id = bookQuery.id;

        const { name, link, imageUrl, pickedBy, pickedAt } = bookQuery.data();
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
        return book;
    }

    id: string;

    name: string;

    link: string;

    imageUrl: string;

    pickedBy: User;

    pickedAt: Date;
}
