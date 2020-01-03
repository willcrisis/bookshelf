import React, { FunctionComponent, PropsWithChildren } from 'react';
import { View } from 'react-native';
import styles from './Row.styles';

const Row: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => (
    <View style={styles.container}>{children}</View>
);

export default Row;
