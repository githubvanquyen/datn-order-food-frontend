import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchPopup from './SearchPopup';
import axios from 'axios';
import Divider from '@mui/material/Divider';;
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useAppSelector } from '../redux/hooks';
import { Avatar } from '@mui/material';
import UserPopup from './UserPopup';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
  "& .MuiSvgIcon-root":{
    color: "white"
  }
}));

interface Iproduct {
  id: number,
  name: string,
  image: string,
  description: string,
  regularPrice: string,
  salePrice: string,
}
interface ICollection{
  id: number,
  name: string,
  image: string,
  products: Iproduct[]
}

interface IProductRes {
  success: boolean,
  data: {
      id: number,
      name: string,
      image: string,
      description: string,
      regularPrice: string,
      salePrice: string,
  }[],
  error: {
      field: string,
      message: string,
  },
  message: string,
}

const pagesUrl = ["drinks", "snacks", "fastfood", "flashsale", "blog"];
const pages = ["đồ uống", "ăn vặt", "đồ ăn", "Khuyến mãi", "bài viết"];

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  ml: 1, 
  flex: 1, 
  color: "rgb(0, 0, 0)",
  width: "100%",
  [theme.breakpoints.down('md')]: {
    display: "none"
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  color: "rgb(50,50,50)",
  backgroundColor: "white"
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "rgb(50,50,50)"
}));

const StyledIconButton= styled(IconButton)(({ theme }) => ({
  "svg.MuiSvgIcon-root": {
    color: "rgb(50, 50, 50)"
  }
}));

function Navbar() {
  const navigate = useNavigate()
  const product = useAppSelector((state) => state.product);
  const auth = useAppSelector((state) => state.auth);
  let [inputSearch, setInputSearch] = React.useState("");
  let [openPopup, setOpenPopup] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (index: number) => {
    navigate(`/${pagesUrl[index]}`)
    setAnchorElNav(null);
  };

  const [search, setSearch]= React.useState<Iproduct[]>([{
    id: 0,
    name: "",
    image: "",
    description: "",
    regularPrice: "",
    salePrice: ""
  }])

  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.indexOf(" ") !== -1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`: `${name[0]}${name[name.length - 1]}`,
    };
  }

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setInputSearch(e.target.value);
    const fetchSearchData = async () =>{
      const response = await axios.get<IProductRes>(`http://localhost:4000/api/product/get-product-by-name?name=${inputSearch}`)
      if(response.data.success){
        setSearch(response.data.data)
      }
    }
    fetchSearchData().then()
  }
  
  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/Logo_DHCNHN.png" alt="Logo" height="60px"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              marginRight: "20px",
              textDecoration: 'none',
            }}
          >
            CĂNG TIN DHCNHN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {setAnchorElNav(null)}}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <StyledMenuItem key={page} onClick={() => handleCloseNavMenu(index)}>
                  <Typography textAlign="center" sx={{ color: "rgb(50, 50, 50)"}}>{page}</Typography>
                </StyledMenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CĂNG TIN HAUI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(index)}
                sx={{ my: 2, color: 'rgb(50,50,50)', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ position: "relative" }}>
            <Box sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <StyledInputBase
                  value={inputSearch}
                  onChange={(e) => handleChangeInputSearch(e)}
                  placeholder="Tìm kiếm…"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <StyledIconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon sx={{ color: "white" }}/>
                </StyledIconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Box>
            <SearchPopup open={inputSearch !== ""} data={search}/>
          </Box>
          <StyledIconButton aria-label="cart" onClick={() =>{ navigate("/cart")}}>
            <StyledBadge badgeContent={product.length} color="warning">
              <ShoppingCartIcon />
            </StyledBadge>
          </StyledIconButton>
          <Box sx={{ flexGrow: 0, marginLeft: '2rem', position: 'relative' }}>
            {
              auth.isAuthenticated ? <Avatar {...stringAvatar(auth.username.slice(0,2) + auth.username[auth.username.length - 1])} sx={{cursor: "pointer"}} onClick={()=>{setOpenPopup((pre) => !pre)}}/> : <Button color="inherit" onClick={()=>{navigate("/login")}}>Login</Button>
            } 
            <UserPopup open={openPopup} data={auth}/>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
export default Navbar