import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import priceFormat from './utils/priceFormat';

interface Iproduct{
    id: number
    name: string
    image: string
    description: string
    regularPrice: string
    salePrice: string
    collection: [],
}
interface FlashsaleRes{
  data:{
      success: boolean,
      message: string,
      data: {
          dateEnd: string,
          dateStart: string,
          discountType: number,
          discountValue: string,
          id: number,
          products: Iproduct[]
      }
  }
}

export default function Home() {

    const navigate = useNavigate()
  const [products, setProduct] = React.useState<Iproduct[]>([{
    id: 0,
    name: "",
    image: "",
    description: "",
    regularPrice: "",
    salePrice: "",
    collection: [],
  }])

  const [inforDiscount, setInfoDiscount] = React.useState({
    dateEnd: "",
    dateStart: "",
    discountType: 1,
    discountValue: "",
    id: 0,
  })
  const [productsFls, setProductsFls] = React.useState<Number[]>([])

  React.useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get("http://localhost:4000/api/product/get-all-product")
      const responseFls = await axios.get<any, FlashsaleRes>(`http://localhost:4000/api/flashsale/get-flashsale-datenow`)
      if(response.data.success){
        setProduct(response.data.data);
      }
      if(responseFls.data.success){
          setInfoDiscount({
              dateEnd: responseFls.data.data.dateEnd,
              dateStart: responseFls.data.data.dateStart,
              discountType: responseFls.data.data.discountType,
              discountValue: responseFls.data.data.discountValue,
              id: responseFls.data.data.id,
          })
          setProductsFls(responseFls.data.data.products.map((item) => item.id));
      }
    }
    fetchData().then()
  },[])

  const handleChangeDetailProduct = (id: number) =>{
    navigate(`/product/${id}`);
  }
  return (
      <main>
        <div style={{ display: "flex", backgroundColor: "#fdd255" }}>
            <img src='/banner.webp' width="60%"/>
            <div className='banner-container'>
              <div className='banner-title'>
                <div className='banner-title-p'>
                  Món Ngon Tận Cửa
                </div>
                <div className='banner-title-sub'>
                  Đồ Ăn Ngon Ship Đến Tận Nơi
                </div>
              </div>
              <div className='banner-button'>
                <button >Đặt món ngay</button>
              </div>
            </div>
        </div>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container  spacing={4}>
            <Grid item xs={12} sm={6} md={12}>
              <Typography variant='h5'>Khuyến mãi</Typography>
              <div>Khám phá nhiều ưu đãi hấp dẫn</div>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            {products && products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3} height="350px">
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    height="50%"
                    image={product.image}
                    alt="random"
                  />
                  <div onClick={() => handleChangeDetailProduct(product.id)} className='product-card-content'>
                    <CardContent sx={{ flexGrow: 1, cursor: "pointer" }}>
                      <Typography gutterBottom  sx={{ textTransform: "uppercase", fontWeight: "600" }}>
                        {product.name}
                      </Typography>
                      <Typography color="rgb(50, 50, 50)">
                        {product.description.length > 50 ? product.description.slice(0, 50) + "..." : product.description}
                      </Typography>
                    </CardContent>
                    <CardContent sx={{ textTransform: "uppercase" }}>
                      <span style={{ fontSize: "19px", color: "#9a3a38", fontWeight: "600" }}>
                        {
                          (productsFls.length > 0 && productsFls.indexOf(product.id) !== -1) ? ((inforDiscount.discountType === 1 ? (priceFormat.format(Number(product.salePrice) - Math.floor(Number(product.salePrice) / 100 * Number(inforDiscount.discountValue)))
                          ): (priceFormat.format(Number(Number(product.salePrice) - Number(inforDiscount.discountValue)))))) : priceFormat.format(Number(product.salePrice))
                        }
                      </span>
                      <span style={{ textDecoration: "line-through", marginLeft: "12px" }}>
                        {priceFormat.format(Number(product.regularPrice))}
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={4} mt={8}>
            <div className='recommend'>
            <div>
              <div className='home-title'>Không đợi chờ</div>
              <div className='home-content'>
                Thưởng thức món ăn yêu thích tại địa điểm yêu thích trong vòng 30 phút!
              </div>
            </div>
            <div>
              <div className='home-title' >Thanh toán linh hoạt</div>
              <div className='home-content'>
              Thanh toán dễ dàng với tiền mặt hoặc các phương thức thanh toán trực tuyến phổ biến.
              </div>
            </div>
            <div>
              <div className='home-title'>Tận hưởng dịch vụ</div>
              <div className='home-content'>
                Món ăn đa dạng, đặt hàng dễ dàng, theo dõi đơn tiện lợi, đổi trả món nhanh chóng.
              </div>
            </div>
            </div>
          </Grid>
        </Container>
      </main>
      
  );
}