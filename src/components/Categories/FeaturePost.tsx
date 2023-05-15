import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface FeaturedPostProps {
  post: {
    createdAt: string;
    title: string;
    image: string;
    content: string;
  };
}
const dateFormat = (d: string) =>{
    const date = new Date(d);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() +  ": " + (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes())
}


export default function FeaturePost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {dateFormat(post.createdAt)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.content}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Đọc tiếp
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}