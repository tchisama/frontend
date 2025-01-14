"use client"
import React, { useState,ChangeEvent,useRef,useEffect } from 'react';

import { useParams } from 'next/navigation'
import { productHeroImages } from "@/constant/productsHeroImages";
import SizeAndQCard from "@/components/global/SizeAndQCard";
import Canvas from '@/components/global/Canvas';
import { useCanvasProps } from '@/store/canvasProps';
import HeroSectionProduct from '@/components/global/HeroSectionProduct';
type Props = {
};





function Page({}: Props) {
    const params = useParams();
    const {image}  = useCanvasProps()
  return (
    <div className="">
      <HeroSectionProduct/>
      <div className="flex flex-col lg:flex-row gap-6 container mx-auto py-8">
        {
          ["die-cut", "circle", "square", "rect", "bumper", "rounded", "oval"].includes(params?.product as keyof typeof productHeroImages) && 
          <>
          </>
        }
        
          <Canvas type={params?.product as keyof typeof productHeroImages}/>
          <SizeAndQCard />
      </div>
    </div>
  );
}

export default Page;
