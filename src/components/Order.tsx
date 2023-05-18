import axios from 'axios'
import React, { useRef } from 'react'
import { useAppSelector } from '../redux/hooks'
import {Chip, Container, Grid} from "@mui/material"
import { Thumbnail, Link } from '@shopify/polaris'
import priceFormat from './utils/priceFormat'
interface orderData {
    addressShiping: string
    createdAt: string
    id: number
    methodPayment: string
    note: string
    products: {
        description: string,
        id: number,
        image: string,
        name: string,
        regularPrice: string,
        salePrice: string,
        variants:{
            id: number,
            price: number[],
            title: string,
            value: string[]
        }[]
    }[]
    quantityPerProduct: {
        productId: number,
        quantity: number
    }[],
    statusOrder: string,
    statusPayment: string,
    totalPrice: number,
    totalPricePerProduct: {
        productId: number,
        totalPrice: number
    }[]
    updatedAt: string
    userName : string
    variant: {
        productId: number,
        variantInfo: {
            id: number[],
            index: number[]
        }
    }[],
    discount: {
        name: string,
        id: number
        value: string,
        type: number,
        minimumPrice: string,
        maximumDiscount: string,
        expiredDate: string,
        quantity: number,
    }  
}

const Order = () => {
    const [orders, setOrders] = React.useState<orderData | null>(null)
    const auth = useAppSelector(state => state.auth);
    const [isLoad, setIsLoad] = React.useState(false);
    const newTotalPrice = useRef(0);

    React.useEffect(() =>{
        const fetchOrder = async () =>{
            const order = await axios.get(`http://localhost:4000/api/order/get-order-by-customer?id=${auth.id}`)
            if(order.data.success){
                setOrders(order.data.data[0])
                setIsLoad(true)
            }   
        }
        fetchOrder().then()
    },[isLoad])

    React.useEffect(() =>{
        if(orders && orders.discount){
            if(orders.discount.type === 1){
                const priceSale = Math.floor(orders.totalPrice / 100 * Number(orders.discount.value))
                if(priceSale > Number(orders.discount.maximumDiscount)){
                    newTotalPrice.current = orders.totalPrice - Number(orders?.discount.maximumDiscount);
                }else{
                    newTotalPrice.current =  orders.totalPrice - Math.floor(orders.totalPrice / 100 * Number(orders?.discount.value));
                }
            }else{
                newTotalPrice.current =  orders.totalPrice - Number(orders?.discount.value)
            }
        }
        if(orders && !orders.discount){
            newTotalPrice.current = orders.totalPrice
        }
    },[orders])
    console.log(orders)
    
    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
                {
                     (orders !== null) ? orders.products.map((product: any) =>(
                        <div 
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                            backgroundColor: "#ebebeb",
                            padding: "24px",
                            boxSizing: "border-box",
                            borderRadius: "12px"
                        }} 
                        key={product.id}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} 
                        >
                            <div>
                                <img src={product.image} height="80px"/>
                            </div>
                            <span style={{
                                marginLeft: '20px'
                            }}>
                                <Link url={`/product/${product.id}`}>
                                    {product.name}
                                </Link>
                                {
                                    orders.variant.map((variantProduct: any) =>(
                                        variantProduct.productId == product.id ? variantProduct.variantInfo.id.map((variant: any, index: any) =>(
                                            product.variants.map((item: any) =>{
                                                if(item.id === variant){
                                                    return (
                                                        <div key={item.id}>{item.title}: {item.value[variantProduct.variantInfo.index[index]]}</div> 
                                                    )
                                                }
                                            })
                                        )) : ""
                                    ))
                                }
                            </span>
                            
                        </div>
                        <div>
                            {
                                orders.totalPricePerProduct.map((item: any, index: any) =>(
                                    item.productId === product.id ? `${priceFormat.format(item.totalPrice)} x ${orders.quantityPerProduct[index].quantity}` : ""
                                ))
                            }
                        </div>
                        <div>
                            {
                                orders.totalPricePerProduct.map((item: any, index: any) =>(
                                    item.productId === product.id ? priceFormat.format(item.totalPrice * orders.quantityPerProduct[index].quantity) : ""
                                ))
                            }
                        </div>
                    </div>
                        )) : "Bạn không có đơn hàng nào đang được xử lý"
                }
            <div style={{textAlign:'right', paddingBottom: "20px"}}>
                <span style={{ textAlign: "right", padding: "12px", borderRadius: "6px", backgroundColor:"#ebebeb", fontSize: "20px", fontWeight: "600", marginBottom: "20px"}}>
                    Tổng tiền : {priceFormat.format(Number(newTotalPrice.current))}
                </span>
            </div>
            <div style={{ textAlign: "right"}}>
            <span style={{ marginRight: "12px"}}>
                {
                    (orders !== null)  && ((orders.statusOrder === "-1") ? (<Chip label="Đang chờ xác nhận" variant='filled' color='info'></Chip>) : (
                        orders.statusOrder === "0" ? (<Chip label="Đang giao hàng" variant='filled' color='warning'></Chip>) : (<Chip label="Đã giao hàng" variant='filled' color='success'></Chip>)
                    ))
                }
            </span>
            
            <span>
                {
                    (orders !== null) && ((orders.statusPayment === "-1") ? (<Chip label="Chưa thanh toán" variant='filled' color='info'></Chip>) : (
                    orders.statusPayment === "0") ? "" : (<Chip label="Đã thanh toán" variant='filled' color='success'></Chip>))
                }
            </span>
            </div>
            
        </Container>
    )
}

export default Order