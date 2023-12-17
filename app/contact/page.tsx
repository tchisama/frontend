"use client"
import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import wow from "@/public/wow.png"
import axios from '@/lib/axios'

type Props = {}

export default function Page({}: Props) {

    const [loading,setLoading] = React.useState(false);
    
    const router = useRouter();

    const [name,setName] = useState("");
    const [lastName,setLastName] = useState("");
    const [message,setMessage] = useState("");
    const [phone,setPhone] = useState("");


    const sendMessage = (e:React.FormEvent)=>{
        setLoading(true)
        axios.post('/contact/create',{
            firstName:name,
            lastName,
            phone,
            message
        }).then(()=>{
            setLoading(false)
            router.push("/contact/success")
        })
    }
  return (
    <motion.div 
    initial={{ opacity: 0 ,y:-200}}
    animate={{ opacity: 1 ,y:0}}
    className='min-h-[calc(100vh-100px)] container pt-4 px-4 flex justify-center items-center'>
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='md:text-7xl text-5xl font-thin opacity-75'>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className='  overflow-hidden flex gap-4 flex-col md:flex-row'>
                <div className='flex-1 space-y-2 w-full '>
                    <div className='flex gap-2 max-w-2xl flex-col md:flex-row'>
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
                    <h4 className='md:text-xl text-lg opacity-75'>Message</h4>
                    <Textarea name='phone' value={message} onInput={(e:any)=>setMessage(e.target.value)} className='max-w-2xl'></Textarea>

                    <br />
                    <Button onClick={sendMessage} disabled={loading|| !name || !message || !phone } size={"lg"} variant="secondary" className='max-w-[800px] '>
                        {
                            loading ?
                            <>Loading <Loader className='animate-spin'/></>
                            :
                            <>Send <Send/></>
                        }
                    </Button>
                </div>
                <motion.div 
                    initial={{opacity:0,scale:0,y:200}}
                    animate={{opacity:1,scale:1,y:0}}
                    transition={{delay:0.4}}
                >
                  <Image src={wow} alt='thanks' width={350} height={350} className='translate-y-14 md:mt-0 mt-[-50px] drop-shadow-2xl'></Image>
                </motion.div>
            </CardContent>
        </Card>
    </motion.div>
  )
}