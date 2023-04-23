import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/joy/Radio';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addOrder } from '../../redux/slide/orderSlider';

export default function PaymentForm() {
    const order = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(addOrder({methodPayment: event.target.value}))
    };
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Phương thức thanh toán
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
                <input
                    type='radio'
                    checked={order.methodPayment === '0'}
                    onChange={handleChange}
                    value="0"
                    name="methodPayment"
                />
                Thanh toán tiền mặt
            </Grid>
            <Grid item xs={12} md={7}>
                <input
                    type='radio'
                    checked={order.methodPayment === '1'}
                    onChange={handleChange}
                    value="1"
                    name="methodPayment"
                />
                Thanh toán qua ví điện tử MOMO
            </Grid>
        </Grid>
        </React.Fragment>
    );
}