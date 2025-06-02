"use client"

import { Play, ArrowRight, Users, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SWPSHero() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)

    const toggleVideo = () => {
        const video = document.getElementById("hero-video") as HTMLVideoElement
        if (video) {
            if (video.paused) {
                video.play()
                setIsVideoPlaying(true)
            } else {
                video.pause()
                setIsVideoPlaying(false)
            }
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    id="hero-video"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    poster="/placeholder.svg?height=1080&width=1920"
                >
                    <source src="/placeholder.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    <img src="/placeholder.svg?height=1080&width=1920" alt="SWPS Campus" className="w-full h-full object-cover" />
                </video>

                {/* Video overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Video Controls */}
            <button
                onClick={toggleVideo}
                className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 text-white"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            >
                <Play className={`h-5 w-5 ${isVideoPlaying ? "opacity-50" : "opacity-100"}`} />
            </button>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        {/* Main heading */}
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                                    Twoja przyszłość
                                    <span className="block text-blue-400">zaczyna się tutaj</span>
                                </h1>
                                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                                    Dołącz do ponad 17 000 studentów Uniwersytetu SWPS i rozwijaj się w nowoczesnym środowisku
                                    akademickim.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Aplikuj teraz
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
                                >
                                    Poznaj kierunki
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12">
                                <div className="flex items-center space-x-3 text-white">
                                    <div className="p-3 bg-blue-600/80 rounded-lg backdrop-blur-sm">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-bold">17 000+</div>
                                        <div className="text-gray-300 text-sm sm:text-base">Studentów</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-white">
                                    <div className="p-3 bg-blue-600/80 rounded-lg backdrop-blur-sm">
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-bold">50+</div>
                                        <div className="text-gray-300 text-sm sm:text-base">Kierunków</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-white">
                                    <div className="p-3 bg-blue-600/80 rounded-lg backdrop-blur-sm">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-bold">25+</div>
                                        <div className="text-gray-300 text-sm sm:text-base">Lat doświadczenia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center space-y-2 text-white animate-bounce">
                    <div className="text-sm font-medium">Przewiń w dół</div>
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Mobile optimization overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none sm:hidden"></div>
        </section>
    )
}
