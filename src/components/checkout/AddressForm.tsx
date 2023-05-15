import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addOrder } from '../../redux/slide/orderSlider';

export default function AddressForm() {
  const user =  useAppSelector(state => state.auth);
  const order = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    if(user.isAuthenticated){
      dispatch(addOrder({
        userName: user.username,
        phoneNumber: user.phoneNumber
      }))
    }
  },[])
  
  const handleChangeInput =  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      dispatch(addOrder({[e.target.name]: e.target.value}));
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Địa chỉ
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="username"
            label="Họ tên"
            value={order.userName}
            onChange={(e) => {dispatch(addOrder({userName: e.target.value}))}}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Số điện thoại"
            value={order.phoneNumber}
            onChange={(e) => {dispatch(addOrder({phoneNumber: e.target.value}))}}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id=""
            name="building"
            label="Tòa"
            value={order.building}
            onChange={(e) => {dispatch(addOrder({building: e.target.value}))}}
            fullWidth
            autoComplete="building"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id=""
            name="floor"
            label="Tầng"
            value={order.floor}
            onChange={(e) => {dispatch(addOrder({floor: e.target.value}))}}
            fullWidth
            autoComplete="floor"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id=""
            name="room"
            label="Phòng học"
            value={order.room}
            onChange={(e) => {dispatch(addOrder({room: e.target.value}))}}
            fullWidth
            autoComplete="room"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}