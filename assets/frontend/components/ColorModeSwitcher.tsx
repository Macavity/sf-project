import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useTheme } from '@mui/material';

export const ColorModeContext = React.createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleColorMode: () => {},
});

export function ColorModeSwitcher() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <IconButton sx={{ mr: 1 }} title="Light/Dark mode toggle" onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
        </IconButton>
    );
}
