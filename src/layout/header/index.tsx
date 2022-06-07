import {AppBar, Button, Grid, IconButton, Typography, Menu, MenuItem} from "@mui/material";
import {Menu as MenuIcon} from '@mui/icons-material'
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface MenuState {
    open: boolean
    anchor: Element | null
}

export default function Header() {

        const [menuState, setMenuState] = useState<MenuState>({
            open: false,
            anchor: null
        })

        const navigate = useNavigate()

        const bindNavigate = (to: string) => () => {
            navigate(to)
            setMenuState({
                open: false,
                anchor: null
            })
        }

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
            <IconButton color={'secondary'} sx={{display: {xs: 'inline-flex', md: 'none'}}} onClick={(e)=>{
                setMenuState(s=>({
                    open: !s.open,
                    anchor: e.target as Element
                }))
            }}>
                <MenuIcon/>
            </IconButton>
        </AppBar>
        <div className={styles.placeHolder}></div>
        <Menu open={menuState.open} anchorEl={menuState.anchor}>
            <MenuItem onClick={bindNavigate('/spreadsheet/builder')}>Builder</MenuItem>
            <MenuItem onClick={bindNavigate('/spreadsheet/waves')}>Waves</MenuItem>
            <MenuItem onClick={bindNavigate('/spreadsheet/barracks')}>Summons</MenuItem>
            <MenuItem onClick={bindNavigate('/spreadsheet/heroes')}>Heroes</MenuItem>
        </Menu>
        </>
}