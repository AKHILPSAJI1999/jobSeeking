import * as React from 'react';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(false);
    }
    const navigate=useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "darkorchid" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { sm: "none", xs: "block" } }}
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography fontFamily={'fantasy'} variant="h6" component="div" sx={{ flexGrow: 1, display: { sm: "block", xs: "none" } }}>
                        JOB SEEKING APPLICATION
                    </Typography>
                    {
                        (props.buttonNames.map((ele, ind) => {
                            return <Button onClick={()=>navigate(props.navigate[ind])} color="inherit" variant='outlined' key={ind} sx={{ mr: 1, ml: 1, display: { sm: "block", xs: "none" } }}>{ele}</Button>
                        }))
                    }
                    <Drawer
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 160 },
                        }}
                    >
                        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ my: 2 }}>
                                JOB SEEKING APPLICATION
                            </Typography>
                            <Divider />
                            <List>
                                {
                                    (props.buttonNames.map((ele, ind) => {
                                        return <ListItem key={ind} disablePadding onClick={()=>navigate(props.navigate[ind])}>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemText primary={ele} />
                                            </ListItemButton>
                                        </ListItem>
                                    }))
                                }
                            </List>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Navbar;