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
import { styled, alpha } from '@mui/material/styles';

interface Iproduct {
  id: number,
  name: string,
  image: string,
  description: string,
  regularPrice: string,
  salePrice: string,
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
const pages = ['Danh mục', 'sale', 'Bài viết'];
const pagesUrl = ['collection', 'sale', 'blog'];

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  ml: 1, 
  flex: 1, 
  color: "white",
  width: "100%",
  [theme.breakpoints.down('md')]: {
    display: "none"
  },
}));

function Navbar() {
  const navigate = useNavigate()
  let [inputSearch, setInputSearch] = React.useState("");
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
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
                <MenuItem key={page} onClick={() => handleCloseNavMenu(index)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
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
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(index)}
                sx={{ my: 2, color: 'white', display: 'block' }}
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
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Box>
            <SearchPopup open={inputSearch !== ""} data={search}/>
          </Box>
          <Button onClick={() =>{navigate("/cart")}}>
              <ShoppingCartIcon color='disabled'/>
          </Button>
          <Box sx={{ flexGrow: 0, marginLeft: '2rem' }}>
            <Button color="inherit" onClick={()=>{navigate("/login")}}>Login</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar