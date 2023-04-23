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

interface Iproduct{
    id: number
    name: string
    image: string
    description: string
    regularPrice: string
    salePrice: string
    collection: [],
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

  React.useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get("http://localhost:4000/api/product/get-all-product")
      if(response.data.success){
        setProduct(response.data.data);
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
          <Grid container spacing={4}>
            {products && products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3} height="400px">
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    height="50%"
                    image={product.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleChangeDetailProduct(product.id)}>Chi tiết</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
  );
}