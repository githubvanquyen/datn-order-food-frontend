import { Container } from '@mui/joy';
import axios from 'axios'
import React from 'react'
import Grid from '@mui/material/Grid';
import FeaturePost from './featurePost';

interface Blog {
  createdAt: string;
  title: string;
  image: string;
  content: string;
}

const Blog = () => {
  const [blogs, setBlogs] = React.useState([]);
  React.useEffect(() =>{
    const fetchBlog = async () =>{
      const blog = await axios.get("http://localhost:4000/api/blog/get-all-blog");
      if(blog.data.success){
        setBlogs(blog.data.data)
      }
    }
    fetchBlog().then()
  },[])
  console.log(blogs);
  
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {
          blogs && blogs.map((blog: Blog) =>(
            <FeaturePost post={blog}/>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Blog