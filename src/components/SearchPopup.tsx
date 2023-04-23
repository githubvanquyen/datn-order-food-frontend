import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import "../App.css";

interface searchPopupProps {
  open: boolean,
  data: {
    id: number,
    name: string,
    image: string,
    description: string,
    regularPrice: string,
    salePrice: string,
  }[]
}

export default function SearchPopup({open, data}: searchPopupProps) {
  const navigate = useNavigate();
  return (
    <>
    <List 
      sx={{ 
      width: '100%', 
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
      <Typography variant='body1' style={{ color: "black", marginLeft: "16px"}}>Kết quả</Typography>
      {
        data.map((item) =>(
          <ListItem key={item.id} onClick={() =>{navigate(`/product/${item.id}`)}} className='list_search'>
            <ListItemAvatar>
              <Avatar src={`${item.image}`}/>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.salePrice} sx={{ color: "black"}} />
          </ListItem>
        ))
      }
    </List>
    </>
  );
}