import React, { FunctionComponent } from 'react';
import { TopNavigation, UserMenu, List, ListItem, Icon } from 'components';
import { UIScreen, Book } from 'types';
import { useData } from 'contexts/DataContext';
import { Image, StyleProp } from 'react-native';

const BookIcon: FunctionComponent<{
    book: Book;
    style: Array<StyleProp<{}>>;
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
        return 'Picked';
    }
    return 'Available';
};

const BookList: UIScreen<{}> = () => {
    const { books } = useData();
    return (
        <List
            data={books}
            renderItem={({ item }: { item: Book }) => (
                <ListItem
                    title={item.name}
                    description={buildItemDescription(item)}
                    icon={style => <BookIcon book={item} style={style} />}
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
