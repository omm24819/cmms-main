import { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from 'src/theme/ThemeProvider';

function ThemeModeToggle() {
  const { t }: { t: any } = useTranslation();
  const { mode, toggleMode } = useContext(ColorModeContext);
  const isDarkMode = mode === 'dark';

  return (
    <Tooltip
      arrow
      title={isDarkMode ? t('Switch to light mode') : t('Switch to dark mode')}
    >
      <IconButton
        color="primary"
        onClick={toggleMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <LightModeTwoToneIcon fontSize="small" />
        ) : (
          <DarkModeTwoToneIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeModeToggle;
