import { createTheme } from '@mui/material/styles';

// assets
import lightTheme from 'assets/scss/_light_theme.module.scss';
import darkTheme from 'assets/scss/_dark_theme.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    let color;
    if (customization.darkTheme) {
        color = darkTheme;
    } else {
        color = lightTheme;
    }

    const themeOption = {
        colors: color,
        heading: color.secondaryLight,
        paper: color.paper,
        backgroundDefault: '#111936',
        background: '#1a223f',
        darkTextPrimary: '#bdc8f0',
        darkTextSecondary: '#8492c4',
        textDark: '#8492c4',
        menuSelected: '#7267ef',
        menuSelectedBack: '#191f46',
        divider: '#404968',
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
