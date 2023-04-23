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

export default function Collection() {

    const navigate = useNavigate()
  const [collections, setCollections] = React.useState<ICollection[]>([{
    id: 0,
    name: "",
    image: "",
    products: []
  }])

  React.useEffect(() =>{
    const fetchData = async () =>{
      const response = await axios.get("http://localhost:4000/api/collection/get-all-collection")
      if(response.data.success){
        setCollections(response.data.data);
      }
    }
    fetchData().then()
  },[])

  const handleChangeDetailProduct = (id: number) =>{
    navigate(`/collection/${id}`);
  }
  return (
      <main>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {collections && collections.map((collection) => (
              <Grid item key={collection.id} xs={12} sm={6} md={3} height="400px">
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    height="50%"
                    image={collection.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6">
                      {collection.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleChangeDetailProduct(collection.id)}>Chi tiết</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
  );
}