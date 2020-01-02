import User from './User';

export default interface Book {
    id: string;
    name: string;
    link: string;
    imageUrl: string;
    pickedBy: User;
    pickedAt: Date;
}
