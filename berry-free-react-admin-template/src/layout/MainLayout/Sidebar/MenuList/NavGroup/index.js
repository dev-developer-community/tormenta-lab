import PropTypes from 'prop-types';

// material-ui
import { Button, List, Stack, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import { useAuth } from 'contexts';
import { Box } from '@mui/system';
import Translator from 'components/Translator';
import { IconPlus } from '@tabler/icons';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const auth = useAuth();

    // menu list items
    const items = item.children?.map((menu) => <NavItem key={menu.id} item={menu} level={1} />);

    return (
        <List
            subheader={
                <Box sx={{ mb: 1 }}>
                    <Typography variant="h4" align="center">
                        {auth.user?.name}
                    </Typography>
                </Box>
            }
        >
            <Stack spacing={1}>{items}</Stack>
            <Box sx={{ mt: 1 }}>
                <Button startIcon={<IconPlus />} href="/character">
                    <Translator path="sidebar.addNewCharacter" />
                </Button>
            </Box>
        </List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
