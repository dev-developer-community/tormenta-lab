import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Badge, ListItemAvatar, ListItemButton, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { CHARACTER_SELECTED, MENU_OPEN, SET_MENU } from 'store/actions';
import config from 'config';

// assets
import Translator from 'components/Translator';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.success.light,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""'
        }
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0
        }
    }
}));

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${config.basename}/character/${item.id}`} target="_self" />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: `/character/${item.id}`, target: '_self' };
    }

    const itemHandler = (item) => {
        dispatch({ type: MENU_OPEN, id: item.id });
        dispatch({ type: CHARACTER_SELECTED, character: item });

        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Badge
            color="secondary"
            badgeContent={item.level || <Translator path="sidebar.badgeNoLevel" />}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <ListItemButton
                {...listItemProps}
                disabled={item.disabled}
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit'
                }}
                selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
                onClick={() => itemHandler(item)}
            >
                <ListItemAvatar>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant={item.id === customization.character?.id ? 'dot' : 'standard'}
                    >
                        <Avatar alt="Image characterer" src={item.image} />
                    </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                            {item.name || <Translator path="sidebar.noName" />}
                        </Typography>
                    }
                    secondary={
                        item.breed && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {item.breed?.join(' | ') || <Translator path="sidebar.noBreed" />}
                            </Typography>
                        )
                    }
                />
            </ListItemButton>
        </Badge>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
