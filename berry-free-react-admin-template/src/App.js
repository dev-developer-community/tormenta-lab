import { useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Slide from '@mui/material/Slide';

import Routes from 'routes';

import themes from 'themes';

import NavigationScroll from 'layout/NavigationScroll';
import { AuthProvider } from 'contexts';

const App = () => {
    const customization = useSelector((state) => state.customization);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <AuthProvider>
                        <SnackbarProvider
                            maxSnack={3}
                            autoHideDuration={4000}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            TransitionComponent={Slide}
                        >
                            <Routes />
                        </SnackbarProvider>
                    </AuthProvider>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
