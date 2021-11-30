import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

// material-ui
import { Button, CircularProgress, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

// google auth
import { GoogleLogin } from 'react-google-login';

// project imports
import AuthWrapper from './components/AuthWrapper';
import AuthCardWrapper from './components/AuthCardWrapper';

import AuthFooter from 'components/cards/AuthFooter';
import AnimateButton from 'components/extended/AnimateButton';
import Logo from 'components/Logo';

import Google from 'assets/images/icons/social-google.svg';
import { useAuth } from 'contexts';
import authenticate from './services/authService';

const Login = () => {
    const theme = useTheme();
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    async function handleLoginSuccess(response) {
        const idToken = response.getAuthResponse().id_token;
        const from = location.state?.from?.pathname || '/';

        await authenticate(idToken).then(({ data }) => {
            auth.signin(data, () => navigate(from, { replace: true }));
        });
    }

    function handleLoginFailure(response) {
        console.error(response);
        enqueueSnackbar('Não foi possível autenticar-se no Google. Tente novamente mais tarde.', { variant: 'warning' });
    }

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" justifyContent="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <GoogleLogin
                                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                    onSuccess={(response) => handleLoginSuccess(response)}
                                                    onFailure={(response) => handleLoginFailure(response)}
                                                    render={({ onClick, disabled }) => {
                                                        if (disabled) {
                                                            return (
                                                                <Box
                                                                    component="div"
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'center'
                                                                    }}
                                                                >
                                                                    <CircularProgress />
                                                                </Box>
                                                            );
                                                        }
                                                        return (
                                                            <AnimateButton>
                                                                <Button
                                                                    disableElevation
                                                                    fullWidth
                                                                    size="large"
                                                                    variant="outlined"
                                                                    sx={{
                                                                        color: 'grey.700',
                                                                        backgroundColor: theme.palette.primary,
                                                                        borderColor: theme.palette.grey[100]
                                                                    }}
                                                                    onClick={() => onClick()}
                                                                >
                                                                    <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                                                        <img
                                                                            src={Google}
                                                                            alt="google"
                                                                            width={16}
                                                                            height={16}
                                                                            style={{ marginRight: matchDownSM ? 8 : 16 }}
                                                                        />
                                                                    </Box>
                                                                    SIGN IN WITH GOOGLE
                                                                </Button>
                                                            </AnimateButton>
                                                        );
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
