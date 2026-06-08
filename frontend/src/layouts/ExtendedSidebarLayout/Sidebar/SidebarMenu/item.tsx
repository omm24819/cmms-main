import { FC, ReactNode, useState, useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { SidebarContext } from 'src/contexts/SidebarContext';

import PropTypes from 'prop-types';
import {
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  ListItem,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

interface SidebarMenuItemProps {
  children?: ReactNode;
  link?: string;
  icon?: any;
  badge?: string;
  badgeTooltip?: string;
  open?: boolean;
  active?: boolean;
  name: string;
}

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  badgeTooltip,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent);
  const { t }: { t: any } = useTranslation();
  const { closeSidebar } = useContext(SidebarContext);

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    const handleNavigate = (): void => {
      closeSidebar();
    };

    return (
      <ListItem component="div" className="Mui-children" key={name} {...rest}>
        <Box
          className={clsx('MuiMenuItem-parent', { active: menuToggle })}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button
            component={link ? RouterLink : 'button'}
            to={link || undefined}
            className={clsx({ active: menuToggle })}
            startIcon={Icon && <Icon />}
            onClick={handleNavigate}
            sx={{
              textAlign: 'start',
              flex: 1,
              justifyContent: 'flex-start'
            }}
          >
            {badgeTooltip ? (
              <TooltipWrapper title={badgeTooltip} arrow placement="right">
                {badge === '' ? (
                  <Badge color="primary" variant="dot" />
                ) : (
                  <Badge badgeContent={badge} />
                )}
              </TooltipWrapper>
            ) : badge === '' ? (
              <Badge color="primary" variant="dot" />
            ) : (
              <Badge badgeContent={badge} />
            )}
            {t(name)}
          </Button>

          <IconButton
            size="small"
            disableRipple
            onClick={toggleMenu}
            className="MuiMenuItem-expandToggle"
            sx={{
              color: 'inherit',
              p: 0.5,
              mr: 1,
              flexShrink: 0,
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            {menuToggle ? (
              <ExpandLessTwoToneIcon fontSize="small" />
            ) : (
              <ExpandMoreTwoToneIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        disableRipple
        component={RouterLink}
        className={clsx({ active })}
        onClick={closeSidebar}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {t(name)}
        {badgeTooltip ? (
          <TooltipWrapper title={badgeTooltip} arrow placement="right">
            {badge === '' ? (
              <Badge color="primary" variant="dot" />
            ) : (
              <Badge badgeContent={badge} />
            )}
          </TooltipWrapper>
        ) : badge === '' ? (
          <Badge color="primary" variant="dot" />
        ) : (
          <Badge badgeContent={badge} />
        )}
      </Button>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  badgeTooltip: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false
};

export default SidebarMenuItem;
