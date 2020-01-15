import React, { FunctionComponent, useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import format from 'date-fns/format';
import { UIScreen, Book, BookHistory } from 'types';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import * as WebBrowser from 'expo-web-browser';
import {
    TopNavigation,
    TopNavigationAction,
    Icon,
    ScreenContainer,
    Row,
    Text,
    Button,
    UserAvatar,
    Spacer,
    List,
    ListItem
} from 'components';
import { useService } from 'contexts/ServicesContext';
import { useAuth } from 'contexts/AuthContext';
import styles from './Book.styles';

const formatDate = (date: Date) => format(date, 'dd/MMM/yyyy HH:mm');

const BookScreen: UIScreen<{}> = () => {
    const id = useNavigationParam('id');
    const [book, setBook] = useState<Book>(null);
    const [history, setHistory] = useState<BookHistory[]>([]);
    const { dataService } = useService();
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = dataService.loadBook(id, setBook);
        const unsubscribeFromHistory = dataService.loadHistory(id, setHistory);

        return () => {
            unsubscribe();
            unsubscribeFromHistory();
        };
    }, [id]);

    if (!book) {
        return null;
    }

    return (
        <ScreenContainer padded>
            <View style={styles.container}>
                <Row>
                    {book.imageUrl && (
                        <Image
                            source={book.imageUrl}
                            style={{ width: 90, height: 120 }}
                        />
                    )}
                    <View style={styles.details}>
                        <Text category="h6" style={styles.title}>
                            {book.name}
                        </Text>
                        <Text category="s2" style={styles.title}>
                            Available at&nbsp;
                            {book.office.name}
                            &nbsp;office
                        </Text>
                        <Button
                            status="basic"
                            onPress={() => {
                                WebBrowser.openBrowserAsync(book.link);
                            }}
                        >
                            Open link
                        </Button>
                    </View>
                </Row>
                <Spacer />
                <View>
                    <Text category="s2">Picked by:</Text>
                    {book.pickedAt ? (
                        <Row>
                            <UserAvatar
                                width={48}
                                height={48}
                                source={book.pickedBy.photoURL}
                            />
                            <View style={styles.details}>
                                <Text category="s1">
                                    {book.pickedBy.displayName}
                                </Text>
                                <Text appearance="hint">
                                    {formatDate(book.pickedAt)}
                                </Text>
                            </View>
                        </Row>
                    ) : (
                        <Text category="h6">Book is available!</Text>
                    )}
                </View>
                <Spacer />
                <Text category="label">HISTORY</Text>
                <List
                    data={history}
                    renderItem={({ item }: { item: BookHistory }) => (
                        <ListItem
                            title={item.pickedBy.displayName}
                            description={`Picked: ${formatDate(
                                item.pickedAt
                            )}\nReturned: ${formatDate(item.returnedAt)}`}
                            icon={style => (
                                <UserAvatar
                                    {...style}
                                    source={item.pickedBy.photoURL}
                                />
                            )}
                        />
                    )}
                />
            </View>
            <Spacer />
            {!book.pickedAt && (
                <Button
                    onPress={() => {
                        dataService.pickBook(book.id, currentUser.uid);
                    }}
                >
                    Pick book
                </Button>
            )}
            {book.pickedBy && book.pickedBy.uid === currentUser.uid && (
                <Button
                    onPress={() => {
                        dataService.returnBook(book);
                    }}
                >
                    Return book
                </Button>
            )}
        </ScreenContainer>
    );
};

const BookScreenHeader: FunctionComponent<{}> = () => {
    const { goBack } = useNavigation();
    return (
        <TopNavigation
            title="Book Details"
            leftControl={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <TopNavigationAction
                    onPress={() => goBack()}
                    icon={style => <Icon {...style} name="arrow-back" />}
                />
            }
        />
    );
};

BookScreen.navigationOptions = {
    header: () => <BookScreenHeader />
};

export default BookScreen;
