import { createStyles, makeStyles, MenuItem, MenuList, Paper } from "@material-ui/core"

const useStyles = makeStyles((theme) => createStyles({
    sidemenu: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(12),
        marginRight: theme.spacing(6),
    }
}))

export default function SideMenu (props) {
    const classes = useStyles();

    return (
        <Paper>
            <MenuList>
                {props.menuList.map(item => 
                    <MenuItem key={item} onClick={() => props.setMenu(item)} selected={props.menu === item}>{item}</MenuItem>
                )}
            </MenuList>
        </Paper>
    )
}