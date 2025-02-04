import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
                h2: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
                h3: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
                h4: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
                h5: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
                h6: {
                    fontFamily: 'Poppins, Arial, sans-serif',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#62929E',
            light: '#DEF3F9',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
