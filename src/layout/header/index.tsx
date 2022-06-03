import {AppBar, Button, Grid, IconButton, Typography} from "@mui/material";
import styles from './styles.module.css'
import {Menu} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export default function Header() {

        const navigate = useNavigate()

        return <><AppBar className={styles.header} color={'primary'}>
            <div className={styles.titleText}><Typography component={'span'} color={'secondary'}>Team OZE LTD - Spreadsheets</Typography></div>
            <div className={styles.spacer}/>
            <Grid container className={styles.navContainer} spacing={2} sx={{display: {xs: 'none', md: 'flex'}}}>
                <Grid item>
                    <Button color={'secondary'} variant={'outlined'} onClick={()=>{navigate('/spreadsheet/builder')}}>
                        Builder
                    </Button>
                </Grid>
                <Grid item>
                    <Button color={'secondary'} variant={'outlined'} onClick={()=>{navigate('/spreadsheet/waves')}}>
                        Waves
                    </Button>
                </Grid>
                <Grid item>
                    <Button color={'secondary'} variant={'outlined'} onClick={()=>{navigate('/spreadsheet/barracks')}}>
                        Barracks
                    </Button>
                </Grid>
                <Grid item>
                    <Button color={'secondary'} variant={'outlined'} onClick={()=>{navigate('/spreadsheet/heroes')}}>
                        Heroes
                    </Button>
                </Grid>
            </Grid>
            <IconButton color={'secondary'} sx={{display: {xs: 'inline-flex', md: 'none'}}}>
                <Menu/>
            </IconButton>
        </AppBar>
        <div className={styles.placeHolder}></div>
        </>
}