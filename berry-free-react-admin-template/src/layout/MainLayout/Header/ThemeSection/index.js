import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

import { IconSun, IconMoon } from '@tabler/icons';
import { SET_DARK_THEME } from 'store/actions';

const ThemeSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);

    const [darkTheme, setDarkTheme] = useState(customization.darkTheme);
    const handleToggle = () => {
        setDarkTheme(!darkTheme);
    };
    useEffect(() => {
        dispatch({ type: SET_DARK_THEME, darkTheme });
    }, [dispatch, darkTheme]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        aria-controls={darkTheme ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        {darkTheme ? <IconSun stroke={1.5} size="1.3rem" /> : <IconMoon stroke={1.5} size="1.3rem" />}
                    </Avatar>
                </ButtonBase>
            </Box>
        </>
    );
};

export default ThemeSection;
