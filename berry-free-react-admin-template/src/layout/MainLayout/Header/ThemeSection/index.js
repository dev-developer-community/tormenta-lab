import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

import { Avatar, ButtonBase, Stack } from '@mui/material';
import { IconBrightness2, IconMoonStars, IconLogout } from '@tabler/icons';
import { useAuth } from 'contexts';

import { SET_DARK_THEME } from 'store/actions';
import BrazilFlag from 'assets/images/i18n/br-flag.svg';
import UnitedStatesFlag from 'assets/images/i18n/us-flag.svg';

const ThemeSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const auth = useAuth();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const [darkTheme, setDarkTheme] = useState(customization.darkTheme);
    const handleToggle = () => {
        setDarkTheme(!darkTheme);
    };
    useEffect(() => {
        dispatch({ type: SET_DARK_THEME, darkTheme });
    }, [dispatch, darkTheme]);

    const handleLogout = () => {
        auth.signout(() => {
            navigate('/', { replace: true });
        });
    };

    const selectedLanguage = i18n.language;
    const handleChangeLanguage = () => {
        const language = selectedLanguage === 'pt-BR' ? 'en-US' : 'pt-BR';
        i18n.changeLanguage(language);
    };

    const avatarStyle = {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    };

    return (
        <Stack spacing={2} direction="row">
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={avatarStyle}
                    aria-controls={darkTheme ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleChangeLanguage}
                    color="inherit"
                    src={selectedLanguage === 'en-US' ? BrazilFlag : UnitedStatesFlag}
                    alt="Language Flag"
                />
            </ButtonBase>
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={avatarStyle}
                    aria-controls={darkTheme ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    {darkTheme ? <IconBrightness2 stroke={1.5} size="1.3rem" /> : <IconMoonStars stroke={1.5} size="1.3rem" />}
                </Avatar>
            </ButtonBase>
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={avatarStyle}
                    aria-controls={darkTheme ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleLogout}
                    color="inherit"
                >
                    <IconLogout stroke={1.5} size="1.3rem" />
                </Avatar>
            </ButtonBase>
        </Stack>
    );
};

export default ThemeSection;
