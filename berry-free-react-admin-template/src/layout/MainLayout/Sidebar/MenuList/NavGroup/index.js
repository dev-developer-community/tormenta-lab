import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, Stack, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import { useAuth } from 'contexts';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme();
    const auth = useAuth();

    // menu list items
    const items = item.children?.map((menu) => <NavItem key={menu.id} item={menu} level={1} />);

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar alt="Profile Image" src={auth.user.imageUrl} />
                                {auth.user.name}
                            </Box>
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                <Stack spacing={1}>{items}</Stack>
            </List>
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
