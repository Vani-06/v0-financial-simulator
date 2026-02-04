"use client"

import React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Progress } from "@/components/ui/progress"
import { 
  Loader2,
  Sparkles,
  Leaf,
  TreeDeciduous,
  Apple,
  Bug,
  Droplets,
  Sun,
  Wind,
  Heart
} from "lucide-react"

interface Profile {
  monthly_income: number
  savings_goal: number
  current_balance: number
  total_savings: number
  financial_personality: string
}

interface Transaction {
  id: string
  description: string
  amount: number
  type: string
  date: string
  categories: { name: string; color: string } | null
}

interface Challenge {
  id: string
  is_good_choice: boolean
  date: string
}

// Beautiful Money Tree Component
function FinancialTree({ 
  rootsHealth, 
  trunkHealth, 
  growthLevel, 
  fruitsCount, 
  pestsCount 
}: { 
  rootsHealth: number
  trunkHealth: number
  growthLevel: number
  fruitsCount: number
  pestsCount: number
}) {
  // Dynamic colors based on health
  const trunkColors = {
    primary: trunkHealth > 70 ? "#4ade80" : trunkHealth > 40 ? "#facc15" : "#fb923c",
    secondary: trunkHealth > 70 ? "#166534" : trunkHealth > 40 ? "#a16207" : "#c2410c",
  }
  const leafColors = {
    primary: growthLevel > 70 ? "#22c55e" : growthLevel > 40 ? "#84cc16" : "#9ca3af",
    secondary: growthLevel > 70 ? "#15803d" : growthLevel > 40 ? "#65a30d" : "#6b7280",
    highlight: growthLevel > 70 ? "#86efac" : growthLevel > 40 ? "#bef264" : "#d1d5db",
  }
  const rootColors = {
    primary: rootsHealth > 70 ? "#a78bfa" : rootsHealth > 40 ? "#c4b5fd" : "#9ca3af",
    secondary: rootsHealth > 70 ? "#7c3aed" : rootsHealth > 40 ? "#a78bfa" : "#6b7280",
  }
  
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <svg viewBox="0 0 400 450" className="w-full h-full max-w-[500px]">
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#312e81" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          
          {/* Ground gradient */}
          <radialGradient id="groundGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={rootColors.primary} stopOpacity="0.25" />
            <stop offset="70%" stopColor={rootColors.secondary} stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          {/* Trunk gradient */}
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={trunkColors.secondary} />
            <stop offset="30%" stopColor={trunkColors.primary} />
            <stop offset="70%" stopColor={trunkColors.primary} />
            <stop offset="100%" stopColor={trunkColors.secondary} />
          </linearGradient>
          
          {/* Leaf gradients */}
          <radialGradient id="leafGradient1" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={leafColors.highlight} />
            <stop offset="50%" stopColor={leafColors.primary} />
            <stop offset="100%" stopColor={leafColors.secondary} />
          </radialGradient>
          <radialGradient id="leafGradient2" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor={leafColors.primary} />
            <stop offset="100%" stopColor={leafColors.secondary} />
          </radialGradient>
          
          {/* Root gradient */}
          <linearGradient id="rootGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={rootColors.primary} />
            <stop offset="100%" stopColor={rootColors.secondary} stopOpacity="0.5" />
          </linearGradient>
          
          {/* Glow filters */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="innerShadow">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="#000" floodOpacity="0.2" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>
          
          {/* Star/sparkle shape */}
          <path id="star" d="M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z" />
        </defs>
        
        {/* Background glow */}
        <rect x="0" y="0" width="400" height="450" fill="url(#skyGradient)" />
        
        {/* Ambient light orbs */}
        <circle cx="80" cy="60" r="40" fill="#a78bfa" opacity="0.08">
          <animate attributeName="opacity" values="0.05;0.12;0.05" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="100" r="50" fill="#f472b6" opacity="0.06">
          <animate attributeName="opacity" values="0.04;0.1;0.04" dur="8s" repeatCount="indefinite" />
        </circle>
        
        {/* Ground/soil area */}
        <ellipse cx="200" cy="380" rx="180" ry="40" fill="url(#groundGradient)" />
        <ellipse cx="200" cy="375" rx="150" ry="25" fill={rootColors.primary} opacity="0.15" />
        
        {/* Roots with organic curves */}
        <g>
          {[
            { d: "M200 360 C180 380, 140 395, 80 410", w: 8 },
            { d: "M200 360 C185 385, 155 410, 110 430", w: 5 },
            { d: "M200 360 C220 380, 260 395, 320 410", w: 8 },
            { d: "M200 360 C215 385, 245 410, 290 430", w: 5 },
            { d: "M200 360 C200 390, 195 420, 200 445", w: 6 },
            { d: "M200 360 C175 375, 145 385, 100 390", w: 4 },
            { d: "M200 360 C225 375, 255 385, 300 390", w: 4 },
          ].map((root, i) => (
            <path 
              key={i}
              d={root.d}
              stroke="url(#rootGradient)"
              strokeWidth={root.w}
              fill="none" 
              strokeLinecap="round"
              opacity={0.7 + (i % 3) * 0.1}
            >
              <animate 
                attributeName="opacity" 
                values={`${0.6 + i * 0.05};${0.9};${0.6 + i * 0.05}`} 
                dur={`${3 + i * 0.5}s`} 
                repeatCount="indefinite" 
              />
            </path>
          ))}
          
          {/* Energy particles flowing through roots */}
          {rootsHealth > 40 && [...Array(4)].map((_, i) => (
            <circle key={i} r="3" fill={rootColors.primary} filter="url(#softGlow)">
              <animateMotion 
                dur={`${4 + i}s`} 
                repeatCount="indefinite"
                path={`M${80 + i * 60} 410 Q${140 + i * 30} 385 200 360`}
              />
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${4 + i}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="2;4;2" dur={`${4 + i}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        
        {/* Main trunk with organic shape */}
        <g>
          {/* Trunk shadow */}
          <path 
            d="M185 360 C180 320, 178 280, 182 240 C186 200, 192 160, 200 130 C208 160, 214 200, 218 240 C222 280, 220 320, 215 360 Z"
            fill="rgba(0,0,0,0.2)"
            transform="translate(3, 3)"
          />
          {/* Main trunk */}
          <path 
            d="M185 360 C180 320, 178 280, 182 240 C186 200, 192 160, 200 130 C208 160, 214 200, 218 240 C222 280, 220 320, 215 360 Z"
            fill="url(#trunkGradient)"
            filter="url(#innerShadow)"
          >
            <animate 
              attributeName="d" 
              values="M185 360 C180 320, 178 280, 182 240 C186 200, 192 160, 200 130 C208 160, 214 200, 218 240 C222 280, 220 320, 215 360 Z;M183 360 C178 320, 176 280, 180 240 C184 200, 190 160, 200 125 C210 160, 216 200, 220 240 C224 280, 222 320, 217 360 Z;M185 360 C180 320, 178 280, 182 240 C186 200, 192 160, 200 130 C208 160, 214 200, 218 240 C222 280, 220 320, 215 360 Z"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Trunk highlight */}
          <path 
            d="M192 350 C190 310, 190 270, 193 230 C196 190, 198 160, 200 140"
            stroke={trunkColors.primary}
            strokeWidth="3"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />
          
          {/* Left main branch */}
          <path 
            d="M188 280 C165 255, 140 235, 110 220"
            stroke="url(#trunkGradient)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          >
            <animate 
              attributeName="d" 
              values="M188 280 C165 255, 140 235, 110 220;M188 280 C168 258, 145 240, 115 228;M188 280 C165 255, 140 235, 110 220"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Right main branch */}
          <path 
            d="M212 265 C235 240, 265 220, 295 205"
            stroke="url(#trunkGradient)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          >
            <animate 
              attributeName="d" 
              values="M212 265 C235 240, 265 220, 295 205;M212 265 C232 237, 260 215, 290 198;M212 265 C235 240, 265 220, 295 205"
              dur="5.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Smaller branches */}
          <path d="M192 240 C170 220, 150 205, 130 195" stroke="url(#trunkGradient)" strokeWidth="6" fill="none" strokeLinecap="round">
            <animate attributeName="d" values="M192 240 C170 220, 150 205, 130 195;M192 240 C172 223, 155 210, 137 202;M192 240 C170 220, 150 205, 130 195" dur="5s" repeatCount="indefinite" />
          </path>
          <path d="M208 250 C230 235, 255 225, 275 220" stroke="url(#trunkGradient)" strokeWidth="6" fill="none" strokeLinecap="round">
            <animate attributeName="d" values="M208 250 C230 235, 255 225, 275 220;M208 250 C228 232, 252 220, 272 213;M208 250 C230 235, 255 225, 275 220" dur="5.2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Leaf canopy - layered for depth */}
        <g>
          {/* Back layer leaves (darker) */}
          {[
            { cx: 200, cy: 75, rx: 75 + growthLevel * 0.4, ry: 55 + growthLevel * 0.3 },
            { cx: 130, cy: 130, rx: 50 + growthLevel * 0.3, ry: 40 + growthLevel * 0.2 },
            { cx: 270, cy: 125, rx: 50 + growthLevel * 0.3, ry: 42 + growthLevel * 0.2 },
          ].map((leaf, i) => (
            <ellipse 
              key={`back-${i}`}
              cx={leaf.cx} 
              cy={leaf.cy} 
              rx={leaf.rx} 
              ry={leaf.ry} 
              fill={leafColors.secondary}
              opacity={0.7}
            >
              <animate 
                attributeName="cx" 
                values={`${leaf.cx};${leaf.cx + 2};${leaf.cx - 1};${leaf.cx}`} 
                dur={`${5 + i}s`} 
                repeatCount="indefinite" 
              />
            </ellipse>
          ))}
          
          {/* Middle layer leaves */}
          {[
            { cx: 200, cy: 85, rx: 68 + growthLevel * 0.45, ry: 50 + growthLevel * 0.35 },
            { cx: 145, cy: 120, rx: 45 + growthLevel * 0.3, ry: 38 + growthLevel * 0.25 },
            { cx: 255, cy: 115, rx: 45 + growthLevel * 0.3, ry: 38 + growthLevel * 0.25 },
            { cx: 100, cy: 175, rx: 35 + growthLevel * 0.2, ry: 28 + growthLevel * 0.15 },
            { cx: 300, cy: 170, rx: 35 + growthLevel * 0.2, ry: 28 + growthLevel * 0.15 },
          ].map((leaf, i) => (
            <ellipse 
              key={`mid-${i}`}
              cx={leaf.cx} 
              cy={leaf.cy} 
              rx={leaf.rx} 
              ry={leaf.ry} 
              fill="url(#leafGradient2)"
              opacity={0.85}
            >
              <animate 
                attributeName="cx" 
                values={`${leaf.cx};${leaf.cx + 3};${leaf.cx - 2};${leaf.cx}`} 
                dur={`${4.5 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="ry" 
                values={`${leaf.ry};${leaf.ry + 2};${leaf.ry}`} 
                dur={`${5 + i * 0.4}s`} 
                repeatCount="indefinite" 
              />
            </ellipse>
          ))}
          
          {/* Front layer leaves (brightest with highlights) */}
          {[
            { cx: 200, cy: 70, rx: 55 + growthLevel * 0.35, ry: 40 + growthLevel * 0.25 },
            { cx: 160, cy: 100, rx: 35 + growthLevel * 0.25, ry: 28 + growthLevel * 0.2 },
            { cx: 240, cy: 95, rx: 35 + growthLevel * 0.25, ry: 28 + growthLevel * 0.2 },
            { cx: 175, cy: 55, rx: 28, ry: 22 },
            { cx: 225, cy: 58, rx: 26, ry: 20 },
            { cx: 200, cy: 45, rx: 22, ry: 18 },
          ].map((leaf, i) => (
            <ellipse 
              key={`front-${i}`}
              cx={leaf.cx} 
              cy={leaf.cy} 
              rx={leaf.rx} 
              ry={leaf.ry} 
              fill="url(#leafGradient1)"
              opacity={0.95}
            >
              <animate 
                attributeName="cx" 
                values={`${leaf.cx};${leaf.cx + 2};${leaf.cx - 1.5};${leaf.cx}`} 
                dur={`${4 + i * 0.25}s`} 
                repeatCount="indefinite" 
              />
            </ellipse>
          ))}
          
          {/* Sparkles on healthy tree */}
          {growthLevel > 50 && [...Array(8)].map((_, i) => (
            <use
              key={i}
              href="#star"
              x={130 + i * 25 + (i % 2) * 10}
              y={50 + (i % 3) * 35}
              fill="#fff"
              opacity="0"
            >
              <animate 
                attributeName="opacity" 
                values="0;0.9;0" 
                dur={`${2 + i * 0.4}s`} 
                repeatCount="indefinite" 
                begin={`${i * 0.6}s`}
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0.5;1;0.5"
                dur={`${2 + i * 0.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
              />
            </use>
          ))}
        </g>
        
        {/* Fruits - beautiful apples with shine */}
        {Array.from({ length: Math.min(fruitsCount, 5) }).map((_, i) => {
          const positions = [
            { x: 165, y: 80 },
            { x: 235, y: 85 },
            { x: 120, y: 140 },
            { x: 280, y: 135 },
            { x: 200, y: 55 },
          ]
          const colors = ["#f472b6", "#fb7185", "#f472b6", "#ec4899", "#f472b6"]
          return (
            <g key={i}>
              {/* Outer glow */}
              <circle 
                cx={positions[i].x} 
                cy={positions[i].y} 
                r="16" 
                fill={colors[i]}
                opacity="0.3"
                filter="url(#strongGlow)"
              >
                <animate attributeName="r" values="14;18;14" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              {/* Main fruit body */}
              <ellipse 
                cx={positions[i].x} 
                cy={positions[i].y} 
                rx="11" 
                ry="12" 
                fill={colors[i]}
              >
                <animate 
                  attributeName="cy" 
                  values={`${positions[i].y};${positions[i].y - 2};${positions[i].y}`} 
                  dur={`${3 + i * 0.25}s`} 
                  repeatCount="indefinite" 
                />
              </ellipse>
              {/* Highlight shine */}
              <ellipse 
                cx={positions[i].x - 3} 
                cy={positions[i].y - 4} 
                rx="4" 
                ry="3" 
                fill="rgba(255,255,255,0.6)"
              >
                <animate 
                  attributeName="cy" 
                  values={`${positions[i].y - 4};${positions[i].y - 6};${positions[i].y - 4}`} 
                  dur={`${3 + i * 0.25}s`} 
                  repeatCount="indefinite" 
                />
              </ellipse>
              {/* Smaller highlight */}
              <circle 
                cx={positions[i].x - 5} 
                cy={positions[i].y - 2} 
                r="1.5" 
                fill="rgba(255,255,255,0.4)"
              />
              {/* Stem */}
              <path 
                d={`M${positions[i].x} ${positions[i].y - 11} C${positions[i].x + 2} ${positions[i].y - 15}, ${positions[i].x + 4} ${positions[i].y - 16}, ${positions[i].x + 5} ${positions[i].y - 14}`}
                stroke="#854d0e"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Tiny leaf on stem */}
              <ellipse 
                cx={positions[i].x + 6} 
                cy={positions[i].y - 14} 
                rx="4" 
                ry="2" 
                fill={leafColors.primary}
                transform={`rotate(30 ${positions[i].x + 6} ${positions[i].y - 14})`}
              />
            </g>
          )
        })}
        
        {/* Falling leaves for bad habits (subtle, not ugly) */}
        {Array.from({ length: Math.min(pestsCount, 3) }).map((_, i) => {
          const startX = 280 + i * 30
          const startY = 150 + i * 20
          return (
            <ellipse 
              key={i}
              rx="6" 
              ry="4" 
              fill="#a8a29e"
              opacity="0.6"
            >
              <animateMotion 
                dur={`${8 + i * 2}s`} 
                repeatCount="indefinite"
                path={`M${startX} ${startY} Q${startX - 30} ${startY + 80} ${startX - 50} ${startY + 160}`}
              />
              <animate 
                attributeName="opacity" 
                values="0.6;0.3;0" 
                dur={`${8 + i * 2}s`} 
                repeatCount="indefinite" 
              />
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                values="0;180;360" 
                dur={`${4 + i}s`} 
                repeatCount="indefinite" 
              />
            </ellipse>
          )
        })}
        
        {/* Floating magical particles */}
        {growthLevel > 40 && [...Array(10)].map((_, i) => {
          const colors = [leafColors.highlight, "#f9a8d4", "#c4b5fd", leafColors.primary]
          return (
            <circle 
              key={i} 
              r={1.5 + (i % 3)} 
              fill={colors[i % 4]} 
              opacity="0"
            >
              <animate 
                attributeName="cx" 
                values={`${100 + i * 25};${110 + i * 25};${95 + i * 25};${100 + i * 25}`} 
                dur={`${5 + i * 0.6}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="cy" 
                values={`${200 - i * 12};${170 - i * 12};${185 - i * 12};${200 - i * 12}`} 
                dur={`${4 + i * 0.4}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="opacity" 
                values="0;0.8;0.8;0" 
                dur={`${4 + i * 0.5}s`} 
                repeatCount="indefinite" 
                begin={`${i * 0.7}s`}
              />
            </circle>
          )
        })}
        
        {/* Energy flow from roots to leaves */}
        {trunkHealth > 50 && [...Array(3)].map((_, i) => (
          <circle key={i} r="4" fill={rootColors.primary} filter="url(#softGlow)">
            <animateMotion 
              dur={`${5 + i * 0.8}s`} 
              repeatCount="indefinite"
              path="M200 360 C200 300, 200 200, 200 100"
              begin={`${i * 1.8}s`}
            />
            <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${5 + i * 0.8}s`} repeatCount="indefinite" begin={`${i * 1.8}s`} />
            <animate attributeName="r" values="3;5;3" dur={`${5 + i * 0.8}s`} repeatCount="indefinite" begin={`${i * 1.8}s`} />
          </circle>
        ))}
      </svg>
    </div>
  )
}

// Health Indicator Card
function HealthCard({ 
  icon: Icon, 
  label, 
  value, 
  description, 
  color 
}: { 
  icon: React.ElementType
  label: string
  value: number
  description: string
  color: string
}) {
  const getStatus = (val: number) => {
    if (val >= 70) return { text: "Thriving", emoji: "Excellent!" }
    if (val >= 40) return { text: "Growing", emoji: "Good progress!" }
    return { text: "Needs Care", emoji: "Let's improve!" }
  }
  const status = getStatus(value)
  
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform">
      <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(135deg, ${color}, transparent)` }} />
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-lg font-bold text-foreground">{status.text}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color }}>{value}%</p>
        </div>
      </div>
      <Progress value={value} className="h-2" style={{ '--progress-color': color } as React.CSSProperties} />
      <p className="text-xs text-muted-foreground">{description}</p>
      <p className="text-sm font-medium" style={{ color }}>{status.emoji}</p>
    </div>
  )
}

export default function InsightsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [profileRes, transactionsRes, challengesRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("monthly_income, savings_goal, current_balance, total_savings, financial_personality")
        .eq("id", user.id)
        .single(),
      supabase
        .from("transactions")
        .select("*, categories(name, color)")
        .eq("user_id", user.id)
        .order("date", { ascending: true }),
      supabase
        .from("daily_challenges")
        .select("id, is_good_choice, date")
        .eq("user_id", user.id)
        .order("date", { ascending: true })
    ])

    if (profileRes.error) {
      window.location.href = "/onboarding"
      return
    }

    if (profileRes.data) setProfile(profileRes.data)
    if (transactionsRes.data) setTransactions(transactionsRes.data)
    if (challengesRes.data) setChallenges(challengesRes.data)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate insights
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const netSavings = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0

  // Challenge performance
  const goodChoices = challenges.filter(c => c.is_good_choice).length
  const totalChallenges = challenges.length
  const challengeScore = totalChallenges > 0 ? (goodChoices / totalChallenges) * 100 : 50

  // Calculate tree health metrics
  const rootsHealth = Math.min(100, Math.max(0, challengeScore)) // Money habits from challenge performance
  const trunkHealth = Math.min(100, Math.max(0, totalExpenses > 0 ? Math.max(20, 100 - (totalExpenses / (totalIncome || 1)) * 80) : 80)) // Spending health
  const growthLevel = Math.min(100, Math.max(0, savingsRate * 2 + 30)) // Savings growth
  const goalProgress = profile?.savings_goal 
    ? Math.min(100, ((profile.total_savings || netSavings) / profile.savings_goal) * 100)
    : 0
  const fruitsCount = Math.floor(goalProgress / 20) // Goals achieved as fruits
  const badChoices = challenges.filter(c => !c.is_good_choice).length
  const pestsCount = Math.min(4, Math.floor(badChoices / 2)) // Bad habits as pests

  // Category breakdown for insights
  const categoryData = transactions
    .filter(t => t.type === "expense" && t.categories)
    .reduce((acc, t) => {
      const catName = t.categories?.name || "Other"
      const existing = acc.find(c => c.name === catName)
      if (existing) {
        existing.value += t.amount
      } else {
        acc.push({ 
          name: catName, 
          value: t.amount, 
          color: t.categories?.color || "#6b7280" 
        })
      }
      return acc
    }, [] as { name: string; value: number; color: string }[])
    .sort((a, b) => b.value - a.value)

  // Overall tree health
  const overallHealth = Math.round((rootsHealth + trunkHealth + growthLevel) / 3)

  // Generate personalized garden tips
  const gardenTips = []
  if (rootsHealth < 60) {
    gardenTips.push({ icon: Heart, text: "Water your roots! Make more mindful financial choices in daily challenges.", color: "#8b5cf6" })
  }
  if (trunkHealth < 60) {
    gardenTips.push({ icon: Droplets, text: "Your trunk needs attention. Try to reduce unnecessary spending to strengthen it.", color: "#22c55e" })
  }
  if (growthLevel < 50) {
    gardenTips.push({ icon: Sun, text: "Give your tree more sunlight! Increase your savings to help it grow taller.", color: "#eab308" })
  }
  if (pestsCount > 2) {
    gardenTips.push({ icon: Wind, text: "Blow away the pests! Avoid impulsive spending decisions.", color: "#f97316" })
  }
  if (gardenTips.length === 0) {
    gardenTips.push({ icon: Sparkles, text: "Your money tree is flourishing! Keep nurturing it with good habits.", color: "#22c55e" })
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pt-8 lg:pt-0">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <TreeDeciduous className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Your Money Tree
          </h1>
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Watch your financial health grow! Your habits are the roots, spending is the trunk, 
          savings help it grow, and goals become sweet fruits.
        </p>
      </div>

      {/* Tree Visualization */}
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
        
        {/* Overall Health Badge */}
        <div className="absolute top-4 right-4 glass-card rounded-xl px-4 py-2 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${overallHealth >= 70 ? 'bg-green-500' : overallHealth >= 40 ? 'bg-yellow-500' : 'bg-orange-500'} animate-pulse`} />
          <span className="text-sm font-medium text-foreground">Tree Health: {overallHealth}%</span>
        </div>

        <FinancialTree 
          rootsHealth={rootsHealth}
          trunkHealth={trunkHealth}
          growthLevel={growthLevel}
          fruitsCount={fruitsCount}
          pestsCount={pestsCount}
        />

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-muted-foreground">Roots = Money Habits</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Trunk = Spending Health</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
            <Leaf className="w-3 h-3 text-lime-500" />
            <span className="text-muted-foreground">Leaves = Savings Growth</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
            <Apple className="w-3 h-3 text-pink-400" />
            <span className="text-muted-foreground">Fruits = Goals Met</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30">
            <Bug className="w-3 h-3 text-stone-400" />
            <span className="text-muted-foreground">Pests = Bad Habits</span>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthCard 
          icon={Heart}
          label="Roots (Habits)"
          value={Math.round(rootsHealth)}
          description="Based on your daily challenge choices"
          color="#8b5cf6"
        />
        <HealthCard 
          icon={TreeDeciduous}
          label="Trunk (Spending)"
          value={Math.round(trunkHealth)}
          description="How well you manage your expenses"
          color="#22c55e"
        />
        <HealthCard 
          icon={Leaf}
          label="Growth (Savings)"
          value={Math.round(growthLevel)}
          description="Your savings rate and progress"
          color="#84cc16"
        />
        <HealthCard 
          icon={Apple}
          label="Fruits (Goals)"
          value={Math.round(goalProgress)}
          description={`${fruitsCount} goal milestones reached!`}
          color="#f472b6"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Total Earned</p>
          <p className="text-3xl font-bold text-green-500">${totalIncome.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Sunlight for your tree</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <p className="text-3xl font-bold text-pink-400">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Water usage</p>
        </div>
        <div className="glass-card rounded-2xl p-5 text-center space-y-1">
          <p className="text-sm text-muted-foreground">Net Savings</p>
          <p className={`text-3xl font-bold ${netSavings >= 0 ? 'text-primary' : 'text-orange-400'}`}>
            ${Math.abs(netSavings).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Growth nutrients</p>
        </div>
      </div>

      {/* Spending Breakdown Visual */}
      {categoryData.length > 0 && (
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Where Your Water Goes (Spending)
          </h3>
          <div className="space-y-3">
            {categoryData.slice(0, 5).map((cat, index) => {
              const percentage = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0
              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-foreground">{cat.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">${cat.value.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: cat.color,
                        boxShadow: `0 0 10px ${cat.color}50`
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Garden Tips */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Garden Tips for Your Money Tree</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {gardenTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-colors"
              >
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${tip.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: tip.color }} />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{tip.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Goal Progress */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Apple className="w-5 h-5 text-pink-400" />
          Fruit Harvest Progress (Your Goal)
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ${(profile?.total_savings || netSavings).toLocaleString()} saved
              </span>
              <span className="text-foreground font-medium">
                Goal: ${profile?.savings_goal?.toLocaleString() || 0}
              </span>
            </div>
            <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-primary transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Apple 
                key={i} 
                className={`w-6 h-6 transition-all ${i < fruitsCount ? 'text-pink-400' : 'text-muted/30'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {fruitsCount === 0 && "Keep saving to grow your first fruit!"}
          {fruitsCount > 0 && fruitsCount < 5 && `Amazing! You've grown ${fruitsCount} fruit${fruitsCount > 1 ? 's' : ''}! Keep going!`}
          {fruitsCount === 5 && "Congratulations! Your tree is fully loaded with fruits!"}
        </p>
      </div>
    </div>
  )
}
