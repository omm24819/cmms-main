import { Box } from '@mui/material';
import ThemeModeToggle from 'src/components/ThemeModeToggle';
import HeaderNotifications from './Notifications';

function HeaderButtons() {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <ThemeModeToggle />
      <HeaderNotifications />
      {/*<LanguageSwitcher />*/}
      {/*<Chat />*/}
    </Box>
  );
}

export default HeaderButtons;
