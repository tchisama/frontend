"use client"
import React from 'react'
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

function page({}: Props) {
  return (
      <div className="flex px-6 justify-center items-center min-h-[calc(100vh-100px)] ">
        <motion.div
          initial={{opacity:0,y:-100,scale:0.5,rotate:0}}
          animate={{opacity:1,y:0,scale:1,rotate:3}}
          className='w-full max-w-[600px] h-fit justify-center items-center flex'
        >
        <Card className='w-full text-gray-600 shadow-2xl relative'>
          <motion.div initial={{scale:0}} animate={{scale:1,x:"30%",y:"-30%"}} transition={{delay:0.5}} className='absolute drop-shadow-xl top-0 rotate-3 right-0 translate-x-1/3 -translate-y-1/3 w-[250px] h-[250px]'>
            {/* <Image src={} alt="sorry" width={250} height={250} className=''></Image> */}
          </motion.div>
          <CardHeader>
            <CardTitle className='text-7xl font-normal'>
                success
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <h1 className="text-3xl font-bold">Message sent successfully</h1>
            <Link href={"/"} className='block'>
            <Button>Go Home Page</Button>
            </Link>
          </CardContent>
        </Card>
        </motion.div>

      </div>
  )
}

export default page