'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Share, Check, Home, FolderIcon, Contact, Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Dock, DockIcon } from "@/components/ui/dock"
import { motion } from 'framer-motion'
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

// Update these animation variants at the top of the file
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,  // Increased from 20 to 60
    scale: 0.9  // Added scale effect
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,  // Increased duration
      ease: [0.22, 1, 0.36, 1]  // Custom cubic-bezier for smoother motion
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  // Increased from 0.1 to 0.2
      delayChildren: 0.1,    // Added delay
      ease: "easeOut"
    }
  }
}

const navFade = {
  hidden: { 
    opacity: 0,
    y: -20   // Added slight downward fade
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
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

const TOTAL_PROJECTS = 17

const scrollToFooter = () => {
  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
}

export default function BookingPage() {
  const [isShared, setIsShared] = useState(false)
  const { toast } = useToast()

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
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-0 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
                  backgroundColor: '#4134a9',
                  color: 'white'
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
                  padding: '1rem'
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
              <DockIcon className="bg-[#4134a9] text-white p-3 rounded-full hover:bg-[#6b5dd3] transition-colors">
                <Home className="h-8 w-8" />
              </DockIcon>
            </Link>
            <Link href="/">
              <DockIcon className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-[#4134a9] hover:text-white transition-colors">
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
          className="text-center mb-6 relative pt-20 md:pt-0"
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
        </motion.header>

        {/* Content Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col gap-2 md:gap-3"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-center leading-[1.2] md:leading-[1.1]"
            >
              Skip the $30k+ agency quotes
              <span className="bg-[#ffb520] px-4 py-1 rounded-md text-black mt-2 md:mt-3 inline-block">
                Get your product to market in weeks
              </span>
            </motion.h2>
          </motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8 mb-8 px-4">
            I&apos;ve launched{" "}
            <Link 
              href="/" 
              className="underline decoration-[#ffb520] hover:text-[#ffb520] transition-colors"
            >
              {TOTAL_PROJECTS}+ successful products
            </Link>
            {" "}since August 2024.
            <br />
            Let me help bring your idea to life.
          </p>
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col gap-4 text-gray-600 mb-12 px-4"
          >
            {/* Feature items with staggered animation */}
            {[
              { emoji: "⚡", title: "2-Week Delivery", desc: "Get your fully functional MVP in just two weeks" },
              { emoji: "🤝", title: "Direct Partnership", desc: "Iterate together with unlimited revisions and direct communication" },
              { emoji: "💰", title: "90% Cost Savings", desc: "Save $30k+ compared to traditional development agencies" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="md:flex md:items-center md:justify-center md:gap-2 grid grid-cols-[24px_1fr] items-start gap-x-2 text-left md:text-center"
              >
                <span className="text-xl">{feature.emoji}</span>
                <div className="md:inline">
                  <span className="font-semibold">{feature.title}</span>
                  <span className="block md:inline md:ml-2 text-gray-600">{feature.desc}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-4"
        >
          {/* Original Pricing Grid (Commented Out)
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
          >
            {[
              {
                title: "Beginner",
                price: "$120",
                duration: "/ 1hr",
                description: "Let me show you how easy it is to create apps without needing to code, learn the basics and get over the intimidation of development.",
                features: ["Framework overview", "Best practices", "Tools introduction"],
                link: "https://buy.stripe.com/cN2eUW4T23Kcbxm3cd"
              },
              {
                title: "Learn to fish",
                price: "$300",
                duration: "/ 3 lessons",
                description: "We will take up a mini project that you could execute within our sessions and create your first application together.",
                features: ["3 hours of guidance", "Hands-on development", "Complete your first web application"],
                link: "https://buy.stripe.com/bIY00285e80scBqbIL",
                highlighted: true
              },
              {
                title: "Done for you",
                price: "$1,750",
                duration: "/ week",
                description: "Get your idea built in a week! Skip the $30K+ agency quotes or unreliable fiverr gigs.",
                features: ["Full week of development", "Direct communication", "Fully functional web app guaranteed"],
                link: "https://buy.stripe.com/28o002etCcgIcBq002"
              }
            ].map((tier, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`flex flex-col h-full bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  tier.highlighted ? 'border-2 border-[#4134a9]' : ''
                }`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                  <p className="text-gray-600 mb-4 min-h-[80px]">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-gray-500">{tier.duration}</span>
                  </div>
                  <ul className="text-gray-600 mb-6 space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Link href={tier.link}>
                    <Button className="w-full bg-[#4134a9] text-white hover:bg-[#6b5dd3]">
                      Let&apos;s Build
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          */}

          {/* New MVP Building Section */}
          <motion.div
            variants={fadeInUp}
            className="px-0 sm:px-6 lg:px-8 py-4 sm:py-2"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="w-full overflow-hidden rounded-2xl bg-[#1a1a1a] p-4 sm:p-12 lg:p-16">
                <div className="relative z-10">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <span className="inline-flex items-center rounded-full bg-[#ffb520]/10 px-4 py-1.5 text-sm font-medium text-[#ffb520]">
                      Ready to build something amazing?
                    </span>
                    <h2 className="max-w-3xl bg-gradient-to-br from-[#ffb520] via-[#FFFFFF] to-[#ffb520] bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl font-bold text-transparent">
                      Transform Your Ideas Into Reality
                    </h2>
                  </div>

                  <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-8 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-3 sm:space-y-6">
                      <p className="text-base sm:text-lg text-gray-300">
                        Skip the expensive agencies and long development cycles. I&apos;ll help you transform your idea into a working product in record time, leveraging the power of modern no-code tools and my proven development process.
                      </p>
                      
                      <div className="space-y-2 sm:space-y-4">
                        <div className="flex items-start gap-4 rounded-xl bg-[#222222] p-4 shadow-sm">
                          <div className="flex-shrink-0">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb520]">
                              <Check className="h-4 w-4 text-black" />
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">2-Week Delivery</h3>
                            <p className="text-gray-400">Get your fully functional MVP in just two weeks</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-xl bg-[#222222] p-4 shadow-sm">
                          <div className="flex-shrink-0">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb520]">
                              <Check className="h-4 w-4 text-black" />
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Direct Partnership</h3>
                            <p className="text-gray-400">Iterate together with unlimited revisions and direct communication</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-xl bg-[#222222] p-4 shadow-sm">
                          <div className="flex-shrink-0">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb520]">
                              <Check className="h-4 w-4 text-black" />
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">90% Cost Savings</h3>
                            <p className="text-gray-400">Save $30k+ compared to traditional development agencies</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Mobile Optimized */}
                    <div className="flex flex-col items-center justify-center w-full h-full bg-[#222222] rounded-xl sm:rounded-2xl p-6 sm:p-8">
                      <div className="flex flex-col items-center justify-center w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4">Book a Discovery Call</h2>
                        <p className="text-base sm:text-lg text-gray-400 text-center mb-6 sm:mb-8">Let&apos;s discuss your project and explore how we can bring it to life</p>
                        <Link href="https://cal.com/ash-nouruzi/discovery" target="_blank" className="w-full sm:w-auto">
                          <InteractiveHoverButton
                            className="w-full border-[#ffb520] bg-[#ffb520] py-4 sm:py-6 text-base sm:text-lg font-semibold text-black hover:text-[#ffb520]"
                          >
                            Schedule Free Call
                          </InteractiveHoverButton>
                        </Link>
                        <div className="flex items-center gap-2 mt-4 sm:mt-6">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          <p className="text-sm sm:text-base text-gray-400">15 minutes · No commitment required</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
