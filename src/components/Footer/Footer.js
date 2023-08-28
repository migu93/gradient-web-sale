import {Box, Button, Container, Grid, Link, List, ListItem, ListItemText, makeStyles, Typography} from '@mui/material';
import {useTheme} from "@mui/material/styles";
import headerLinks from "../../config/headerLinks";
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import logo from '../../images/logo/NPO-Logo for navMenu.svg';
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {

    const theme = useTheme();
    return (
        <Box
            mt={5}
            sx={{
                marginTop: 30,
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                padding: '32px 0',
                borderTop: '1px solid #444',
            }}
        >
            <Container maxWidth="lg">
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={'center'} variant="h6" gutterBottom>
                            Контакты
                        </Typography>
                        <Typography display={'block'}>г. Волгоград Канунникова, 6/1</Typography>
                        <Typography display={'block'} mt={2}>+7 (8442)43-50-50</Typography>
                        <Typography display={'block'}>info@ooogradient.ru</Typography>
                    </Grid>
                    {
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography align={'center'} variant="h6" gutterBottom>
                                Навигация
                            </Typography>
                            <List>
                                <Grid container>
                                    {headerLinks.map((link) => (
                                        <Grid item xs={6} key={link.path}>
                                            <Link component={RouterLink}
                                                      onClick={() => window.scrollTo(0, 0)}
                                                       to={link.path}>
                                                <ListItemText primary={link.name} />
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </List>
                        </Grid>
                    }
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={'center'} variant="h6" gutterBottom>
                            Наши социальные сети
                        </Typography>
                        <Box  sx={{display: 'flex', gap: 4, justifyContent: 'center'}}>
                            <Link  href="htthps://telegram.org">
                                <TelegramIcon />
                            </Link>
                            <Link  href="https://www.whatsapp.com">
                                <WhatsAppIcon />
                            </Link>
                            <Link href="https://mail.ru">
                                <MailOutlineIcon />
                            </Link>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'center'}} mt={3}>
                            <Button to={'/'} onClick={() => window.scrollTo(0, 0)}>
                                <img
                                    align={'center'}
                                    src={logo}
                                    width={200}
                                    alt="Logo"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                    }}/>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
