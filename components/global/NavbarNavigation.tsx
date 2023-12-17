"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import editor from "@/public/tools/editor.png"
import qrcode from "@/public/tools/qrcode.png"
import ai from "@/public/tools/ai.png"
import Image, { StaticImageData } from "next/image"
const components: { title: string; href: string; description: string,icon: StaticImageData }[] = [
  {
    "title": "Sticker Editor ",
    "href": "/docs/tools/sticker-maker",
    "description": "Craft custom stickers with our user-friendly online editor.",
    "icon": editor
  },
  {
    "title": "AI Sticker Generator",
    "href": "/docs/tools/ai-sticker-generator",
    "description": "Let AI create unique stickers based on your preferences.",
    "icon": ai
  },
  {
    "title": "QR Code Maker",
    "href": "/docs/tools/qr-code-maker",
    "description": "Generate QR codes effortlessly for diverse applications.",
    "icon": qrcode
  }
]

export function NavbarNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
                      {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-secondary to-secondary bg-white p-4 no-underline outline-none focus:shadow-md"
                                  href="/services/stickers"
                                >
                                  <div className="mb-2 mt-4 text-2xl font-medium text-white">
                                    Stickers
                                  </div>
                                  <p className="text-sm leading-tight text-white font-sans font-medium opacity-80">
                                  Express yourself with custom adhesive art and messages.
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <ListItem href="/services/t-shirts" title="T-Shirts">
                            Wear your style with personalized, quality cotton creations.
                            </ListItem>
                            {/* <ListItem href="/docs/installation" title="Labels">
                            Organize and brand with custom, durable adhesive labeling.
                            </ListItem> */}
                            {/* <ListItem href="/services/cup" title="Cups"> */}
                            {/* Sip in style with personalized drinkware for every occasion. */}
                            {/* </ListItem> */}
                          {/* </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem> */} 

        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <Link
                  href={component.href}
                  className="flex gap-4 p-2 hover:bg-slate-100 rounded-xl duration-200"
                  key={component.title}
                >
                  <div>
                  <Image alt="" src={component.icon.src} width={90} height={90}></Image>
                  </div>
                  <div>
                  <h3 className="text-sm font-medium"> {component.title} </h3>
                  <p className="text-xs font-sans">{component.description}</p>
                  </div>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/services/stickers" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Stickers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/explore" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Explore
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

type Icon = {
  icon : StaticImageData
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex gap-2">
              <div>
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm font-sans leading-snug text-muted-foreground">
                          {children}
                        </p>
              </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
