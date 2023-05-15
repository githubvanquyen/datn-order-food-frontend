import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../redux/slide/orderSlider';
import { addProduct, clearProduct } from '../../redux/slide/productSlide';

const steps = ['Địa chỉ giao hàng', 'Chi tiết đơn hàng' , 'Phương thức thanh toán'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const order = useAppSelector(state => state.order);
  const products = useAppSelector(state => state.product);
  const user = useAppSelector(state => state.auth);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if(activeStep === 2){
        const createPaymentResponse =  await axios.post("http://localhost:4000/api/payment/create",{
            username: order.userName,
            address: order.building + " " + order.floor + " " + order.room,
            products: products,
            methodPayment: order.methodPayment,
            user: user.accessToken,
            userName: order.userName,
            note: order.note,
        })
        if(createPaymentResponse.data.success){
          if(createPaymentResponse.data.data.methodPayment === "1"){
            window.open(createPaymentResponse.data.dataPayment.shortLink,"_blank");
          }
          dispatch(addOrder({note: ""}))
          dispatch(clearProduct({}))
        }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <main>
      <Container component="main" maxWidth="sm" sx={{ py: 5 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Đặt hàng
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Đặt hàng thành
              </Typography>
              <Typography variant="subtitle1">
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay lại
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Đặt hàng' : 'Tiếp'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </main>
  );
}
