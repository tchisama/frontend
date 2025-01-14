import React from 'react'
import ImageNext from "next/image";
import { productHeroImages } from '@/constant/productsHeroImages';
import { useParams } from 'next/navigation';
import { getProductInfo } from '@/constant/allProductControlers';
import { Button } from '../ui/button';

type Props = {}

function HeroSection({}: Props) {
    const params = useParams();
    const product = getProductInfo(params?.service as string,params?.product as string)
  return (
      <div className=" bg-slate-100 gap-6 ">
        <div className="flex container  py-6 mx-auto  gap-4 items-center ">
          <ImageNext src={product?.hero ?? ""} alt="" width={400} height={400} className="drop-shadow-2xl -rotate-6 w-[350px] h-[350px]"></ImageNext>
          <div className="space-y-4">
              <h1 className="text-7xl capitalize">{(params?.product as string).replace("-"," ")}</h1>
              <p className="max-w-2xl font-sans font-medium opacity-75">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>

          </div>
        </div>
      </div>
  )
}

export default HeroSection