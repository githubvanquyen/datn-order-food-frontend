import * as React from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { createTheme, styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Rating from '@mui/material/Rating';
import "../App.css";
import { addProduct } from "../redux/slide/productSlide";
import { useAppDispatch } from "../redux/hooks";
import priceFormat from "./utils/priceFormat";
import Comment from "./comment"


const StyledButton = styled(Button)(({theme}) => ({
    color: "#be6843",
    borderColor: "#be6843",
    ":hover" :{
        borderColor: "#be6843",
        backgroundColor: "rgba(211, 96, 29, 0.04)"
    }
}));

const StyledButtonAdd = styled(Button)(({theme}) => ({
    color: "#fff",
    borderColor: "#be6843",
    backgroundColor: "#be6843",
    ":hover" :{
        borderColor: "#be6843",
        backgroundColor: "#be6843"
    }
}));

const StyledCheckbox = styled(Checkbox)(({theme}) => ({
    "&.Mui-checked": {
        color: "#be6843"
    }
}));


interface Iproduct {
    id: number;
    name: string;
    image: string;
    description: string;
    regularPrice: string;
    salePrice: string;
    collection: {
        id: number;
        name: string;
    };
    variants: {
        id: number;
        title: string;
        value: string[];
        price: number[];
    }[];
}

interface IProductRes {
    success: boolean;
    data: {
        id: number;
        name: string;
        image: string;
        description: string;
        regularPrice: string;
        salePrice: string;
        collection: {
            id: number;
            name: string;
        };
        variants: [{
            id: number;
            title: "";
            value: "";
            price: "";
        }];
    };
    error: {
        field: string;
        message: string;
    };
    message: string;
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
const theme = createTheme();

export default function DetaiProduct() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const pathNames = location.pathname.split("/");
    const id = pathNames[pathNames.length - 1];
    const [products, setProduct] = React.useState<Iproduct>({
        id: 0,
        name: "",
        image: "",
        description: "",
        regularPrice: "",
        salePrice: "",
        collection: {
            id: 0,
            name: "",
        },
        variants: [
            {
                id: 0,
                title: "",
                value: [""],
                price: [0],
            },
        ],
    });

    const [priceProduct, setPriceProduct] = React.useState(0);
    const [variantInfo, setVariantInfo] = React.useState<{id: number[], index: number[]}>({
        id: [],
        index: []
    });
    const [value, setValue] = React.useState<number | null>(4);


    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<IProductRes>(
                `http://localhost:4000/api/product/get-product-by-id?id=${id}`
            );
            const responseFls = await axios.get<any, FlashsaleRes>(`http://localhost:4000/api/flashsale/get-flashsale-datenow`)
            if (response.data.success) {
                const product = response.data.data;
                setProduct({
                    ...product,
                    variants: product.variants.map((item) => ({
                        ...item,
                        value: JSON.parse(item.value) as string[],
                        price: JSON.parse(item.price) as number[],
                    })),
                });
                const productFlashSale = responseFls.data.data !== null ? responseFls.data.data.products.map((item) => item.id) : [];
                setPriceProduct((productFlashSale.length > 0 && productFlashSale.indexOf(product.id) !== -1) ? ((responseFls.data.data.discountType === 1 ? (Number(product.salePrice) - Math.floor(Number(product.salePrice) / Number(responseFls.data.data.discountValue)))
                : (Number(product.salePrice) - Number(responseFls.data.data.discountValue)))) : Number(product.salePrice));
            }
        };
        fetchData().then();
    }, [id]);

    const handleChangeVariant = (e: React.ChangeEvent<HTMLInputElement>, id: number, index: number,  priceVariant: number) =>{
        if(e.target.checked){
            setPriceProduct((pre) => (pre + priceVariant))
            setVariantInfo((pre) => ({
                id: [...pre.id, id],
                index: [...pre.index, index]
            }))
        } else {
            setPriceProduct((pre) => (pre - priceVariant))
            variantInfo.id.forEach((item, i) =>{
                if(item === id && variantInfo.index[i] === index){
                    variantInfo.id.splice(i, 1)
                    variantInfo.index.splice(i, 1)
                    setVariantInfo({
                        id: variantInfo.id,
                        index: variantInfo.index
                    })
                }
            })
            
        }
    }

    const handleClickAddToCart = () =>{
        dispatch(addProduct({ productId: products.id, product: products, variantInfo: variantInfo, productPrice: priceProduct, quantity: 1}))
    }

    return (
        <main>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box>
                            <CardMedia
                                component="img"
                                width="100%"
                                image={products.image}
                                alt="image-product"
                            />
                        </Box>
                        <Box>
                            <Comment productId={Number(id)}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Stack spacing={2}>
                            <Typography
                                component={"h3"}
                                sx={{ fontSize: "30px", fontWeight: "700" }}
                            >
                                {products.name}
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Typography component="legend"> 
                                    {products.description}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "600"
                                }}
                            >
                                {priceFormat.format(priceProduct)}
                            </Typography>
                            
                            <Typography>
                                <Box>
                                    {products.variants.map((variant) => {
                                        return (
                                            <div key={variant.title}>
                                                <span
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {variant.title}
                                                </span>
                                                <FormGroup
                                                    sx={{ paddingLeft: "30px" }}
                                                >
                                                    {variant.value.map(
                                                        (item: string, index) => {
                                                            return (
                                                                <div key={item} className="list_variant">
                                                                    <FormControlLabel
                                                                        control={
                                                                            <StyledCheckbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeVariant(e, variant.id, index, variant.price[index])}/>
                                                                        }
                                                                        sx={{ width: "1000%"}}
                                                                        label={item}
                                                                    />
                                                                    <div style={{ textAlign: "right" , flex : 1 }}>
                                                                        {priceFormat.format(variant.price[index])}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </FormGroup>
                                            </div>
                                        );
                                    })}
                                </Box>
                            </Typography>
                            
                            <Stack spacing={2}>
                                <StyledButton variant="outlined" size="large" onClick={() =>handleClickAddToCart()}>Thêm vào giỏ hàng</StyledButton>
                                <StyledButtonAdd variant="contained" size="large">Mua ngay</StyledButtonAdd>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}
