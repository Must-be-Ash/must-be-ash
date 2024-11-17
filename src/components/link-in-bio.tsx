'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Github, Linkedin, Twitter, Mail, Play, Globe, Share, Check, Home, FolderIcon, Contact } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { FaviconImage } from "@/components/ui/favicon-image";
import { usePathname } from 'next/navigation'
import { Dock, DockIcon } from "@/components/ui/dock"
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const navFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const personalInfo = {
  name: "must-be-ash",
  bio: "Product designer x Builder",
  image: "/must-be-ash.png",
  socials: [
    { icon: Github, url: "https://github.com/Must-be-Ash?tab=repositories" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/ash-nouruzi-46a764119/" },
    { icon: Twitter, url: "https://x.com/Must_be_Ash" },
    { icon: Mail, url: "mailto:ash@goodgrip.io" },
  ]
}

const projects = [
  {
    name: "AskDuckie",
    description: "Google but for kids",
    site: "https://askduckie.com",
    video: "",
    status: "Live",
    type: "SaaS",
    color: "#B4E7E6",
    icon: "/duckie.png"
  },
  {
    name: "KeyHub",
    description: "Manage API keys & costs - first-ever API control centre",
    site: "https://keyhub.live",
    video: "https://www.youtube.com/embed/yblxn9KZS90?si=kbHl70Rp9cqnl0MR",
    status: "Live",
    type: "SaaS",
    color: "#4CAF50",
    icon: "/keyhub.png"
  },
  {
    name: "Quicknews",
    description: "Stay up to date without getting stuck on social media",
    site: "https://quicknews.pro",
    video: "",
    status: "WIP",
    type: "SaaS",
    color: "#A5E887",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Little ones",
    description: "Personalized stories to teach values",
    site: "https://littleones.fun",
    video: "",
    status: "Live",
    type: "SaaS",
    color: "#F59E0B",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Vertical Saas Report",
    description: "Find industry specific stats and opportunities",
    site: "https://verticalsaas.report",
    video: "",
    status: "Live",
    type: "SaaS",
    color: "#4A1D96",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Legal gist",
    description: "Get an idea of what you're about to sign",
    site: "https://legalgist.pro",
    video: "",
    status: "Live",
    type: "Tool",
    color: "#607D8B",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Git2Site",
    description: "Turn your repository into a link-in-bio",
    site: "https://www.git2site.pro/",
    video: "",
    status: "WIP",
    type: "Tool",
    color: "#795548",
    icon: "/G2S.png"
  },
  {
    name: "Numnum",
    description: "Pac-Man Trump parody",
    site: "https://numnum.pro",
    video: "https://www.youtube.com/embed/kGy0m_xo2sc?si=ctNsoATIyJLKYp6U",
    status: "Live",
    type: "mini-game",
    color: "#FFC107",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Mindwiper",
    description: "Wire Buzzer re-imagined",
    site: "https://mindwiper.fun",
    video: "https://www.youtube.com/embed/hUuofC6gla4?si=_cO--Rj1UE11QIxv",
    status: "Live",
    type: "mini-game",
    color: "#E91E63",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Rhyme time",
    description: "Sharpen your freestyling skills",
    site: "https://www.rhymetime.live/",
    video: "https://www.youtube.com/embed/QfwQ5oyNDzA?si=ri8hi_75N3fhrg8D",
    status: "Live",
    type: "Tool",
    color: "#3F51B5",
    icon: "/RT.png"
  },
  {
    name: "Fasting calculator",
    description: "See how much weight you can lose by fasting",
    site: "https://www.fasting-calculator.site/",
    video: "",
    status: "Live",
    type: "Tool",
    color: "#00BCD4",
    icon: "/IF.svg"
  },
  {
    name: "markedBy",
    description: "Turn your bookmark into a newsletter",
    site: "https://www.markedby.me/",
    video: "https://www.youtube-nocookie.com/embed/iOmfBimwC4s?controls=0&rel=0&modestbranding=1",
    status: "Deactivated",
    type: "SaaS",
    color: "#FF5722",
    icon: "/MB.png"
  },
  {
    name: "Frens city",
    description: "aggregated web3 events",
    site: "https://www.frens.city/",
    video: "",
    status: "Deactivated",
    type: "SaaS",
    color: "#8BC34A",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Signed",
    description: "First-ever authenticated digital autographs platform",
    site: "https://signed.gg/",
    video: "https://www.youtube.com/embed/SptbySzmMB0?si=jjKWQ33lh-lyyEBv",
    status: "Live",
    type: "SaaS",
    color: "#673AB7",
    icon: "/sn.svg"
  },
  {
    name: "Binder Studio",
    description: "First-ever trust-less art commissioning platform",
    site: "https://app.binder.studio/",
    video: "https://www.youtube.com/embed/txHLI6Tikhk?si=lnU7m5w2Fs8lcXYW",
    status: "Live",
    type: "SaaS",
    color: "#009688",
    icon: "/bs.svg"
  },
  {
    name: "Grip wallet",
    description: "NFTs put to work",
    site: "",
    video: "https://www.youtube.com/embed/KeErRJJX_3g?si=A7GvyD2FTzDeh7Ny",
    status: "Live",
    type: "SaaS",
    color: "#009688",
    icon: "/grip.svg"
  },
  {
    name: "99problems",
    description: "Find problem spaces that could be solved with web3",
    site: "https://www.99problems.xyz/",
    video: "",
    status: "Live",
    type: "Tool",
    color: "#FF4081",
    icon: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Garry run",
    description: "Dino run parody game of Gary Gantzler, former SEC chairman",
    site: "https://www.garry.run/",
    video: "https://www.youtube.com/embed/qD8AA-Q0xKI?si=ghfaOwTnu3ZgI8WF",
    status: "Live",
    type: "mini-game",
    color: "#FF4081",
    icon: "/garry.png"
  }
]

const scrollToFooter = () => {
  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
}

export function LinkInBioComponent() {
  const [isShared, setIsShared] = useState(false)
  const { toast } = useToast()
  const pathname = usePathname()

  useEffect(() => {
    if (isShared) {
      const timer = setTimeout(() => setIsShared(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isShared])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ url })
        toast({
          description: "The link has been shared.",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast({
        description: "The link has been copied to your clipboard.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Mobile Navigation Bar */}
        <motion.nav 
          initial="hidden"
          animate="visible"
          variants={navFade}
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 px-4 py-3 md:hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Link href="/home">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300"
                  style={{ 
                    width: '1.75rem',
                    height: '1.75rem',
                    padding: '1rem',
                    ...(pathname === '/home' && {
                      backgroundColor: '#4134a9',
                      color: 'white'
                    })
                  }}
                >
                  <Home style={{ width: '1.5rem', height: '1.5rem' }} />
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300"
                  style={{ 
                    width: '1.75rem',
                    height: '1.75rem',
                    padding: '1rem',
                    ...(pathname === '/' && {
                      backgroundColor: '#4134a9',
                      color: 'white'
                    })
                  }}
                >
                  <FolderIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300"
                onClick={scrollToFooter}
                style={{ 
                  width: '1.75rem',
                  height: '1.75rem',
                  padding: '1rem'
                }}
              >
                <Contact style={{ width: '1.5rem', height: '1.5rem' }} />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-[#4134a9] transition-colors duration-300"
              onClick={handleShare}
              style={{ 
                width: '1.75rem',
                height: '1.75rem',
                padding: '1rem'
              }}
            >
              {isShared ? 
                <Check style={{ width: '1.5rem', height: '1.5rem' }} /> : 
                <Share style={{ width: '1.5rem', height: '1.5rem' }} />
              }
            </Button>
          </div>
        </motion.nav>

        {/* Desktop Navigation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={navFade}
          className="absolute right-4 top-4 hidden md:block"
        >
          <Dock>
            <Link href="/home">
              <DockIcon 
                className={cn(
                  "backdrop-blur-sm p-3 rounded-full transition-colors",
                  pathname === "/home" 
                    ? "bg-[#4134a9] text-white hover:bg-[#6b5dd3]"
                    : "bg-white/10 hover:bg-[#4134a9] hover:text-white"
                )}
              >
                <Link href="/home" className="w-full h-full block">
                  <Home className="h-8 w-8" />
                </Link>
              </DockIcon>
            </Link>
            <Link href="/">
              <DockIcon 
                className={cn(
                  "backdrop-blur-sm p-3 rounded-full transition-colors",
                  pathname === "/"
                    ? "bg-[#4134a9] text-white hover:bg-[#6b5dd3]"
                    : "bg-white/10 hover:bg-[#4134a9] hover:text-white"
                )}
              >
                <FolderIcon className="h-8 w-8" />
              </DockIcon>
            </Link>
            <DockIcon 
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-[#4134a9] hover:text-white transition-colors cursor-pointer"
              onClick={scrollToFooter}
            >
              <Contact className="h-8 w-8" />
            </DockIcon>
            <DockIcon 
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-[#4134a9] hover:text-white transition-colors cursor-pointer"
              onClick={handleShare}
            >
              {isShared ? <Check className="h-8 w-8" /> : <Share className="h-8 w-8" />}
            </DockIcon>
          </Dock>
        </motion.div>

        {/* Header Section */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12 relative pt-20 md:pt-0"
        >
          <motion.div variants={fadeInUp}>
            <Image
              src={personalInfo.image}
              alt={personalInfo.name}
              width={150}
              height={150}
              className="mx-auto rounded-full mb-4"
            />
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl font-bold mb-2"
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-muted-foreground mb-4"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center justify-center max-w-2xl mx-auto text-[#222222]"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-center leading-[1.4]"
            >
              Turn your{" "}
              <span className="bg-[#ffb520] px-4 py-1 rounded-md text-white">idea</span>{" "}
              into an <br className="hidden md:block"/>
              <span className="bg-[#ffb520] px-4 py-1 rounded-md mt-2 inline-block text-white">MVP</span>{" "}
              in a week
            </motion.h1>
            <div className="z-10 flex items-center justify-center">
              <Link href="/home">
                <AnimatedGradientText className="px-6 py-3 cursor-pointer rounded-full mt-2">
                  <span
                    className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#4134a9] via-[#6b5dd3] to-[#4134a9] bg-[length:var(--bg-size)_100%] bg-clip-text text-[#ffffff] font-bold text-xl`,
                    )}
                  >
                    → Build with me!
                  </span>
                </AnimatedGradientText>
              </Link>
            </div>
          </motion.div>
        </motion.header>

        {/* Projects Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
            >
              <Card 
                className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] relative transform hover:scale-105 group bg-white"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                  style={{ 
                    backgroundColor: project.color,
                  }}
                />
                <CardHeader className="relative z-10">
                  <FaviconImage
                    url={project.site}
                    alt={`${project.name} icon`}
                    className="mb-4"
                    fallbackIcon={project.icon}
                  />
                  <CardTitle className="text-xl mb-2 text-black">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow relative z-10">
                  <CardDescription className="text-sm text-gray-600">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center relative z-10">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{project.type}</Badge>
                    <Badge 
                      variant="outline" 
                      className={`${
                        project.status === 'Live' 
                          ? 'bg-green-100 text-green-800' 
                          : project.status === 'WIP'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" size="sm" className=" hover:bg-[#4134a9] hover:text-white">
                      <Link href={project.site} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                        <span className="sr-only">Visit Site</span>
                      </Link>
                    </Button>
                    {project.video && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                            <span className="sr-only">Watch Demo</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{project.name} Demo</DialogTitle>
                            <DialogDescription>
                              Watch a demonstration of {project.name} in action.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="aspect-video">
                            <iframe
                              src={project.video}
                              title={`${project.name} demo video`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.footer 
          id="footer"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-20 pb-8 text-center"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center space-x-6"
          >
            {personalInfo.socials.map((social, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={social.url} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300 h-14 w-14"
                  >
                    <social.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                    <span className="sr-only">{social.icon.name}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.footer>
      </div>
    </div>
  )
}