import { createTheme } from '@mui/material/styles';

import lightTheme from 'assets/scss/_light_theme.module.scss';
import darkTheme from 'assets/scss/_dark_theme.module.scss';

import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export const theme = (customization) => {
    let color;
    if (customization.darkTheme) {
        color = darkTheme;
    } else {
        color = lightTheme;
    }

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.backgroundDefault,
        background: color.background,
        darkTextPrimary: color.darkTextPrimary,
        darkTextSecondary: color.darkTextSecondary,
        textDark: color.textDark,
        menuSelected: color.menuSelected,
        menuSelectedBack: color.menuSelectedBack,
        divider: color.divider,
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
