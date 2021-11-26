import { useRoutes } from 'react-router-dom';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import config from 'config';

export default function ThemeRoutes() {
    return useRoutes([PrivateRoutes, PublicRoutes], config.basename);
}
