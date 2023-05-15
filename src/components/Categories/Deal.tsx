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
import { useLocation, useNavigate } from "react-router-dom"
import priceFormat from '../utils/priceFormat';
import dateFormat from '../utils/dateFormat';

interface ICollection{
    id: number,
    name: string,
    image: string,
    products: IProduct[]
}

interface IProduct{
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
            products: IProduct[]
        }
    }
}

export default function Deal() {
    const navigate = useNavigate()
    const [inforDiscount, setInfoDiscount] = React.useState({
        dateEnd: "",
        dateStart: "",
        discountType: 1,
        discountValue: "",
        id: 0,
    })
    const [products, setProducts] = React.useState<IProduct[]>([{
        id: 0,
        name: "",
        image: "",
        description: "",
        regularPrice: "",
        salePrice: "",
        collection: []
    }])

    React.useEffect(() =>{
        const fetchData = async () =>{
        const response = await axios.get<any, FlashsaleRes>(`http://localhost:4000/api/flashsale/get-flashsale-datenow`)
        if(response.data.success){
            setInfoDiscount({
                dateEnd: response.data.data.dateEnd,
                dateStart: response.data.data.dateStart,
                discountType: response.data.data.discountType,
                discountValue: response.data.data.discountValue,
                id: response.data.data.id,
            })
            setProducts(response.data.data.products);
        }
        }
        fetchData().then()
    },[])

    const handleChangeDetailProduct = (id: number) =>{
        navigate(`/product/${id}`);
    }
    return (
        <main>
            <Container sx={{ py: 8 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container  spacing={4}>
                {
                    products.length >= 1 && products[0].id !== 0 ? (<Grid item xs={12} sm={6} md={12}>
                        <Typography variant='h5'>Khuyến mãi (Flash sale từ {dateFormat(inforDiscount.dateStart)} đến {dateFormat(inforDiscount.dateEnd)})</Typography>
                        <div>Khám phá nhiều ưu đãi hấp dẫn nhanh tay khẻo lỡ</div>
                    </Grid>) : null
                }   
                <Grid item xs={12} sm={6} md={12}>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
            {products.length >= 1 && products[0].id !== 0 && products.map((product) => (
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
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardContent sx={{ textTransform: "uppercase" }}>
                      <span style={{ fontSize: "19px", color: "#9a3a38", fontWeight: "600" }}>
                        {
                            (inforDiscount.discountType === 1 ? (priceFormat.format(Number(product.salePrice) - Math.floor(Number(product.salePrice) / 100 * Number(inforDiscount.discountValue)))
                            ): (priceFormat.format(Number(Number(product.salePrice) - Number(inforDiscount.discountValue)))))
                            
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
            </Container>
        </main>
    );
}