"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CupPrice, PriceByPrice, SheetPrice, TShirtPrice, deliveryPriceConst, getPrice } from '@/lib/price';
import { useCart } from '@/store/cart';
import { useSheet } from '@/store/customSheet';
import { Minus, Plus, X } from 'lucide-react';
import { Caprasimo } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import Empti from "@/public/cart/cat.png"

type Props = {}

function Page({}: Props) {
    const {cart,setCart} = useCart()
    const [cartPrice,setCartPrice] = useState(0);
    const [deliveryPrice,setDeliveryPrice] = useState(deliveryPriceConst);
    const [totalPrice,setTotalPrice] = useState(0);
    const [purePrice,setPurePrice] = useState(0);


    useEffect(()=>{
        setDeliveryPrice(
            cartPrice > 125 ? 0 : deliveryPriceConst
        )
    },[cartPrice,setDeliveryPrice,cart])
    useEffect(
        ()=>{
            setTotalPrice(
                cartPrice + deliveryPriceConst
            )

        },[cartPrice,deliveryPrice]
    )

    const getCartPrice = ()=>{
        let price = 0;
        for (const item of cart) {
            if(item.data.type == "custom sheet"){
                price += SheetPrice * item.quantity
            }else if(item.data.type == "sticker sheet"){
                price += SheetPrice * item.quantity
            }else if( item.data.type == "t-shirt"){
                 price += TShirtPrice * item.quantity
            }else if( item.data.type == "cup"){
                price += CupPrice * item.quantity
            }
        }
        setPurePrice(price)
        return PriceByPrice(price)
    }


    useEffect(()=>{
        setCartPrice(getCartPrice())
    },[cart,setCartPrice,getPrice])
  return (
    cart.length > 0 ? 
    <div className=' container px-0 min-h-[calc(100vh-100px)]'>
        <div className='relative flex flex-col md:flex-row h-full px-4  gap-0 md:gap-12 '>
                <div className='flex flex-1 md:mt-12 flex-col gap-2 md:py-8 max-w-2xl '>
                <h1 className='md:text-7xl  text-5xl bg-slate-50 p-4 pt-10 sticky top-20 w-[calc(100% + 32px)] z-10 rounded-b-2xl'>Cart</h1>
                { 
                        cart.map((item,i)=>{
                            // handelMinus is a function to decrease the quantity of the item and if it reaches 0 it will remove it from the cart
                            const handelMinus = ()=>{
                                if(item.quantity>1){
                                    setCart([
                                        ...cart.slice(0,i),
                                        {...item,quantity:item.quantity-1},
                                        ...cart.slice(i+1)
                                    ])
                                }else{
                                    setCart([
                                        ...cart.slice(0,i),
                                        ...cart.slice(i+1)
                                    ])
                                } 
                            }

                            // handelPlus is a function to increase the quantity of the item
                            const handelPlus = ()=>{
                                setCart([
                                    ...cart.slice(0,i),
                                    {...item,quantity:item.quantity+1},
                                    ...cart.slice(i+1)
                                ])
                            }

                            return (
                                <motion.div 
                                initial={{opacity:0,x:-100}}
                                animate={{opacity:1,x:0}}
                                transition={
                                    {
                                        duration:0.2,
                                        delay:i*0.1
                                    }
                                }
                                key={i} className='flex gap-6 items-center relative border rounded-md pl-5 p-1 md:p-4 bg-white shadow-sm'>
                                    <Image width={100} height={100} alt="" src={item.image as string} className='md:w-24 w-12  drop-shadow-xl -rotate-3 h-24 object-contain rounded-md'  />
                                    <div >
                                        <div className='text-lg '>{item.data.type}</div>
                                        <div className=''> {item.quantity} item{item.quantity>1?'s':''}</div>
                                    </div>
                                    <div className='ml-auto flex gap-4 p-2 text-lg'>
                                    <div className='flex items-center gap-2 md:gap-3  md:flex-row'>
                                        <Button onClick={handelMinus} size={"icon"}><Minus/></Button>
                                        <span className='hidden md:block'>{item.quantity}</span>
                                        <Button onClick={handelPlus} size={"icon"}><Plus/></Button>
                                    </div>
                                    {/* <Button size="icon" variant={"outline"} className='absolute translate-x-1/2 -translate-y-1/2 right-0 top-0' onClick={()=>{setCart(cart.filter((c,_i)=>i!==_i))}}><X/></Button> */}
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                    {/* <div className='sticky bottom-0 bg-[#fffa] p-2 rounded-xl shadow border'>
                        <Button size="lg">Clean Cart</Button>
                    </div> */}
                </div>
                <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}}  className='flex-1 flex'>
                <Card className='flex-1 md:sticky md:top-[120px] p-4 md:p-8 h-fit mt-12 bg-white '>
                    <div className='flex gap-4 items-center border-b  pb-2 mb-2 justify-between w-full md:max-w-[300px]'>
                        <div>
                            <span className='text-xl '>Price</span>
                            <h1 className='text-3xl '>{cartPrice.toFixed(1)} Dh</h1>
                        </div>
                        <div className='text-3xl'>+</div>
                        <div>
                            <span className='text-xl '>delivery</span>
                            <h1 className='text-3xl '>{deliveryPrice.toFixed(1)} Dh</h1>
                        </div>
                    </div>
                    <span className='text-xl '>Total Price</span>
                    <h1 className='text-5xl '>{(cartPrice + deliveryPrice).toFixed(2)} Dh 
                    {
                        (cartPrice + deliveryPrice) < (purePrice + 35) &&
                        <span className='text-2xl opacity-40 line-through'> / { purePrice + 35 } Dh</span>
                    }
                    </h1>
                    <div className='pt-8'>
                        <Link href={"/checkout"}>
                        <Button size="lg" className='w-full' variant={"secondary"}>CheckOut</Button>
                        </Link>
                    </div>
                </Card>
                </motion.div>
        </div>
    </div>
    :
    <div className='w-full h-[calc(100vh-100px)] flex flex-col gap-4 justify-center items-center'>
        <Image src={Empti} width={300} height={300} alt=""></Image>
        <h1 className='text-3xl'>Cart is Empty</h1>
        <Link className='' href={"/services/stickers "}>
            <Button size={"lg"} variant={"secondary"} className=''>Go To Shop</Button>
        </Link>
    </div>
  )
}

export default Page