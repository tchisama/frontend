'use client'
import React, { useEffect, useState } from 'react'
import sheet from "@/public/Untitled-1.jpg"
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader, Search, ShoppingBasketIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import testSheet from "@/public/Untitled-1.jpg"
import testSheet2 from "@/public/Untitled-3.jpg"
import testSheet3 from "@/public/Untitled-4.jpg"
import testSheet4 from "@/public/Untitled-6.jpg"
import { Input } from '@/components/ui/input'
import {motion} from "framer-motion"
import StickerSheetsList from '@/components/global/StickerSheetsList'
import { useQuery } from 'react-query'
import { getStickerSheet } from '@/utils/stickersSheet'
import { useParams } from 'next/navigation'
import { useCart } from '@/store/cart'
import { sheetPricing } from '@/constant/pricing'
import { PriceByPrice, SheetPrice, getPrice } from '@/lib/price'
import { Badge } from '@/components/ui/badge'
import CatFeet from '@/components/global/CatFeet'
import Head from 'next/head'
type Props = {}

export default function Page({}: Props) {
    const [sheetQuantity,setSheetQuantity] = React.useState(1)
    const param = useParams()
    const [loading,setLoading] = useState(true)
    const {data:sheetInfo,isLoading} = useQuery("fetchSheet",()=>{return getStickerSheet((param.sheetId as string).replaceAll("-"," "))}) 
    const [added,setAdded] = React.useState(false);
    const {addToCart,cart} = useCart()

    const [timesInCart,setTimesInCart] = React.useState(0)
    useEffect(()=>{
        if(!sheetInfo) return
        const existingItemIndex = cart.findIndex((_item) => {
                if (
                    _item.data.type === "sticker sheet"
                ) {
                    // Check if it's a sticker sheet and has the same sheetId
                    return sheetInfo.name === _item.data.data.sheetId;
                } else {
                    // If the types don't match, consider them different items
                    return false;
                }
            });
        setTimesInCart(existingItemIndex > -1 ? cart[existingItemIndex].quantity : 0)
    },[cart,sheetInfo])

    React.useEffect(()=>{
        if(added){
            setTimeout(() => {
                setAdded(false)            
            }, 200);
        }
    },[added])

    useEffect(()=>{
        if(!param.sheetId) return
        setLoading(true)
    },[param.sheetId])
    useEffect(()=>{
        if(!sheetInfo) return
        setLoading(false) 
    },[sheetInfo])

    if (isLoading) {
       return (
       <div className='w-full h-[calc(100vh-100px)] flex justify-center items-center'>
            <Loader className='w-[30px] h-[30px] animate-spin' />
       </div>
       )
    }

    const  handleAddToCart = ()=>{
        addToCart({
            quantity:sheetQuantity,
            image: sheetInfo?.snapshot as string,
            data:{
                type:"sticker sheet",
                data:{
                    sheetId:(param.sheetId as string).replaceAll("-"," "),
                }
            }
        })
        setAdded(true)
    }
  return (
    <div>
        <Head>
            <title>{sheetInfo?.name}</title>
        </Head>
    <div className='max-w-5xl mx-auto  pt-8 w-full'>
        <div className='flex flex-col md:flex-row w-full py-0 md:py-16 md:gap-8 items-center relative mb-12'>
            {
                !loading &&
            <CatFeet time={500}>
            <div className='flex-[1] drop-shadow-2xl relative md:w-full w-[70vw]'>
                <Image width={400} height={600} src={sheetInfo?.snapshot??""} alt="" className=' mb-12 flex-[2] opacity-0 top-0 left-0 rounded-xl shadow-2xl' />
                {
                new Array(sheetQuantity).fill(0).map((item, index) => (
                    <motion.div  
                        // initial={{scale:1.1,opacity:0.8}}
                        // animate={{scale:1,opacity:1}}
                        transition={{
                            duration:0.2,
                        }}
                        className='overflow-hidden border-[#fff6] duration-200 flex-[2] absolute top-0 left-0 md:rounded-[42px] rounded-[20px] border drop-shadow-lg'
                        style={{ rotate: `${-((index)*1.5 - ((sheetQuantity-1)/2)*3)}deg`, translateX: `${(index*6)-((sheetQuantity-1)*3)}px`, translateY: `${index*0}px` }}
                        key={index}>
                            <Image width={600} height={900} src={sheetInfo?.snapshot??""}  alt="" className='w-[600px]'/>
                    </motion.div>
                ))
                }
            </div>
            </CatFeet>
            }
            <div className='flex-[1]  sticky top-[120px] h-fit'>
                <motion.div 
                    initial={{opacity:0,x:300}}
                    animate={{opacity:1,x:0}}
                    className='md:space-y-6 space-x-2 w-full p-4 md:p-8 bg-[#fff8] rounded-xl border '>
                        {/* <h1 className='text-5xl mb-8'>Stickers Sheet</h1> */}
                        <h1 className='md:text-3xl text-2xl mb-6'>{sheetInfo?.name}</h1>
                        <p className='md:text-2xl text-xl'>Size : <span className='text-sm'>20cm x 30cm</span></p>
                        <p className='md:text-2xl mb-2 text-xl'>Quantity :</p>
                        <RadioGroup value={String(sheetQuantity)} onValueChange={e=>setSheetQuantity(Number(e))}>
                        {
                        new Array(6).fill(0)
                        .map((_,q) => (
                            <div key={q} className="flex items-center space-x-2">
                            <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                            <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                                <div className="flex-[1] text-sm md:text-lg">{q+1} Sheet</div>
                                <div className="flex-[1] text-sm md:text-lg">{PriceByPrice(SheetPrice*(q+1))} Dh</div>
                                {/* <div className="text-green-700 flex-[1] justify-end flex">
                                {14}%
                                </div> */}
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                        {
                            timesInCart > 0 &&
                            <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                className={'text-md font-sans absolute top-4 md:top-0 right-4 '}
                            >
                                <Badge variant={"secondary"} >{timesInCart} In Cart</Badge>
                            </motion.div>
                        }
                        <div className='flex gap-8 items-center justify-between mt-12'>
                            <h1 className='text-4xl'>{sheetPricing[sheetQuantity-1]} Dh</h1>
                            <Button onClick={handleAddToCart} size="lg" variant={"secondary"} className=' w-lg'>
                                {
                                    added ?
                                    <><Loader className='w-[30px] h-[30px] animate-spin'></Loader>   Adding</>
                                    :
                                    "Add to cart"
                                }
                            </Button>
                            {/* <Button size="lg" variant={"outline"} className=''>Buy now</Button> */}
                        </div>
                </motion.div>
            </div>
        </div>
    </div>
        <StickerSheetsList/>                        
    </div>
  )
}