import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 24,
        marginBottom: 10,
        borderBottom: '1px solid #333',
    },
    info: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
});
