'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Share, Check, Home, FolderIcon, Contact, FileText } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Dock, DockIcon } from "@/components/ui/dock"
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

// Animation variants
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
}

const navFade = {
  hidden: { 
    opacity: 0,
    y: -20
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

export default function CVPage() {
  const [isShared, setIsShared] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'must-be-ash CV',
        url: window.location.href,
      })
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
    } catch {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied to clipboard",
          description: "Share it with others!",
        })
        setIsShared(true)
        setTimeout(() => setIsShared(false), 2000)
      }
    }
  }

  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-16 md:pt-12 px-4 sm:px-6 lg:px-8">
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

              <Link href="/cv">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#4134a9] hover:text-white transition-colors duration-300"
                  style={{ 
                    width: '1.75rem',
                    height: '1.75rem',
                    padding: '1rem',
                    ...(pathname === '/cv' && {
                      backgroundColor: '#4134a9',
                      color: 'white'
                    })
                  }}
                >
                  <FileText style={{ width: '1.5rem', height: '1.5rem' }} />
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
                <Home className="h-8 w-8" />
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
            <Link href="/cv">
              <DockIcon 
                className={cn(
                  "backdrop-blur-sm p-3 rounded-full transition-colors",
                  pathname === "/cv"
                    ? "bg-[#4134a9] text-white hover:bg-[#6b5dd3]"
                    : "bg-white/10 hover:bg-[#4134a9] hover:text-white"
                )}
              >
                <FileText className="h-8 w-8" />
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

        {/* CV Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="pb-8"
        >
          <motion.div variants={fadeInUp} className="mb-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#4134a9]">
                <Image 
                  src={personalInfo.image} 
                  alt={personalInfo.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mt-2 md:mt-0">Jan-March 2025</h1>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-1 mt-1">
                  <Twitter className="h-4 w-4" />
                  <a href="https://twitter.com/must_be_ash" target="_blank" rel="noreferrer" className="hover:text-[#4134a9]">@must_be_ash</a>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Summary</h2>
            <p className="text-gray-700">
              Connected my company with their target prospects through outreach, hosting spaces, and content creation. Built multiple web applications to create digital experiences for their community or drive engagement. Finalist in the First Base Quest with a strong industry presence at Denver. Been &apos;vibe coding&apos; for over a year before it had a name or Cursor existed.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Content & Social Media Engagement</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Twitter Impressions:</h3>
              <ul className="list-inside space-y-1 pl-4">
                <li className="flex justify-between max-w-xs">
                  <span>Jan:</span> <span className="font-medium">20,434</span>
                </li>
                <li className="flex justify-between max-w-xs">
                  <span>Feb:</span> <span className="font-medium">121,664</span>
                </li>
                <li className="flex justify-between max-w-xs">
                  <span>Mar:</span> <span className="font-medium">56,120</span>
                </li>
                <li className="flex justify-between max-w-xs font-semibold">
                  <span>Total:</span> <span>198,218</span>
                </li>
              </ul>
              <p className="mt-2">Multiple retweets from Jesse, CBD, and the Base team.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Example of web apps as content:</h3>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li><a href="https://x.com/must_be_ash/status/1887888874174906649?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">BasedList 1</a></li>
                <li><a href="https://x.com/must_be_ash/status/1899224091837804550?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">BasedList 2</a></li>
                <li><a href="https://x.com/must_be_ash/status/1887537874608005302?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Cards Against Singularity (every agent needs a wallet)</a></li>
                <li><a href="https://x.com/Must_be_Ash/status/1889846368040337661" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Dark Mode Doods</a></li>
                <li><a href="https://x.com/Must_be_Ash/status/1889429427563704779" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Perplexity for Wedding Venues</a></li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Appearances & Recognitions</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><a href="https://x.com/buildonbase/status/1895610895872758135?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Finalist in the First Base Quest</a></li>
              <li>
                Featured in Web3/Ai discussions:
                <ul className="list-disc list-inside pl-6 mt-1">
                  <li><a href="https://x.com/nickcryptopro/status/1899214242688995829?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Intro with Nick</a></li>
                  <li><a href="https://x.com/nonfungibleyash/status/1895821070197764171?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Crestal Nation space</a></li>
                  <li><a href="https://www.youtube.com/watch?v=Dw-NmX7XKZ4" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">The Party Party interview</a></li>
                  <li><a href="https://x.com/navigate_ai/status/1903871393193959892?s=46" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Base Team</a></li>
                  <li><a href="https://youtu.be/7CumDI2B6oU?si=bpm3LA7o9jvENyNO&t=1019" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">NEWFORUM panel with ETHGlobal Agentic Hackathon judges</a></li>
                </ul>
              </li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Spaces Hosted</h2>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              <li><a href="https://x.com/donthedang" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@donthedang</a> (<a href="https://x.com/manifoldxyz" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Manifoldxyz</a>) - Feb 6</li>
              <li><a href="https://x.com/AchillesHodl" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@AchillesHodl</a> (<a href="https://x.com/Byte__AI" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Byte__AI</a>) - Feb 13</li>
              <li><a href="https://x.com/Greenie_sr" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Greenie_sr</a>, <a href="https://x.com/FR3NCHL0AF" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@FR3NCHL0AF</a>, <a href="https://x.com/SQU1NCH" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@SQU1NCH</a> (<a href="https://x.com/Doodles" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Doodles</a>) - Feb 20</li>
              <li><a href="https://x.com/BunchuBets" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@BunchuBets</a> (<a href="https://x.com/AskBillyBets" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@AskBillyBets</a>) - Feb 27</li>
              <li><a href="https://x.com/ProbablyAngg" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@ProbablyAngg</a> (prev. LayerZero, FuturePrimitive, GitCoin, Polygon) - Mar 6</li>
              <li><a href="https://x.com/HabacucMX" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@HabacucMX</a> (<a href="https://x.com/zenbitMX" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@zenbitMX</a>) - Mar 13</li>
              <li><a href="https://x.com/1dolinski" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@1dolinski</a> (<a href="https://x.com/apinowfun" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@apinowfun</a>) - Mar 20</li>
              <li><a href="https://x.com/Condzxyz" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Condzxyz</a> (<a href="https://x.com/AcolytAI" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@AcolytAI</a>) - Mar 21</li>
              <li><a href="https://x.com/KingBootoshi" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@KingBootoshi</a> (<a href="https://www.bootosh.ai/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">bootosh.ai</a>) - Mar 27</li>
              <li><a href="https://x.com/Zeneca" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@Zeneca</a> (<a href="https://x.com/ZenAcademy" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">@ZenAcademy</a>) - Apr 3</li>
            </ol>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Applications & Websites</h2>
            <p className="mb-2"><strong>Total Built:</strong> 13 applications/sites</p>
            <ul className="space-y-1 pl-4">
              <li>Browser Landing Page: <a href="https://nvg-browser.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Educational App for Data Privacy: <a href="https://learn.nvg8.io/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Rewards Application (Games & Draw Mechanics): <a href="https://nvg8.rewwwards.xyz/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Based Builders Directory: <a href="https://www.basedlist.dev/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Sands of Chaos (desktop landing): <a href="https://sands-of-chaos.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Token Site & Checker: <a href="https://token.nvg8.io/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Database Visualization Tool: <a href="https://mongodb-visualizer.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Card Game (CBD Collaboration): <a href="https://cards-against-singulaity.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Gift Directory Showcasing Data Usage: <a href="https://wed-mocha.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Search LLM Demo: <a href="https://agent-search-test.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>Flashbots Denver Hackathon Project: <a href="https://flashblocks.vercel.app/" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
              <li>iOS LLM Chat App for NVG8</li>
              <li>NVG8 LinkTree: <a href="https://token.nvg8.io/links" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">View</a></li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Business Development & Networking at Denver</h2>
            <p>List of connections made: <a href="https://chatgpt.com/canvas/shared/67c68354934881919638469d851532a2" target="_blank" rel="noreferrer" className="text-[#4134a9] hover:underline">Link</a></p>
          </motion.section>
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
          <motion.div 
            variants={fadeInUp} 
            className="mt-4 text-sm text-gray-500"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <p>Email: <a href="mailto:ash@goodgrip.io" className="hover:text-[#4134a9]">ash@goodgrip.io</a></p>
              <span className="hidden sm:inline">•</span>
              <p>Website: <a href="https://mustbeash.com" target="_blank" rel="noreferrer" className="hover:text-[#4134a9]">mustbeash.com</a></p>
              <span className="hidden sm:inline">•</span>
              <p>Twitter/X: <a href="https://twitter.com/must_be_ash" target="_blank" rel="noreferrer" className="hover:text-[#4134a9]">@must_be_ash</a></p>
            </div>
          </motion.div>
        </motion.footer>
      </div>
    </div>
  )
} 