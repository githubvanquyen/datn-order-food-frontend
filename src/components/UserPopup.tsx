import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slide/authSlide';

interface UserPopupProps {
  open: boolean,
  data: {
    id: number
    username: string
    accessToken: string
    isAuthenticated: boolean,
  }
}

export default function UserPopup({open, data}: UserPopupProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () =>{
    dispatch(logout({}))
    navigate("/login")
  }

  return (
    <>
    <List 
      sx={{ 
      width: '200px', 
      bgcolor: 'background.paper', 
      position: "absolute", 
      top: '60px', 
      right: "0px", 
      display: `${open ? "block" :"none"}`,
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      borderRadius: "4px",
      zIndex: 10,
      cursor: "pointer"
    }}>
        <ListItem onClick={() =>{navigate(`/order`)}} className='list_search'>
          <ListItemText primary="Đơn hàng đã đặt" sx={{ color: "black"}} />
        </ListItem>
        <ListItem onClick={() =>{handleLogout()}} className='list_search'>
          <ListItemText primary="Đăng xuất" sx={{ color: "black"}} />
        </ListItem>
    </List>
    </>
  );
}