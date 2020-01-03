import React, { FunctionComponent, useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { TopNavigation, UserMenu, List, ListItem, Icon } from 'components';
import { UIScreen, Book } from 'types';
import { Image } from 'react-native';
import { useService } from 'contexts/ServicesContext';

const BookIcon: FunctionComponent<{
    book: Book;
    style: any;
}> = ({ book, style }) => {
    if (book.imageUrl) {
        return (
            <Image
                style={[...style, { width: 18, height: 24, tintColor: null }]}
                source={book.imageUrl}
            />
        );
    }
    return <Icon style={style} name="book" />;
};

const buildItemDescription = (book: Book): string => {
    if (book.pickedAt) {
        // return `Picked by ${book.pickedBy.displayName} at ${book.pickedAt}`;
        return `Picked by ${book.pickedBy.displayName} at ${book.pickedAt}`;
    }
    return 'Available';
};

const BookList: UIScreen<{}> = () => {
    const [books, setBooks] = useState([]);
    const { dataService } = useService();

    const { navigate } = useNavigation();

    useEffect(() => {
        const unsubscribe = dataService.loadBooks(setBooks);

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <List
            data={books}
            renderItem={({ item }: { item: Book }) => (
                <ListItem
                    title={item.name}
                    description={buildItemDescription(item)}
                    icon={style => <BookIcon book={item} style={style} />}
                    onPress={() => navigate('Book', { id: item.id })}
                    accessory={() => (
                        <Icon width={24} height={24} name="chevron-right" />
                    )}
                />
            )}
        />
    );
};

const AppScreenHeader: FunctionComponent<{}> = () => (
    <TopNavigation title="Bookshelf" rightControls={[<UserMenu />]} />
);

BookList.navigationOptions = {
    header: () => <AppScreenHeader />
};

export default BookList;
