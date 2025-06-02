"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, GraduationCap } from "lucide-react"
import Link from "next/link"

const footerData = {
    contact: {
        title: "Kontakt",
        items: [
            {
                icon: Phone,
                text: "+48 22 518 0700",
                href: "tel:+48225180700",
            },
            {
                icon: Mail,
                text: "info@swps.edu.pl",
                href: "mailto:info@swps.edu.pl",
            },
            {
                icon: MapPin,
                text: "ul. Chodakowska 19/31, 03-815 Warszawa",
                href: "https://maps.google.com/?q=SWPS+Warszawa",
            },
        ],
    },
    quickLinks: {
        title: "Szybkie linki",
        items: [
            { text: "Rekrutacja", href: "/rekrutacja" },
            { text: "System USOS", href: "/usos" },
            { text: "Biblioteka", href: "/biblioteka" },
            { text: "Kalendarz akademicki", href: "/kalendarz" },
            { text: "Regulaminy", href: "/regulaminy" },
            { text: "Mapa strony", href: "/mapa-strony" },
        ],
    },
    forStudents: {
        title: "Dla studentów",
        items: [
            { text: "Portal studenta", href: "/portal-studenta" },
            { text: "Stypendia", href: "/stypendia" },
            { text: "Praktyki i staże", href: "/praktyki" },
            { text: "Życie studenckie", href: "/zycie-studenckie" },
            { text: "Samorząd studencki", href: "/samorzad" },
            { text: "Pomoc psychologiczna", href: "/pomoc" },
        ],
    },
    about: {
        title: "O uczelni",
        items: [
            { text: "Historia SWPS", href: "/historia" },
            { text: "Misja i wartości", href: "/misja" },
            { text: "Władze uczelni", href: "/wladze" },
            { text: "Akredytacje", href: "/akredytacje" },
            { text: "Ranking uczelni", href: "/ranking" },
            { text: "Kariera w SWPS", href: "/kariera" },
        ],
    },
    campuses: {
        title: "Kampusy",
        items: [
            { text: "Warszawa", href: "/kampusy/warszawa" },
            { text: "Kraków", href: "/kampusy/krakow" },
            { text: "Wrocław", href: "/kampusy/wroclaw" },
            { text: "Poznań", href: "/kampusy/poznan" },
            { text: "Katowice", href: "/kampusy/katowice" },
            { text: "Online", href: "/kampusy/online" },
        ],
    },
    social: [
        { icon: Facebook, href: "https://facebook.com/swps", label: "Facebook" },
        { icon: Instagram, href: "https://instagram.com/swps", label: "Instagram" },
        { icon: Youtube, href: "https://youtube.com/swps", label: "YouTube" },
        { icon: Linkedin, href: "https://linkedin.com/school/swps", label: "LinkedIn" },
    ],
}

export default function SWPSFooter() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main footer content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Logo and description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <GraduationCap className="h-8 w-8 text-blue-400" />
                            <span className="text-2xl font-bold">SWPS</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Uniwersytet SWPS to nowoczesna uczelnia wyższa, która od ponad 25 lat kształci studentów w dziedzinie
                            psychologii, prawa, zarządzania, informatyki i wielu innych kierunków.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-blue-400 mb-3">{footerData.contact.title}</h3>
                            {footerData.contact.items.map((item, index) => {
                                const IconComponent = item.icon
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <IconComponent className="h-4 w-4 text-blue-400" />
                                        <span className="text-sm">{item.text}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-4">{footerData.quickLinks.title}</h3>
                        <ul className="space-y-2">
                            {footerData.quickLinks.items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Students */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-4">{footerData.forStudents.title}</h3>
                        <ul className="space-y-2">
                            {footerData.forStudents.items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-4">{footerData.about.title}</h3>
                        <ul className="space-y-2">
                            {footerData.about.items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Campuses */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-4">{footerData.campuses.title}</h3>
                        <ul className="space-y-2">
                            {footerData.campuses.items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social media and newsletter */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                        {/* Social media */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                            <span className="text-gray-300 font-medium">Śledź nas:</span>
                            <div className="flex space-x-4">
                                {footerData.social.map((social, index) => {
                                    const IconComponent = social.icon
                                    return (
                                        <Link
                                            key={index}
                                            href={social.href}
                                            className="text-gray-400 hover:text-blue-400 transition-colors"
                                            aria-label={social.label}
                                        >
                                            <IconComponent className="h-6 w-6" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Newsletter signup */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <span className="text-gray-300 font-medium whitespace-nowrap">Newsletter:</span>
                            <div className="flex w-full sm:w-auto">
                                <input
                                    type="email"
                                    placeholder="Twój adres email"
                                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 w-full sm:w-64"
                                />
                                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors font-medium whitespace-nowrap">
                                    Zapisz się
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 bg-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <div className="text-sm text-gray-400">© 2024 Uniwersytet SWPS. Wszelkie prawa zastrzeżone.</div>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-white transition-colors">
                                Polityka prywatności
                            </Link>
                            <Link href="/regulamin" className="text-gray-400 hover:text-white transition-colors">
                                Regulamin
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                Cookies
                            </Link>
                            <Link href="/dostepnosc" className="text-gray-400 hover:text-white transition-colors">
                                Dostępność
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
