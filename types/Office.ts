import firebase from 'firebase';

export default class Office {
    static async asyncConstructor(
        query: firebase.firestore.QueryDocumentSnapshot
    ): Promise<Office> {
        const office = new Office();
        office.id = query.id;
        office.ref = query.ref;

        const { name } = query.data();
        office.name = name;

        return office;
    }

    id: string;

    name: string;

    ref: firebase.firestore.DocumentReference;
}
