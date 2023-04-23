import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const links = [
    "Giới thiệu",
    "Trung tâm Trợ giúp",
    "Điều khoản sử dụng",
    "Liên hệ",
    "App Blog",
];

const Footer = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-start",
                padding: "24px 0px",
                backgroundColor:"#1976d2",
                color: "#fff"
            }}
        >
            <Box>
                <Typography variant="h6" sx={{padding: '0px 16px'}}>Công ty</Typography>
                <List dense>
                    {links.map((item) => (
                        <ListItem key={item}>
                            <a href="/abc" style={{ textDecoration: "none", color: "white"}}><ListItemText primary={item} /></a>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Typography variant="h6" sx={{padding: '0px 16px'}}>Công ty</Typography>
                <List dense>
                    {links.map((item) => (
                        <ListItem key={item}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Typography variant="h6" sx={{padding: '0px 16px'}}>Công ty</Typography>
                <List dense>
                    <ListItem>
                        <ListItemText>Trường đại học Công nghiệp Hà Nội</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Chịu trách nhiệm quản lý nội dung: Phạm Văn Quyền</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Điện thoại liên hệ: 0385439740</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>Email: quyenpv@bsscommerce.com</ListItemText>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Footer;
