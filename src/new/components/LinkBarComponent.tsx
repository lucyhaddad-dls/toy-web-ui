import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const LinksList = (
    <Stack sx={{ bgcolor: "primary.dark",
        minHeight:"100%", justifyContent:"start" }}>

    <Typography align="center" sx={{color:"white", marginTop:"10%"}}>
        Navigation Menu
    </Typography>
    <List sx = {{ bgcolor:"primary.dark", color:"white",
            alignContent:"center", marginTop:"20%" }}>
    <ListItem key={"home"}>
        <Link to="/">
        <ListItemText 
        sx = {{ bgcolor:"primary.dark", color:"white"}}>
        <b>Home (Placeholder page)</b>
        </ListItemText>
        </Link>
    </ListItem>

    <ListItem key={"samples"}>
        <Link to="/samples">
        <ListItemText 
        sx = {{ bgcolor:"primary.dark", color:"white"}}>
        <b>Sample Information</b>
        </ListItemText>
        </Link>
    </ListItem>
    
    </List>
    </Stack>
)