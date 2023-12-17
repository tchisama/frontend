"use client"
import React from 'react'
import { Button } from '../ui/button'
import { HeroImages } from '@/constant/constants'
import {ArrowRight, Bold} from "lucide-react"
import Image from 'next/image'
import { HeroLinksImages } from '@/constant/constants'
import Link from 'next/link'
import {motion} from "framer-motion"
import offer from "@/public/offer.png"
import pin from "@/public/cart/pin.png"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import StickerSheetsList from './StickerSheetsList'
import StickersHomePage from './StickersHomePage'
import CatFeet from './CatFeet'
import profile from "@/public/logo/profile.png"

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <>
    <div className='min-h-[55vh] bg-gray-50 flex grid-bg'>

    <div className='w-full py-12 overflow-hidden'>
      <div className='container px-4 h-full items-center flex gap-0 lg:gap-4 flex-col-reverse lg:flex-row mx-auto'>
        <motion.div 
        className=' h-full lg:text-start flex-1 text-center lg:items-start flex flex-col gap-6 md:justify-center'>
          <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className='md:text-6xl text-3xl max-w-3xl uppercase font-inter'>Unleash the Power of Adorable Productivity</motion.h1>
          <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className='text-lg md:text-2xl opacity-75 max-w-3xl font-thin'>Turn mundane moments into magical memories with our delightful sticker sheets.</motion.h1>
          <div className='flex gap-4 flex-col md:flex-row items-center'>
            <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.6}}>
            <Link href={"/services/stickers"}>
                <Button size={'lg'} variant={"secondary"} className='uppercase hover:outline outline-1 flex gap-2   text-lg'>Explore Sheets</Button>
            </Link>
            </motion.div>
            <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.8}}>
            {/* <Link href={"/mysheet"}>
                <Button size={'lg'} variant={"ghost"} className='uppercase flex gap-2  text-lg '>Make your sheet <ArrowRight size={16}/></Button>
            </Link> */}
            </motion.div>
          </div>
        </motion.div>
          <CatFeet>
          <div className='relative py-8 md:mr-36 drop-shadow-xl'>
            <Image src={HeroImages.bears} width={300} height={450} className=' opacity-0 w-[150px] md:w-[250px] drop-shadow-xl' alt="bears"></Image>
            <Image src={HeroImages.cloud} width={300} height={450} className='z-30 absolute -left-20 md:-left-28 top-10  w-[120px] md:w-[250px] drop-shadow' alt="bears"></Image>

            <Image src={HeroImages.kitties} width={300} height={450} className='z-20 absolute left-0 top-0 rotate-12 w-[250px] drop-shadow-xl' alt="bears"></Image>
            <Image src={HeroImages.bears} width={300} height={450} className='z-10 absolute left-0 top-0 translate-x-4 translate-y-2 rotate-[18deg] w-[250px] drop-shadow-xl' alt="bears"></Image>

            <Image src={HeroImages.rabbits} width={300} height={450} className=' absolute left-0 top-0 translate-x-8 translate-y-4 rotate-[24deg] w-[250px] drop-shadow-xl' alt="bears"></Image>

            <Image src={HeroImages.rabbit} width={100} height={200} className='z-20 absolute -right-20 -rotate-[20deg] bottom-4 w-[70px] md:w-[100px] drop-shadow' alt="bears"></Image>
          </div>
          </CatFeet>
      </div>
    </div>
    </div>

    {/* <div className=''>
        <div className='container px-4 justify-center py-4 mx-auto md:flex gap-2 md:gap-6 grid grid-cols-2 md:flex-row items-center'>
            {
            [
                {name:"stickers",img:HeroLinksImages.Stickers,href:"stickers",commingSoon:false},
                // {name:"custom labels",img:HeroLinksImages.Label,href:"labels",commingSoon:true},
                {name:"shirts",img:HeroLinksImages.T_Shirt,href:"t-shirts",commingSoon:false},
                {name:"cups",img:HeroLinksImages.Cup,href:"cup",commingSoon:false},
            ].map(({name,img,href},index)=>
            <motion.div key={name}
                initial={{opacity:0,y:100,scale:0.6}}
                animate={{opacity:1,y:0,scale:1}}
                transition={{delay:0.1*index+0.8}}
                className='w-fit h-full flex flex-col gap-4  items-center'
            >
              
              <Link href={"/services/"+href} className='w-fit p-2 hover:scale-105 duration-300 rounded-2xl border bg-white '>
                  <Image src={img} alt={name} width={200} height={200}/>
                  <h2 className='text-center text-xl capitalize'>{name}</h2>
              </Link>
            </motion.div>
            )
            }
        </div>
    </div>
           */}

           <StickersHomePage/>


      <div className='container p-4 py-20 space-y-8'>




            <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className='relative'>
            <Card className='bg-white text-gray-700 overflow-hidden md:overflow-visible text-center relative md:text-start -rotate-1'>
                <CardContent className='flex md:items-end gap-2 md:gap-8  flex-col md:flex-row-reverse px-4 md:px-8'>
                  <div className='space-y-4 py-6 flex-1'>
                      <CardTitle className='md:text-8xl text-4xl uppercase  font-thin'>
                        - Get 15% OFF -
                      </CardTitle>
                      <p className='md:text-xl font-sans font-medium'>💵 Enjoy a <span className='font-bold uppercase'>15% discount</span> on orders over 75 DH!</p>
                      <p className='md:text-xl font-sans font-medium'>🚗 Plus, qualify for <span className='font-bold uppercase'>free shipping</span> within Morocco on orders exceeding 6 sheets.</p>
                      <Link href={"/services/stickers"} className='w-fit block mx-auto md:mx-0'>
                          <Button size={"lg"} variant={"secondary"} className=''>Shop Now <ArrowRight size={26}/></Button>
                      </Link>
                  </div>
                  <Image src={offer} alt="" width={350} height={350}  className='md:-mt-40 -mt-16 w-[200px] md:w-[350px] mx-auto  translate-y-16 md:translate-y-0 shadow-secondary drop-shadow-2xl '/>
                </CardContent>

            </Card>
                <Image src={pin} alt="" width={80} height={80}  className='absolute top-0 right-0 -translate-y-12'/>
            </motion.div>




        <div className='flex flex-col gap-4 md:flex-row mx-auto'>
          {
            [
                {
                  title:"Hot Picks",
                  content: "🔥 Hot Picks! Explore our trendiest stickers, tees, and cup prints. Limited stock! Shop Now.",
                },
                {
                  title:"Create Your Style",
                  content: "🎨 Create your own style with our custom stickers sheets. Shop Now.",
                },
                {
                  title:"Wearable Art",
                  content:"👚 Wearable Art! Elevate your style with our unique t-shirts and matching cups. Make a statement!"
                }
            ].map(({title,content},index)=>(
                <Card key={title} className='flex-1'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-medium'>
                          {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='font-sans font-medium'>
                      {content}
                    </CardContent>
                </Card>
            ))
          }
        </div>


        <div className=''>
          <div className='flex pt-10 gap-5  md:gap-12 flex-col md:flex-row'>
            <div className=''>
              <h1 className='text-4xl md:text-5xl uppercase'>get latest updates</h1>
              <h1 className='text-xl md:text-2xl uppercase'>follow up in instagram for instense updates</h1>
            </div>
            <Link href={"https://www.instagram.com/stickify.ma/"} className='flex items-center gap-2 w-fit'>
              <Image src={profile} alt="" width={60} height={60} className='rounded-full'/>
              <h3>@stickify.ma</h3>
              <ArrowRight size={16}/>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-1 md:gap-4 mt-8 md:grid-cols-4 '>
            {
              [
                "https://storage.googleapis.com/stickify-storage/statick/409211350_864765418424987_1200969857405101297_n.jpg",
                "https://storage.googleapis.com/stickify-storage/statick/409387244_377143348097840_4668389197002400899_n.jpg",
                "https://storage.googleapis.com/stickify-storage/statick/409610373_3168029406837675_5639581349586921694_n.jpg",
                "https://storage.googleapis.com/stickify-storage/statick/410256111_7337589212931736_2632186991800660373_n.jpg",
              ].map((image,index)=>(
                <div key={image} className=''>
                  <Image src={image} alt="" width={500} height={500} className='rounded-xl w-full border drop-shadow-sm'/>
                </div>
              ))
            }
          </div>


        </div>
    </div>
    </>
  )
}

export default HeroSection