// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,

        h1: {
            fontSize: '2.25rem',
            lineHeight: 1.3,
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            lineHeight: 1.35,
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.75rem',
            lineHeight: 1.4,
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',
            lineHeight: 1.45,
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            lineHeight: 1.5,
            fontWeight: 500,
        },
        h6: {
            fontSize: '1.125rem',
            lineHeight: 1.6,
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        subtitle1: {
            fontSize: '0.95rem',
            lineHeight: 1.5,
            color: '#555',
        },
        subtitle2: {
            fontSize: '0.85rem',
            lineHeight: 1.4,
            color: '#666',
        },
        button: {
            fontSize: '0.875rem',
            textTransform: 'none',
            fontWeight: 500,
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.3,
            color: '#888',
        },
        overline: {
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#999',
        },
    },
});
export default theme;
