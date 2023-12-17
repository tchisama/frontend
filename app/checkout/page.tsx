"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import img from '@/public/cart/friends.png'
import Image from 'next/image'
import axios from '@/lib/axios'
import { useCart } from '@/store/cart'
import { toast } from '@/components/ui/use-toast'
import socket from '@/lib/socket'
import { ArrowRight, Loader } from 'lucide-react'
import { CupPrice, PriceByPrice, SheetPrice, TShirtPrice, deliveryPriceConst, getPrice } from '@/lib/price'
import { useRouter } from 'next/navigation'
import {motion} from "framer-motion"

type Props = {}

export default function Page({}: Props) {
    const {cart,setCart} = useCart();
    const [loading,setLoading] = React.useState(false);
    
    const router = useRouter();

    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [cartPrice,setCartPrice] = useState(0);


    useEffect(()=>{
        setCartPrice(getCartPrice())
    },[cart,setCartPrice])

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

        return PriceByPrice(price)+(price > 125 ? 0 : deliveryPriceConst)
    }




    const checkout = async () => {
        const orderItemsIds:string[] = []
        try {
          setLoading(true);
      
          const orderRes = await axios.post<any>("/orders/create", {
            customerId: Math.random() + "",
            number: phone,
            firstName: name,
            lastName,
            price: cartPrice,
            address: address,
          });
      
          const orderId = orderRes.data?._id ?? "";
      
          for (const item of cart) {
            if (item.data.type === "custom sheet") {
              for (let i = 0; i < item.quantity; i++) {
                await axios.post("/order-items/create", {
                  orderId: orderId,
                  image: item.image as string,
                  type: "custom-sheet",
                  customSheetSchema: {
                    data: {
                      items: item.data.data.map((s) => ({
                        x: s.x,
                        y: s.y,
                        image: s.image as string,
                        width: s.width,
                        height: s.height,
                      })),
                    },
                  },
                }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
              }
            } else if (item.data.type === "sticker sheet") {
              for (let i = 0; i < item.quantity; i++) {
                await axios.post("/order-items/create", {
                  orderId: orderId,
                  image: item.image as string,
                  type: "sticker-sheet",
                  stickerSheetSchema: {
                    data: {
                      sheetId: item.data.data.sheetId,
                    },
                  },
                }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
              }
            } else if (item.data.type === "t-shirt") {
              await axios.post("/order-items/create", {
                orderId: orderId,
                image: item.image as string,
                type: "t-shirt",
                tShirtSchema: {
                  quantity: item.quantity,
                  data: {
                    type: item.data.data.type,
                    image: item.data.data.image,
                  },
                },
              }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
            } else if (item.data.type === "cup") {
              await axios.post("/order-items/create", {
                orderId: orderId,
                image: item.image as string,
                type: "cup",
                cupSchema: {
                  quantity: item.quantity,
                  data: {
                    type: item.data.data.type,
                    image: item.data.data.image,
                  },
                },
              }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
            }
          }
      


          toast({
            title: "Checkout Done",
            description: "Your order has been placed",
            dir: "bottom-center",
          });
          
          await axios.put(`/orders/update/${orderId}`, {
              cart: orderItemsIds
          })
      
          setCart([]);
          socket.emit("add order");
          router.push("/thanks")
        } catch (error) {
          console.error("Checkout failed:", error);
          toast({
            title: "Checkout Failed",
            description: "There was an error placing your order",
            dir: "bottom-center",
          });
        } finally {
          setLoading(false);
        }
      };
      
      

  return (
    <motion.div 
    initial={{ opacity: 0 ,y:-200}}
    animate={{ opacity: 1 ,y:0}}
    className='min-h-[calc(100vh-100px)] py-4 container max-w-5xl px-4 flex justify-center items-center'>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='md:text-7xl text-4xl font-thin opacity-75'>Checkout</CardTitle>
            </CardHeader>
            <CardContent className=' p-4 md:p-8 overflow-hidden flex flex-col md:flex-row gap-4'>
                <div className='flex-1 space-y-2 w-full '>
                      <div className='flex gap-2 flex-col md:flex-row max-w-2xl '>
                          <div className='flex-1'>
                              <h4 className='md:text-xl text-lg opacity-75'>First Name</h4>
                              <Input name='firstName' value={name} onInput={(e:any)=>setName(e.target.value)} className='max-w-2xl'></Input>
                          </div>
                          <div className='flex-1'>
                              <h4 className='md:text-xl text-lg opacity-75'>Last Name</h4>
                              <Input name='lastName' value={lastName} onInput={(e:any)=>setLastName(e.target.value)} className='max-w-2xl'></Input>
                          </div>
                      </div>
                      <h4 className='md:text-xl text-lg opacity-75'>Phone Number</h4>
                      <Input name='phone' value={phone} onInput={(e:any)=>setPhone(e.target.value)} className='max-w-2xl'></Input>
                      <h4 className='md:text-xl text-lg opacity-75'>Full Address</h4>
                      <Input name='address' value={address} onInput={(e:any)=>setAddress(e.target.value)} className='max-w-2xl'></Input>
                      <br />
                      <Button onClick={checkout} disabled={loading|| !name || !address || !phone || !cart.length} size={"lg"} variant="secondary" className='max-w-[800px] '>
                          {
                              loading ?
                              <>Loading <Loader className='animate-spin'/></>
                              :
                              <>Checkout <ArrowRight/></>
                          }
                      </Button>
                </div>
                <motion.div 
                    initial={{opacity:0,scale:0,y:200}}
                    animate={{opacity:1,scale:1,y:0}}
                    transition={{delay:0.4}}
                    className=''
                >
                  <Image src={img} alt='thanks' width={350} height={350} className='translate-y-14 md:mt-0 mt-[-50px] drop-shadow-2xl'></Image>
                </motion.div>
            </CardContent>
        </Card>
    </motion.div>
  )
}