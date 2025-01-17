import { Check, CheckCircle, LayoutPanelTop, Shapes, Upload } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
    selected:number | null
    setSelected:(i:number|null) => void
}

const iconSize = 28
const navButtons = [
    {
        name:"checkout",
        icon: <CheckCircle size={iconSize}/>
    },
    {
        name:"layout",
        icon:<LayoutPanelTop  size={iconSize}/>,
    },
    {
        name:"explore",
        icon:<Shapes size={iconSize}/>,
    },
    {
        name:"uploads",
        icon:<Upload size={iconSize}/>,
    }
]


export default function CustomSheetNavBar({selected,setSelected}: Props) {
  return (
    <div className='border-r flex flex-col p-2 gap-2 w-fit'>
        {
            navButtons.map((button,i) => {
                return (
                    <Button onClick={()=>{setSelected(i)}} className='w-20 h-20 flex flex-col gap-2 items-center justify-center text-xs' key={button.name} variant={i===selected?"secondary":"outline"} size={"icon"}>
                        {button.icon}
                        {button.name}
                    </Button>
                )
            })
        }
    </div>
  )
}