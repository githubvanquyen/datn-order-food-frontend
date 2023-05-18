import React , { useState, useEffect } from 'react'
import {
    Box, 
    TextField, 
    List, 
    ListItem, 
    ListItemAvatar,
    Avatar, 
    ListItemText, 
    Typography,
    Divider,
} from "@mui/material"
import axios from 'axios';
import { useAppSelector } from '../../redux/hooks';

interface commentReq {
    image: any,
    description: string,
    productId: number,
    userId: number,
    rate: number,
}

interface commentRes {
    id: number,
    image: string,
    description: string,
    product: {},
    user: {
        firstName: string,
        lastName: string
    },
    rate: number,
}

interface props{
    productId: number
}
const index = ({productId}:props) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState({
        field: "",
        message: ""
    })
    const [comment, setComment] = useState<commentRes[]>([{
        id: 0,
        image: "",
        description: '',
        product: {},
        user: {
            firstName: "",
            lastName: ""
        },
        rate: 0,
    }]);
    const [isCommented, setIsCommented] = useState(false);
    const auth = useAppSelector(state => state.auth);

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setInput(e.target.value);
    }

    const  handleSubmitComment = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const response = await axios.post<any, any, commentReq>("http://localhost:4000/api/comment/create",{
            image: "",
            description: input,
            productId: productId,
            userId: auth.id,
            rate: 5
        })
        if(response.data.success){
            setIsCommented((pre) => !pre);
            setInput("")
        }else{
            setError({
                field: response.data.error.field,
                message: response.data.error.message,
            })
            alert("Bạn cần đăng nhập để sử dụng tính năng này")
        }
    }   
    useEffect(() =>{
        const fetchComment = async () =>{
            const response = await axios.get(`http://localhost:4000/api/comment/get-comment-product?productId=${productId}`)
            if(response.data.success){
                setComment(response.data.data);
            }
        }
        fetchComment().then()
    },[isCommented])

    return (
        <Box sx={{ padding: "24px 12px" }}>
            <form onSubmit={(e) => handleSubmitComment(e)}>
                <TextField 
                    fullWidth 
                    variant='standard' 
                    value={input} 
                    onChange={changeInput} 
                    placeholder='Bình luận về món ăn'
                />
            </form>
            <Box>
            <List sx={{ width: '100%' }}>
                {
                    comment[0].id !== 0 && comment.map((item) =>(
                        <React.Fragment key={item.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="user"/>
                            </ListItemAvatar>
                            <ListItemText
                            primary={item.user.firstName + item.user.lastName}
                            secondary={
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {item.description}
                                </Typography>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))
                }
            </List>
            </Box>
        </Box>
    )
}

export default index