import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#272727',
        },
        gray_text: {
            main: '#525252',
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#565656',
                    textDecorationColor: '#a4a4a4', // Add the desired underline color here
                    '&:hover': {
                        textDecorationColor: '#000000', // Also update the underline color on hover
                    },
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
});

export default darkTheme;