import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAppSelector } from '../../redux/hooks';
import priceFormat from '../utils/priceFormat';
import { Box, createTheme } from '@mui/material';

const theme = createTheme();


export default function Review() {
    const products = useAppSelector(state => state.product);
    const discount = useAppSelector(state => state.discount);
    const total = React.useRef(0);
    products.map((product) =>{
        total.current += product.quantity * product.productPrice
    })
    let newTotalPrice;
    if(discount?.type === 1){
        const priceSale = Math.floor(total.current / 100 * Number(discount.value))
        if(priceSale > Number(discount.maximumDiscount)){
            newTotalPrice = total.current - Number(discount.maximumDiscount);
        }else{
            newTotalPrice =  total.current - Math.floor(total.current / 100 * Number(discount.value));
        }
    }else{
        newTotalPrice =  total.current - Number(discount.value)
    }
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Danh sách đồ ăn
        </Typography>
        <List disablePadding>
            {products.map((product) => (
            <ListItem key={product.productId} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.product.name} secondary={
                    product.variantInfo.id.map((variant, index) =>(
                        product.product.variants.map((item) =>{
                            if(item.id === variant){
                                return (
                                    <Box key={item.id}>{item.title}: {item.value[product.variantInfo.index[index]]}</Box> 
                                )
                            }
                        })
                    ))
                } />
                <Typography variant='body1' color={theme.palette.text.secondary}>
                    { priceFormat.format(product.productPrice)}
                    <span style={{ margin: "0px 4px" }}>x</span>
                    <span>{product.quantity}</span>
                    <span style={{ marginLeft: "4px", fontWeight: "600"}}>{priceFormat.format(product.productPrice * product.quantity)}</span>
                </Typography>
            </ListItem>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Giảm giá" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {discount.id !== 0 && discount.name}
            </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Tổng" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {priceFormat.format(newTotalPrice)}
            </Typography>
            </ListItem>
        </List>
        </React.Fragment>
    );
}