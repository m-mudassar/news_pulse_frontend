import * as React from 'react';
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {PreferencesDrawer} from "../PrefrencesDrawer/PreferencesDrawer.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [preferencesOpen, setPreferencesOpen] = useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [
        {
            label: 'Preferences', onClick: () => {
                setPreferencesOpen(true);
            }
        },
        {
            label: 'Logout', onClick: () => {
                dispatch({type: 'LOGOUT', payload: {navigate: navigate}});
            }
        }
    ];

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NewspaperIcon sx={{mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEWS PULSE
                    </Typography>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, i) => (
                                <MenuItem key={i++} onClick={() => {
                                    setting.onClick();
                                    handleCloseUserMenu();
                                }}>
                                    <Typography sx={{textAlign: 'center'}}>{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

            <PreferencesDrawer open={preferencesOpen} handleClose={setPreferencesOpen}/>
        </AppBar>
    );
}

export default ResponsiveAppBar;
