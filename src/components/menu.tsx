"use client"

import { ChevronRight, Menu, GraduationCap } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuData = {
    main: [
        {
            title: "Uczelnia",
            items: [
                {
                    title: "O SWPS",
                    description: "Historia, misja i wartości uczelni",
                    href: "/o-swps",
                },
                {
                    title: "Władze uczelni",
                    description: "Rektor, prorektorzy i senat",
                    href: "/wladze",
                },
                {
                    title: "Wydziały",
                    description: "Struktura organizacyjna wydziałów",
                    href: "/wydzialy",
                },
                {
                    title: "Kampusy",
                    description: "Lokalizacje w całej Polsce",
                    href: "/kampusy",
                },
            ],
        },
        {
            title: "Kierunki studiów",
            items: [
                {
                    title: "Psychologia",
                    description: "Studia licencjackie i magisterskie",
                    href: "/kierunki/psychologia",
                },
                {
                    title: "Prawo",
                    description: "Jednolite studia magisterskie",
                    href: "/kierunki/prawo",
                },
                {
                    title: "Zarządzanie",
                    description: "Studia biznesowe i menedżerskie",
                    href: "/kierunki/zarzadzanie",
                },
                {
                    title: "Informatyka",
                    description: "Technologie informacyjne",
                    href: "/kierunki/informatyka",
                },
                {
                    title: "Dziennikarstwo",
                    description: "Media i komunikacja społeczna",
                    href: "/kierunki/dziennikarstwo",
                },
                {
                    title: "Design",
                    description: "Projektowanie graficzne i UX/UI",
                    href: "/kierunki/design",
                },
            ],
        },
        {
            title: "Dla kandydatów",
            items: [
                {
                    title: "Rekrutacja",
                    description: "Proces rekrutacyjny i wymagania",
                    href: "/rekrutacja",
                },
                {
                    title: "Stypendia",
                    description: "Możliwości finansowania studiów",
                    href: "/stypendia",
                },
                {
                    title: "Dni otwarte",
                    description: "Wydarzenia dla przyszłych studentów",
                    href: "/dni-otwarte",
                },
                {
                    title: "Kalkulator kosztów",
                    description: "Oblicz koszt swoich studiów",
                    href: "/kalkulator",
                },
            ],
        },
        {
            title: "Dla studentów",
            items: [
                {
                    title: "System USOS",
                    description: "Platforma studencka",
                    href: "/usos",
                },
                {
                    title: "Biblioteka",
                    description: "Zasoby i katalogi online",
                    href: "/biblioteka",
                },
                {
                    title: "Życie studenckie",
                    description: "Organizacje i wydarzenia",
                    href: "/zycie-studenckie",
                },
                {
                    title: "Praktyki i staże",
                    description: "Możliwości rozwoju zawodowego",
                    href: "/praktyki",
                },
            ],
        },
        {
            title: "Badania",
            items: [
                {
                    title: "Centra badawcze",
                    description: "Instytuty i laboratoria",
                    href: "/centra-badawcze",
                },
                {
                    title: "Publikacje",
                    description: "Czasopisma i wydawnictwa",
                    href: "/publikacje",
                },
                {
                    title: "Granty i projekty",
                    description: "Finansowanie badań",
                    href: "/granty",
                },
                {
                    title: "Konferencje",
                    description: "Wydarzenia naukowe",
                    href: "/konferencje",
                },
            ],
        },
    ],
}

export default function SWPSMenu() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center">
                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                        <div className="flex items-center space-x-2 pb-6">
                            <GraduationCap className="h-6 w-6 text-blue-600" />
                            <span className="text-lg font-bold">SWPS</span>
                        </div>
                        <div className="space-y-2">
                            {menuData.main.map((section) => (
                                <Collapsible key={section.title} className="space-y-2">
                                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 [&[data-state=open]>svg]:rotate-90">
                                        {section.title}
                                        <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-1 pl-4">
                                        {section.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            >
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </Link>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-bold text-gray-900">SWPS</span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex lg:ml-8">
                    <NavigationMenuList className="space-x-1">
                        {menuData.main.map((section) => (
                            <NavigationMenuItem key={section.title}>
                                <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium">
                                    {section.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                                        {section.items.map((item) => (
                                            <NavigationMenuLink key={item.title} asChild>
                                                <Link
                                                    href={item.href}
                                                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                >
                                                    <div className="text-sm font-medium leading-none group-hover:text-blue-600">{item.title}</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right side actions */}
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                        Dla pracowników
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Aplikuj teraz
                    </Button>
                </div>
            </div>
        </header>
    )
}
