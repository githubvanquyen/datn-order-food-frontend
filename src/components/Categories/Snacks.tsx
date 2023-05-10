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

export default function Snacks() {

    const navigate = useNavigate()
    const [collection, setCollection] = React.useState<ICollection>({
        id: 0,
        name: "",
        image: "",
        products: []
    })
    const [inforDiscount, setInfoDiscount] = React.useState({
        dateEnd: "",
        dateStart: "",
        discountType: 1,
        discountValue: "",
        id: 0,
    })
    const [products, setProducts] = React.useState<Number[]>([])

    React.useEffect(() =>{
        const fetchData = async () =>{
        const response = await axios.get(`http://localhost:4000/api/collection/get-collection-by-id?id=${2}`)
        const responseFls = await axios.get<any, FlashsaleRes>(`http://localhost:4000/api/flashsale/get-flashsale-datenow`)
        if(responseFls.data.success){
            setInfoDiscount({
                dateEnd: responseFls.data.data.dateEnd,
                dateStart: responseFls.data.data.dateStart,
                discountType: responseFls.data.data.discountType,
                discountValue: responseFls.data.data.discountValue,
                id: responseFls.data.data.id,
            })
            setProducts(responseFls.data.data.products.map((item: IProduct) => item.id));
        }
        
        if(response.data.success){
            setCollection(response.data.data);
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
                <Grid item xs={12} sm={6} md={12}>
                    <Typography variant='h5'>Đồ ăn vặt</Typography>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                {collection && collection.products.map((product) => (
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
                                (products.indexOf(product.id) !== -1) ? ((inforDiscount.discountType === 1 ? (priceFormat.format(Number(product.salePrice) - Math.floor(Number(product.salePrice) / Number(inforDiscount.discountValue)))
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
            </Container>
        </main>
    );
}