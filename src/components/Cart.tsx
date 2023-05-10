import React from 'react'
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DiscountIcon from '@mui/icons-material/Discount';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import priceFormat from './utils/priceFormat';
import { IconButton, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../redux/slide/productSlide';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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

const StyledButton = styled(Button)(({theme}) =>({
    color: "#fff",
    borderColor: "#be6843",
    backgroundColor: "#be6843",
    ":hover" :{
        borderColor: "#be6843",
        backgroundColor: "#be6843"
    }
}))

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 2,
};

interface Discount{
    id: number
    name: string,
    value: string,
    type: number,
    minimumPrice: string,
    maximumDiscount: string,
    expiredDate: string,
    quantity: number,
    products: [],
    customers: []
}

interface DiscountRes {
    data:{
        success: boolean,
        data: Discount[],
        message: string
    }
}

const Cart = () => {
    const products:productState[] = useAppSelector((state) => state.product);
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [open, setOpen] = React.useState(false);
    const [discountAdded, setDiscountAdded] =  React.useState<Discount | null>(null);
    const [discounts, setDiscounts] = React.useState<Discount[]>([]);
    const [discountStatus, setDiscountState] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
    
    React.useEffect(() => {
        const fetchDiscount = async () =>{
            const response = await axios.get<any, DiscountRes>("http://localhost:4000/api/discount/get-all-discount");
            if(response.data.success){
                setDiscounts(response.data.data);
            }
        }
        fetchDiscount().then()
    }, [])
    const handleAddDiscount = (id: number) =>{
        const discountSelected = discounts.filter(item => item.id === id);
        setDiscountAdded(discountSelected[0]);
        setDiscountState(true);
        let newTotalPrice = 0;
        if(discountSelected && discountSelected.length > 0 && !discountStatus) {
            if(discountAdded?.type === 1){
                const priceSale = Math.floor(totalPrice / Number(discountSelected[0].value))
                if(priceSale > Number(discountSelected[0].maximumDiscount)){
                    newTotalPrice = totalPrice - Number(discountSelected[0].maximumDiscount);
                }else{
                    newTotalPrice =  totalPrice - Math.floor(totalPrice / Number(discountSelected[0].value));
                }
            }else{
                newTotalPrice =  totalPrice - Number(discountSelected[0].value)
            }
            setTotalPrice(newTotalPrice)
        }
    }
  return (
        products.length > 0 ? <Container sx={{ py: 8 }} maxWidth="lg">
        {
            products.map((product) =>(
            <Item elevation={2} key={product.productId}>
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
                                                <Box>{item.title}: {item.value[product.variantInfo.index[index]]}</Box> 
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
        <Box>
            <Box>
                <Paper sx={{ padding: "24px", marginBottom: "16px" }} elevation={2}>
                    <span style={{ fontSize: "18px", fontWeight: "600"}}>Tổng tiền: {priceFormat.format(totalPrice)}</span>
                    <div>
                        Ghi chú <br/>
                        <textarea cols={25} rows={4}/>
                    </div>
                    <div>
                        <Button onClick={handleOpen}>Chọn mã giảm giá</Button>
                    </div>
                    
                </Paper>
                <StyledButton fullWidth variant='contained' size="large" onClick={()=>{navigate("/checkout")}}>Đặt đơn</StyledButton>
            </Box>
        </Box>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...styleModal, width: 500 }}>
            <h2 id="child-modal-title">Mã giảm giá</h2>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    discounts && discounts.map((discount) =>(
                        <div key={discount.id}>
                        <ListItem onClick={()=>{handleAddDiscount(discount.id)}} sx={{ cursor: "pointer" }}>
                            <ListItemAvatar>
                            <Avatar>
                                <DiscountIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${discount.name} : Giảm tối đa ${priceFormat.format(Number(discount.maximumDiscount))} cho đơn từ ${priceFormat.format(Number(discount.minimumPrice))}`} secondary={discount.expiredDate} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </div>
                    ))
                }
            </List>
            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                <Button onClick={handleClose} variant='contained'>Đóng</Button>
            </div>
            </Box>
        </Modal>
    </Container> :
    (
        <Container>
            <Typography variant='h4' sx={{ textAlign:"center", padding: "200px 0px" }}>Giỏ hàng rỗng</Typography>
        </Container>
    )
  )
}

export default Cart