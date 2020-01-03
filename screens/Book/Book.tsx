import React, { FunctionComponent, useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { UIScreen } from 'types';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import {
    TopNavigation,
    TopNavigationAction,
    Icon,
    ScreenContainer,
    Row,
    Text,
    Button
} from 'components';
import { useService } from 'contexts/ServicesContext';
import { useAuth } from 'contexts/AuthContext';
import styles from './Book.styles';

const Book: UIScreen<{}> = () => {
    const id = useNavigationParam('id');
    const [book, setBook] = useState(null);
    const { dataService } = useService();
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = dataService.loadBook(id, setBook);

        return () => {
            unsubscribe();
        };
    }, [id]);

    if (!book) {
        return null;
    }

    return (
        <ScreenContainer padded style={styles.container}>
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
                    <Button status="basic">Open link</Button>
                </View>
            </Row>
            {!book.pickedAt && (
                <Button
                    onPress={() =>
                        dataService.pickBook(book.id, currentUser.uid)
                    }
                >
                    Pick book
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

Book.navigationOptions = {
    header: () => <BookScreenHeader />
};

export default Book;
