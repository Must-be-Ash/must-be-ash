'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Share, Check, Home, FolderIcon } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Dock, DockIcon } from "@/components/ui/dock"

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
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 px-4 py-3 md:hidden">
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
        </nav>

        {/* Desktop Navigation */}
        <div className="absolute right-4 top-4 hidden md:block">
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
              onClick={handleShare}
            >
              {isShared ? <Check className="h-8 w-8" /> : <Share className="h-8 w-8" />}
            </DockIcon>
          </Dock>
        </div>

        {/* Header Section */}
        <header className="text-center mb-6 relative pt-20 md:pt-0">
          <Image
            src={personalInfo.image}
            alt={personalInfo.name}
            width={150}
            height={150}
            className="mx-auto rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{personalInfo.name}</h1>
          <p className="text-muted-foreground mb-4">{personalInfo.bio}</p>
          <div className="flex justify-center space-x-6 mb-6">
            {personalInfo.socials.map((social, index) => (
              <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300 h-14 w-14"
                >
                  <social.icon style={{ width: '1.5rem', height: '1.5rem' }} />
                  <span className="sr-only">{social.icon.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </header>

        {/* Content Section */}
        <div className="text-center mb-12">
          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-center leading-[1.2] md:leading-[1.1]">
              Learn how to turn your
              <div className="mt-1 md:mt-1">ideas into products</div>
              <span className="bg-[#ffb520] px-4 py-1 rounded-md text-white mt-2 md:mt-3 inline-block">
                without coding
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8 mb-8 px-4">
            I&apos;ve built{" "}
            <Link 
              href="/" 
              className="underline decoration-[#4134a9] hover:text-[#4134a9] transition-colors"
            >
              {TOTAL_PROJECTS}+ functional products
            </Link>
            {" "}with zero coding knowledge. And I only started in August 2024.
            I can teach you how to turn your idea to working products.
          </p>
          <div className="flex flex-col gap-4 text-gray-600 mb-12 px-4">
            {/* Learn By Building */}
            <div className="md:flex md:items-center md:justify-center md:gap-2 grid grid-cols-[24px_1fr] items-start gap-x-2 text-left md:text-center">
              <span className="text-xl">✨</span>
              <div className="md:inline">
                <span className="font-semibold">Learn By Building</span>
                <span className="block md:inline md:ml-2 text-gray-600">Skip theory, start creating real products</span>
              </div>
            </div>

            {/* Proven Track Record */}
            <div className="md:flex md:items-center md:justify-center md:gap-2 grid grid-cols-[24px_1fr] items-start gap-x-2 text-left md:text-center">
              <span className="text-xl">🎯</span>
              <div className="md:inline">
                <span className="font-semibold">Proven Track Record</span>
                <span className="block md:inline md:ml-2 text-gray-600">{TOTAL_PROJECTS}+ projects built in less than a 4 months</span>
              </div>
            </div>

            {/* Rapid Development */}
            <div className="md:flex md:items-center md:justify-center md:gap-2 grid grid-cols-[24px_1fr] items-start gap-x-2 text-left md:text-center">
              <span className="text-xl">⚡</span>
              <div className="md:inline">
                <span className="font-semibold">Rapid Development</span>
                <span className="block md:inline md:ml-2 text-gray-600">From idea to MVP in just one week</span>
              </div>
            </div>

            {/* No-Code to Code */}
            <div className="md:flex md:items-center md:justify-center md:gap-2 grid grid-cols-[24px_1fr] items-start gap-x-2 text-left md:text-center">
              <span className="text-xl">🚀</span>
              <div className="md:inline">
                <span className="font-semibold">No-Code to Code</span>
                <span className="block md:inline md:ml-2 text-gray-600">Learn the modern way to build software</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic mb-8">
            &ldquo;I started my coding journey in August 2024. Look at all these projects - you can do this too!&rdquo;
          </p>
        </div>

        {/* Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Curious Tier */}
          <div className="flex flex-col h-full bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div>
              <h3 className="text-2xl font-bold mb-2">Curious</h3>
              <p className="text-gray-600 mb-4 h-24">Learn the overall approach, most efficient frameworks, tips for best practices, and get familiar with the tools.</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">$120</span>
                <span className="text-gray-500"> / 1hr</span>
              </div>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Framework overview
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Best practices
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Tool recommendations
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link href="https://buy.stripe.com/cN2eUW4T23Kcbxm3cd">
                <Button className="w-full bg-[#4134a9] text-white hover:bg-[#6b5dd3]">
                  Let&apos;s Build
                </Button>
              </Link>
            </div>
          </div>

          {/* Beginner Tier */}
          <div className="flex flex-col h-full bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-[#4134a9]">
            <div>
              <h3 className="text-2xl font-bold mb-2">Beginner</h3>
              <p className="text-gray-600 mb-4 h-24">Make a tool or prototype and see your idea come to life. Perfect for your first project.</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">$300</span>
                <span className="text-gray-500"> / 3 lessons</span>
              </div>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 3 hours of guidance
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Hands-on development
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Project completion
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link href="https://buy.stripe.com/bIY00285e80scBqbIL">
                <Button className="w-full bg-[#4134a9] text-white hover:bg-[#6b5dd3]">
                  Let&apos;s Build
                </Button>
              </Link>
            </div>
          </div>

          {/* Committed Tier */}
          <div className="flex flex-col h-full bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div>
              <h3 className="text-2xl font-bold mb-2">Committed</h3>
              <p className="text-gray-600 mb-4 h-24">Build a full-stack web app with me. One week of collaboration with guaranteed working product.</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">$1,750</span>
                <span className="text-gray-500"> / week</span>
              </div>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 5 hours of mentoring
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> 5 dedicated lessons
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Guaranteed working product
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Full week of support
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link href="https://buy.stripe.com/28o002etCcgIcBq002">
                <Button className="w-full bg-[#4134a9] text-white hover:bg-[#6b5dd3]">
                  Let&apos;s Build
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
