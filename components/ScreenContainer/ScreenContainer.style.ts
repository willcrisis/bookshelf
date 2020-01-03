import { StyleSheet, Platform } from 'react-native';
import { measures } from '../../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    centeredHorizontal: {
        alignItems: 'center'
    },
    centeredVertical: {
        justifyContent: 'center'
    },
    paddedHorizontal: {
        ...Platform.select({
            web: {
                paddingLeft: measures.padding,
                paddingRight: measures.padding
            },
            default: {
                paddingHorizontal: measures.padding
            }
        })
    },
    paddedVertical: {
        ...Platform.select({
            web: {
                paddingTop: measures.padding,
                paddingBottom: measures.padding
            },
            default: {
                paddingVertical: measures.padding
            }
        })
    }
});

export default styles;
