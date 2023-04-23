import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import priceFormat from './utils/priceFormat';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../redux/slide/productSlide';
import { useNavigate } from 'react-router-dom';
import Textarea from '@mui/joy/Textarea';

interface productState {
    productId: number,
    product: {
        id: number;
        name: string;
        image: string;
        description: string;
        regularPrice: string;
        salePrice: string;
        collection: {
            id: number;
            name: string;
        };
        variants: {
            id: number;
            title: string;
            value: string[];
            price: number[];
        }[];
    }
    variantInfo:{
        id: number[];
        index: number[];
    }
    productPrice: number,
    quantity: number,
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // color: theme.palette.text.secondary,
    padding: 12,
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }));

const Cart = () => {
    const products:productState[] = useAppSelector((state) => state.product);
    const [totalPrice, setTotalPrice] = React.useState(0)
    console.log(products);
    const dispatch = useAppDispatch();
    const theme = createTheme();
    const navigate = useNavigate();

    React.useEffect(() => {
        let total = 0;
        products.map((product) =>{
            total += product.quantity * product.productPrice
        })
        setTotalPrice(total)
    }, [products])
    
    
    
  return (
        products.length > 0 ? <Container sx={{ py: 8 }} maxWidth="lg">
        {
            products.map((product) =>(
            <Item elevation={6} key={product.productId}>
                <Box sx={{ display: 'flex' }}>
                    <img src={`${product.product.image}`} alt={product.product.name} width={100} style={{ borderRadius: "4px"}}/>
                    <Box sx={{ marginLeft: "24px"}}>
                        <Typography variant='h5'>
                            {product.product.name}
                        </Typography>
                        <Typography variant='body1' color={theme.palette.text.secondary}>
                            { priceFormat.format(product.productPrice)}
                            <span style={{ margin: "0px 4px" }}>x</span>
                            <span>{product.quantity}</span>
                            <span style={{ color: "rgb(210, 63, 87)", marginLeft: "4px", fontWeight: "600"}}>{priceFormat.format(product.productPrice * product.quantity)}</span>
                        </Typography>
                        <Typography variant='body2' color={theme.palette.text.secondary}>
                            {
                                product.variantInfo.id.map((variant, index) =>(
                                    product.product.variants.map((item) =>{
                                        if(item.id === variant){
                                            return (
                                                <Box>{item.title} : {item.value[product.variantInfo.index[index]]}</Box> 
                                            )
                                        }
                                    })
                                ))
                            }
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ display:"flex", alignItems: "center" }}>
                    <IconButton aria-label='plus quantity' onClick={() =>{ dispatch(decreaseQuantity({id: product.productId}))}}>
                        <RemoveIcon/>
                    </IconButton>
                    <span 
                        style={{ 
                            margin:"0px 4px", 
                            fontWeight: "600", 
                            fontSize: "18px",
                        }}
                    >{product.quantity}</span>
                    <IconButton aria-label='minus quantity' onClick={() =>{ dispatch(increaseQuantity({id: product.productId}))}}>
                        <AddIcon/>
                    </IconButton>
                </Box>
                <Box>
                    <IconButton aria-label="delete" onClick={() =>{ dispatch(deleteProduct({id: product.productId}))}}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Item>
            ))
        }
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
            <Box>
                <Paper sx={{ padding: "24px", marginBottom: "12px" }} elevation={6}>
                    <span style={{ fontSize: "18px", fontWeight: "600"}}>Tổng tiền: </span>{priceFormat.format(totalPrice)}
                </Paper>
                <Button fullWidth variant='contained' size="large" onClick={()=>{navigate("/checkout")}}>Đặt hàng</Button>
            </Box>
        </Box>
    </Container> :
    (
        <Container>
            <Typography variant='h4' sx={{ textAlign:"center", padding: "200px 0px" }}>Giỏ hàng rỗng</Typography>
        </Container>
    )
  )
}

export default Cart