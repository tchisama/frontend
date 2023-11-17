import React from 'react'
import { Button } from '../ui/button'
import { HeroImages } from '@/constant/constants'
import {ArrowRight} from "lucide-react"
import Image from 'next/image'
import { HeroLinksImages } from '@/constant/constants'
import Link from 'next/link'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <>
    <div className='min-h-[55vh] bg-gray-50 px-4 flex items-center'>
      <div className='container h-full items-center flex gap-10 lg:gap-4 py-10 flex-col-reverse lg:flex-row mx-auto'>
        <div className=' h-full text-center lg:text-start flex-1 items-center lg:items-start flex flex-col gap-6 justify-center'>
          <h1 className='text-6xl font-extrabold max-w-3xl uppercase '>Turn Your Designs into Stunning Reality</h1>
          <h1 className='text-xl max-w-3xl uppercase '>Experience the joy of holding your creativity with our high-quality printed stickers</h1>
          <div className='flex gap-4'>
          <Button size={'lg'} className='uppercase flex gap-2 py-7 px-10 text-lg'>Shop Now <ArrowRight size={16}/></Button>
          <Button size={'lg'} variant={"outline"} className='uppercase flex gap-2  py-7 px-10 text-lg'>Explore collections</Button>
          </div>
        </div>
        <div className='flex items-center justify-center py-8 md:py-0 relative'>
          <Image src={HeroImages.carrot} alt='logo' className='absolute top-0 -left-20 drop-shadow-lg animate-updown-slow1' width={200} height={200}/>
          <Image src={HeroImages.doughnut} alt='logo' className='z-20 drop-shadow-xl  animate-updown' width={500} height={500}/>
          <Image src={HeroImages.watermelon} alt='logo' className='absolute top-0 right-0 drop-shadow-lg  animate-updown-slow' width={200} height={200}/>
        </div>
      </div>
    </div>
    <div className=''>
        <div className='container justify-center py-4 mx-auto flex gap-6'>
            {
            [
                {name:"custom stickers",img:HeroLinksImages.Stickers,href:"custom-stickers"},
                {name:"custom labels",img:HeroLinksImages.Label,href:"custom-labels"},
                {name:"custom shirts",img:HeroLinksImages.T_Shirt,href:"custom-shirts"},
                {name:"custom cup",img:HeroLinksImages.Cup,href:"custom-cup"},
            ].map(({name,img,href})=>
            <Link href={href} key={name} className='w-fit p-2 hover:scale-105 duration-300 rounded-2xl border bg-white '>
                <Image src={img} alt={name} width={250} height={250}/>
                <h2 className='text-center text-xl'>{name}</h2>
            </Link>)
            }
        </div>
    </div>
    </>
  )
}

export default HeroSection