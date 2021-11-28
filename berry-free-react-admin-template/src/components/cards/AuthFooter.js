// material-ui
import { Link, Typography, Stack } from '@mui/material';

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle2"
            component={Link}
            href="https://github.com/dev-developer-community"
            target="_blank"
            underline="hover"
        >
            &copy; Developer & Community
        </Typography>
    </Stack>
);

export default AuthFooter;
