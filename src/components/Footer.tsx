import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const links = [
    "Giới thiệu",
    "Trung tâm trợ giúp",
    "Điều khoản sử dụng",
    "Liên hệ",
];

const cs = [
    "Chính sách bảo mật thông tin",
    "Chính sách giao hàng",
    "Chính sách kiểm hàng",
    "Chính sách thanh toán",
    "Chính sách đổi trả",
]

const Footer = () => {
    return (
        <>
        <div
            className="footer"
        >
            <Box>
                <Typography variant="h6" sx={{padding: '0px 16px'}}>Canteen Haui</Typography>
                <List dense>
                    {links.map((item) => (
                        <ListItem key={item}>
                            <a href="/abc" style={{ textDecoration: "none", color: "rgb(50, 50, 50)"}}><ListItemText primary={item} /></a>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ textAlign: "center"}}>
                <Typography variant="h6" sx={{ textAlign: "left", padding: "0px 16px" }}>Bản quyền</Typography>
                <List dense>
                    {cs.map((item) => (
                        <ListItem key={item}>
                            <a href="/abc" style={{ textDecoration: "none", color: "rgb(50, 50, 50)"}}><ListItemText primary={item} /></a>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <img src="/Logo_DHCNHN.png" alt="logo" height="80px"/>
                <List dense>
                    <ListItem>
                        <ListItemText><Typography variant="h6">Trường đại học Công nghiệp Hà Nội</Typography></ListItemText>
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
        </div>
        <Box sx={{ backgroundColor: "rgb(51, 65, 85)", margin: "0px auto", color: "white", textAlign:"center" }}>
            <div>© 2023 Canteen Haui</div>
        </Box>
        </>
    );
};

export default Footer;
