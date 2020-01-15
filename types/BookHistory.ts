import User from './User';

export default class BookHistory {
    static async asyncConstructor(
        query: firebase.firestore.QueryDocumentSnapshot
    ): Promise<BookHistory> {
        const history = new BookHistory();
        history.id = query.id;
        history.ref = query.ref;

        const { pickedAt, returnedAt, pickedBy } = query.data();
        history.pickedAt = new Date(pickedAt.seconds * 1000);
        history.returnedAt = new Date(returnedAt.seconds * 1000);

        if (pickedBy) {
            const userSnap = await pickedBy.get();
            const user = {
                ...userSnap.data(),
                uid: userSnap.id
            };
            history.pickedBy = user;
        }
        return history;
    }

    id: string;

    pickedAt: Date;

    returnedAt: Date;

    pickedBy: User;

    ref: firebase.firestore.DocumentReference;
}
