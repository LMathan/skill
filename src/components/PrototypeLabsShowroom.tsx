"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Cpu, Activity, Radio, AlertTriangle, Play, RefreshCw, 
  Droplet, Eye, Trash2, Shield, Wind, Server, Battery, Zap 
} from "lucide-react"
import Image from "next/image"

interface Prototype {
  id: string
  title: string
  category: string
  image: string
  mcu: string
  firmware: string
  protocols: string[]
  shortDesc: string
  liveSpecs: string[]
}

const prototypesData: Prototype[] = [
  {
    id: "quadcopter",
    title: "F450 Quadcopter UAV",
    category: "Robotics & Flight Systems",
    image: "/gallery/iot/f450-quadcopter-drone-uav-assembly.jpeg",
    mcu: "APM 2.8 Flight Controller",
    firmware: "ArduPilot C++ Core",
    protocols: ["PWM", "433MHz Radio", "GPS NMEA"],
    shortDesc: "Quad-rotor drone with brushless motor telemetry and PID flight stabilizing variables.",
    liveSpecs: ["Brushless Motors: A2212 2200KV", "ESC: 30A SimonK Drivers", "RF Receiver: FlySky IA6B"]
  },
  {
    id: "irrigation",
    title: "Smart Irrigation & Water Flow",
    category: "Industrial IoT",
    image: "/gallery/iot/smart-irrigation-system-esp8266-arduino-sensors.jpeg",
    mcu: "ESP8266 NodeMCU & UNO",
    firmware: "Zephyr RTOS C++ Node",
    protocols: ["MQTT", "Wi-Fi (TLS 1.3)", "I2C"],
    shortDesc: "Capacitive moisture telemetry driving automated solenoid flow rates with local data fail-safes.",
    liveSpecs: ["Capacitive Soil Sensor v1.2", "Flow Sensor: YF-S201 Hall", "Pump: Submersible 12V DC"]
  },
  {
    id: "waste-monitor",
    title: "AI Smart Waste Monitoring Node",
    category: "AI & Computer Vision",
    image: "/gallery/iot/ai-smart-waste-monitoring-system-dashboard.png",
    mcu: "Raspberry Pi 4 / USB Camera",
    firmware: "Python TensorFlow Edge",
    protocols: ["HTTPS REST", "USB Telemetry", "WebSockets"],
    shortDesc: "Computer vision waste classifier calculating real-time container volume percentages.",
    liveSpecs: ["Optical Vision Sensor Module", "Fill Level: Ultrasonic HC-SR04", "Local Edge Classifier Node"]
  },
  {
    id: "eye-blink-car",
    title: "Eye-Blink Controlled Car",
    category: "Assistive Robotics",
    image: "/gallery/iot/eye-blink-car-obstacle-avoidance-front-view.jpeg",
    mcu: "Arduino UNO Core",
    firmware: "Bare-Metal Embedded C",
    protocols: ["Logic Gates", "Ultrasonic Echo", "ADC Trigger"],
    shortDesc: "Biomedical control interface guiding a mobile chassis with automatic brake triggers.",
    liveSpecs: ["Sensor: IR Eye-Blink Module", "Rangefinder: HC-SR04", "Motor Driver: L298N Dual-H Bridge"]
  },
  {
    id: "leakage-detect",
    title: "Water Pipeline Leakage Tracker",
    category: "Infrastructure IoT",
    image: "/gallery/iot/iot-water-leakage-detection-system-hardware.jpeg",
    mcu: "NodeMCU ESP8266",
    firmware: "Arduino C Framework",
    protocols: ["MQTT", "Blynk IoT Cloud", "WebSockets"],
    shortDesc: "Pipeline leakage detection comparing multi-point Hall flow rates with automated alerts.",
    liveSpecs: ["Dual YF-S201 Flow Sensors", "Local Indicator: 16x2 LCD", "Alert: Piezo Buzzer & Cloud Notify"]
  }
]

export default function PrototypeLabsShowroom() {
  const [activeProto, setActiveProto] = useState<string>("quadcopter")
  const currentProto = prototypesData.find(p => p.id === activeProto) || prototypesData[0]

  // Quadcopter Simulator States
  const [qcArmed, setQcArmed] = useState(false)
  const [qcThrottle, setQcThrottle] = useState(0)
  const [qcBattery, setQcBattery] = useState(100)
  const [qcAltitude, setQcAltitude] = useState(0)
  const [qcLogs, setQcLogs] = useState<string[]>(["[SYS] APM 2.8 initialized successfully.", "[RF] Connection established with FlySky FS-i6."])

  // Irrigation Simulator States
  const [irrPump, setIrrPump] = useState(false)
  const [irrMoisture, setIrrMoisture] = useState(24)
  const [irrFlow, setIrrFlow] = useState(0)
  const [irrLogs, setIrrLogs] = useState<string[]>(["[SYS] ESP8266 Online.", "[SEN] Capacitive soil moisture reading: 24% (DRY)."])

  // AI Waste Simulator States
  const [aiBinFill, setAiBinFill] = useState(38)
  const [aiItemType, setAiItemType] = useState<string>("None")
  const [aiClass, setAiClass] = useState<string>("N/A")
  const [aiConf, setAiConf] = useState(0)
  const [aiScanning, setAiScanning] = useState(false)
  const [aiLogs, setAiLogs] = useState<string[]>(["[AI] TensorFlow Lite model compiled successfully.", "[SYS] Bin level sensor active: 38%."])

  // Eye Blink Simulator States
  const [ebObstacle, setEbObstacle] = useState(false)
  const [ebDistance, setEbDistance] = useState(140)
  const [ebCarState, setEbCarState] = useState<string>("STOPPED")
  const [ebLogs, setEbLogs] = useState<string[]>(["[SYS] Arduino Core running.", "[SEN] Ultrasonic rangefinder active: 140cm."])

  // Leakage Simulator States
  const [lkActive, setLkActive] = useState(false)
  const [lkFlowA, setLkFlowA] = useState(18.2)
  const [lkFlowB, setLkFlowB] = useState(18.1)
  const [lkLogs, setLkLogs] = useState<string[]>(["[SYS] Dual sensor grid activated.", "[MQTT] Telemetry streaming to AWS Timestream."])

  // Tick timers for active simulators
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Drone battery / telemetry decay
      if (qcArmed) {
        setQcBattery(prev => {
          const next = Math.max(0, prev - (qcThrottle > 0 ? (qcThrottle * 0.05 + 0.1) : 0.02))
          if (next === 0 && prev > 0) {
            setQcArmed(false)
            setQcThrottle(0)
            setQcLogs(l => [`[WARN] BATTERY CRITICAL. System disarmed.`, ...l])
          }
          return next
        })
        setQcAltitude(prev => {
          const targetAlt = (qcThrottle / 100) * 45
          const diff = targetAlt - prev
          return parseFloat((prev + diff * 0.15).toFixed(1))
        })
      } else {
        setQcAltitude(prev => parseFloat(Math.max(0, prev - 1.2).toFixed(1)))
      }

      // 2. Irrigation simulation drift
      if (irrPump) {
        setIrrMoisture(prev => {
          const next = Math.min(85, prev + 0.9)
          if (next >= 80 && prev < 80) {
            setIrrPump(false)
            setIrrFlow(0)
            setIrrLogs(l => [`[VALVE] Automated cutoff: optimal moisture reached (${next.toFixed(0)}%).`, ...l])
          }
          return parseFloat(next.toFixed(1))
        })
        setIrrFlow(prev => parseFloat((11.8 + Math.random() * 0.8).toFixed(1)))
      } else {
        setIrrMoisture(prev => parseFloat(Math.max(18, prev - 0.08).toFixed(1)))
        setIrrFlow(0)
      }

      // 3. Water Leakage simulation
      if (lkActive) {
        setLkFlowA(prev => parseFloat((45.2 + Math.random() * 1.5).toFixed(1)))
        setLkFlowB(prev => parseFloat((28.4 + Math.random() * 0.9).toFixed(1)))
      } else {
        const val = 15.0 + Math.random() * 0.5
        setLkFlowA(parseFloat(val.toFixed(1)))
        setLkFlowB(parseFloat((val + (Math.random() * 0.2 - 0.1)).toFixed(1)))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [qcArmed, qcThrottle, irrPump, lkActive])

  // Simulator helper trigger actions
  const triggerDroneArm = () => {
    if (qcArmed) {
      setQcArmed(false)
      setQcThrottle(0)
      setQcLogs(prev => [`[SYS] Armed state override: SYSTEM DISARMED.`, ...prev])
    } else {
      if (qcBattery < 5) {
        setQcLogs(prev => [`[ERR] Battery too low to arm drone.`, ...prev])
        return
      }
      setQcArmed(true)
      setQcLogs(prev => [`[SYS] Motors armed. Standby for hover throttle.`, ...prev])
    }
  }

  const triggerIrrToggle = () => {
    const next = !irrPump
    setIrrPump(next)
    if (next) {
      setIrrFlow(12.2)
      setIrrLogs(prev => [`[VALVE] Solenoid valve OPEN. Water flow initialized.`, ...prev])
    } else {
      setIrrFlow(0)
      setIrrLogs(prev => [`[VALVE] Solenoid valve CLOSED. Water flow stopped.`, ...prev])
    }
  }

  const triggerAiScan = () => {
    if (aiScanning) return
    setAiScanning(true)
    setAiLogs(l => [`[AI] Camera feed captured. Processing inference...`, ...l])

    const items = [
      { name: "Water Bottle", cat: "Recyclable (Plastic)", fill: 6 },
      { name: "Soda Can", cat: "Recyclable (Metal)", fill: 4 },
      { name: "Coffee Cup", cat: "Non-Recyclable (Mixed)", fill: 8 },
      { name: "Cardboard Box", cat: "Recyclable (Paper)", fill: 12 },
      { name: "Apple Core", cat: "Organic (Compost)", fill: 5 }
    ]
    const chosen = items[Math.floor(Math.random() * items.length)]

    setTimeout(() => {
      setAiItemType(chosen.name)
      setAiClass(chosen.cat)
      setAiConf(parseFloat((95.4 + Math.random() * 4).toFixed(1)))
      setAiBinFill(prev => Math.min(100, prev + chosen.fill))
      setAiScanning(false)
      setAiLogs(l => [
        `[AI] Detected: ${chosen.name} (${chosen.cat}) | Conf: ${(95.4 + Math.random() * 4).toFixed(1)}%`,
        `[SYS] Ultrasonic capacity telemetry updated: ${Math.min(100, aiBinFill + chosen.fill)}% filled.`,
        ...l
      ])
    }, 1500)
  }

  const triggerBlink = () => {
    if (ebObstacle) {
      setEbLogs(l => [`[ALERT] Command ignored. Front obstacle blocking safety system.`, ...l])
      return
    }
    const states = ["FORWARD", "LEFT", "RIGHT"]
    const nextState = states[Math.floor(Math.random() * states.length)]
    setEbCarState(nextState)
    setEbLogs(l => [`[EEG] IR Blink Detected -> Steering: ${nextState}.`, ...l])
    setTimeout(() => {
      setEbCarState("STOPPED")
      setEbLogs(l => [`[EEG] Idle blink frame -> State: STOPPED.`, ...l])
    }, 2000)
  }

  const triggerObstacleToggle = () => {
    const next = !ebObstacle
    setEbObstacle(next)
    if (next) {
      setEbDistance(12)
      setEbCarState("BRAKE")
      setEbLogs(l => [`[WARN] HC-SR04 triggers critical distance (12cm)! Brakes forced.`, ...l])
    } else {
      setEbDistance(135)
      setEbCarState("STOPPED")
      setEbLogs(l => [`[SEN] Sensor cleared. Distance reset to 135cm.`, ...l])
    }
  }

  const triggerLeakageToggle = () => {
    const next = !lkActive
    setLkActive(next)
    if (next) {
      setLkLogs(l => [
        `[ALERT] Flow rate mismatch detected.`,
        `[ALERT] Sensor A: 45.2 L/m | Sensor B: 28.4 L/m (Delta: 16.8 L/m).`,
        `[MQTT] Leak coordinates published: Lat 11.23, Long 77.49`,
        ...l
      ])
    } else {
      setLkLogs(l => [`[SYS] Network balanced. Leakage alarm disarmed.`, ...l])
    }
  }

  return (
    <section className="bg-slate-50/40 border border-slate-200/50 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm select-none">
      {/* Dynamic Background Grids */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar navigation of hardware prototypes */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="pb-3 border-b border-slate-200/50">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-mono">SkillForge Labs</span>
            <h3 className="font-extrabold text-slate-900 text-lg font-display">Active Prototypes</h3>
          </div>

          <div className="space-y-2.5">
            {prototypesData.map(proto => {
              const isActive = activeProto === proto.id
              return (
                <button
                  key={proto.id}
                  onClick={() => setActiveProto(proto.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 relative group flex gap-4 items-center cursor-pointer ${
                    isActive 
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10" 
                      : "bg-white/60 border-slate-200/60 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${
                    isActive 
                      ? "bg-slate-800 border-slate-700 text-blue-400" 
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                    {proto.id === "quadcopter" && <Wind size={18} />}
                    {proto.id === "irrigation" && <Droplet size={18} />}
                    {proto.id === "waste-monitor" && <Trash2 size={18} />}
                    {proto.id === "eye-blink-car" && <Eye size={18} />}
                    {proto.id === "leakage-detect" && <Radio size={18} />}
                  </div>

                  <div className="space-y-0.5">
                    <span className={`text-[8px] font-extrabold uppercase tracking-widest block font-mono ${
                      isActive ? "text-slate-400" : "text-slate-400"
                    }`}>{proto.category}</span>
                    <h4 className="font-bold text-xs sm:text-sm font-display leading-tight">{proto.title}</h4>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveBorder"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side: Showcase Viewfinder and interactive simulation console */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full min-h-[580px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProto.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 flex-grow flex flex-col justify-between"
            >
              <div>
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 font-mono block">
                      {currentProto.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-xl font-display mt-0.5">
                      {currentProto.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[8px] bg-slate-900 text-slate-100 border border-slate-800 px-2 py-0.5 rounded font-mono font-bold">
                      {currentProto.mcu}
                    </span>
                    <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded font-mono font-bold">
                      {currentProto.firmware}
                    </span>
                  </div>
                </div>

                {/* Subcontent: Picture & Simulator split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
                  
                  {/* Left picture & spec chips */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-50">
                      <Image
                        src={currentProto.image}
                        alt={currentProto.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 block font-mono">Hardware Nodes</span>
                      <ul className="space-y-1.5">
                        {currentProto.liveSpecs.map((spec, i) => (
                          <li key={i} className="text-[10px] text-slate-600 font-medium flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Live Simulator Pane */}
                  <div className="md:col-span-7 bg-slate-950 text-slate-200 rounded-xl p-5 font-mono text-xs flex flex-col justify-between border border-slate-800 shadow-inner min-h-[280px]">
                    <div className="space-y-4">
                      {/* Telemetry Simulator Header */}
                      <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Live R&D Telemetry</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-bold">PROTO-SIM v2.4</span>
                      </div>

                      {/* ── SIMULATORS ENGINE RENDER ── */}
                      {currentProto.id === "quadcopter" && (
                        <div className="space-y-4.5">
                          <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-slate-400 text-[10px]">Flight Power Rail:</span>
                            <button
                              onClick={triggerDroneArm}
                              className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1.5 cursor-pointer ${
                                qcArmed 
                                  ? "bg-red-500 text-white hover:bg-red-600" 
                                  : "bg-blue-600 text-white hover:bg-blue-500"
                              }`}
                            >
                              {qcArmed ? <Zap size={10} /> : <Play size={10} />}
                              <span>{qcArmed ? "DISARM" : "ARM CORE"}</span>
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400">Throttle Input:</span>
                              <span className="text-blue-400 font-bold">{qcThrottle}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              disabled={!qcArmed}
                              value={qcThrottle}
                              onChange={(e) => setQcThrottle(parseInt(e.target.value))}
                              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2.5 pt-1.5">
                            <div className="bg-slate-900/60 border border-slate-850 p-2 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Altitude</span>
                              <span className="text-sm font-extrabold text-white font-display">{qcAltitude}m</span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-850 p-2 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Rotor RPM</span>
                              <span className="text-sm font-extrabold text-blue-400 font-display">
                                {qcArmed ? (qcThrottle * 60) : 0}
                              </span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-850 p-2 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Battery</span>
                              <span className={`text-sm font-extrabold font-display ${qcBattery < 20 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                                {qcBattery.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentProto.id === "irrigation" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-slate-400 text-[10px]">Manual Pump Toggle:</span>
                            <button
                              onClick={triggerIrrToggle}
                              className={`px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer ${
                                irrPump 
                                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400" 
                                  : "bg-blue-600 text-white hover:bg-blue-500"
                              }`}
                            >
                              <span>{irrPump ? "STOP" : "OPEN VALVE"}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg text-center relative overflow-hidden">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Soil Moisture</span>
                              <span className={`text-lg font-extrabold font-display ${irrMoisture < 30 ? "text-red-400" : "text-blue-400"}`}>
                                {irrMoisture}%
                              </span>
                              <span className="text-[7px] text-slate-400 block mt-1">
                                {irrMoisture < 30 ? "WARNING: DRY" : "SOIL SATURATED"}
                              </span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Flow rate</span>
                              <span className="text-lg font-extrabold text-emerald-400 font-display">
                                {irrFlow} L/m
                              </span>
                              <span className="text-[7px] text-slate-400 block mt-1">
                                {irrPump ? "VALVE OPENED" : "FLOW IDLE"}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentProto.id === "waste-monitor" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-slate-400 text-[10px]">Inference Scanner:</span>
                            <button
                              onClick={triggerAiScan}
                              disabled={aiScanning}
                              className="bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1 rounded text-[10px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <RefreshCw size={10} className={aiScanning ? "animate-spin" : ""} />
                              <span>{aiScanning ? "SCANNING..." : "SCAN WASTEBIN ITEM"}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-lg space-y-1.5">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Edge Inference</span>
                              <div className="space-y-1 text-[10px]">
                                <p><span className="text-slate-400">Class:</span> <span className="text-blue-400 font-bold">{aiClass}</span></p>
                                <p><span className="text-slate-400">Item:</span> <span className="text-white font-bold">{aiItemType}</span></p>
                                <p><span className="text-slate-400">Conf:</span> <span className="text-emerald-400 font-bold">{aiConf > 0 ? `${aiConf}%` : "N/A"}</span></p>
                              </div>
                            </div>
                            
                            <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-lg flex flex-col justify-between">
                              <div className="flex justify-between text-[8px] text-slate-500 uppercase font-bold">
                                <span>Ultrasonic Capacity</span>
                                <span className={aiBinFill > 80 ? "text-red-400" : "text-slate-300"}>{aiBinFill}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-500 ${aiBinFill > 80 ? "bg-red-500" : "bg-blue-500"}`}
                                  style={{ width: `${aiBinFill}%` }}
                                />
                              </div>
                              <button 
                                onClick={() => { setAiBinFill(15); setAiLogs(l => [`[SYS] Bin manually emptied. Capacity reset to 15%.`, ...l]) }}
                                className="text-[8px] text-slate-400 underline block text-right mt-1 hover:text-white"
                              >
                                Empty Bin
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentProto.id === "eye-blink-car" && (
                        <div className="space-y-4">
                          <div className="flex gap-3 justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-slate-400 text-[10px]">Control Triggers:</span>
                            <div className="flex gap-2">
                              <button
                                onClick={triggerBlink}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold cursor-pointer"
                              >
                                Trigger Blink
                              </button>
                              <button
                                onClick={triggerObstacleToggle}
                                className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer ${
                                  ebObstacle 
                                    ? "bg-emerald-600 text-white hover:bg-emerald-500" 
                                    : "bg-red-600 text-white hover:bg-red-500"
                                }`}
                              >
                                {ebObstacle ? "Clear Obstacle" : "Simulate Obstacle"}
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Steering Motor State</span>
                              <span className={`text-md font-extrabold font-display tracking-wider block mt-1 ${
                                ebCarState === "BRAKE" ? "text-red-500 animate-pulse" : ebCarState !== "STOPPED" ? "text-emerald-400" : "text-slate-400"
                              }`}>
                                {ebCarState}
                              </span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold">Front Sensor (HC-SR04)</span>
                              <span className={`text-md font-extrabold font-display block mt-1 ${ebDistance < 25 ? "text-red-500 font-bold" : "text-white"}`}>
                                {ebDistance} cm
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentProto.id === "leakage-detect" && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-slate-400 text-[10px]">Flow Integrity:</span>
                            <button
                              className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer ${
                                lkActive 
                                  ? "bg-emerald-600 text-white hover:bg-emerald-500" 
                                  : "bg-red-600 text-white hover:bg-red-500"
                              }`}
                              onClick={triggerLeakageToggle}
                            >
                              <span>{lkActive ? "RESOLVE LEAKAGE" : "INDUCING PIPE THEFT"}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[8px] text-slate-500 block uppercase font-bold">Inlet Flow (A)</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              </div>
                              <span className="text-md font-extrabold text-white font-display block">{lkFlowA} L/m</span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[8px] text-slate-500 block uppercase font-bold">Outlet Flow (B)</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              </div>
                              <span className={`text-md font-extrabold font-display block ${
                                lkActive ? "text-red-400" : "text-white"
                              }`}>{lkFlowB} L/m</span>
                            </div>
                          </div>

                          {lkActive && (
                            <div className="p-2.5 rounded bg-red-950/60 border border-red-900/60 text-red-400 text-[9px] flex items-center gap-2">
                              <AlertTriangle size={12} className="animate-bounce" />
                              <span className="font-bold">SYSTEM HAZARD: Flow mismatch &gt; 15%. Indicated theft coordinate [11.23, 77.49].</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Console Logger Logs */}
                    <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex-grow flex flex-col justify-end">
                      <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Local Core Status Console</span>
                      <div className="bg-black/60 rounded p-2 h-16 overflow-y-auto text-[8px] text-slate-400 space-y-1 scrollbar-none border border-slate-900">
                        {currentProto.id === "quadcopter" && qcLogs.map((log, i) => <div key={i}>{log}</div>)}
                        {currentProto.id === "irrigation" && irrLogs.map((log, i) => <div key={i}>{log}</div>)}
                        {currentProto.id === "waste-monitor" && aiLogs.map((log, i) => <div key={i}>{log}</div>)}
                        {currentProto.id === "eye-blink-car" && ebLogs.map((log, i) => <div key={i}>{log}</div>)}
                        {currentProto.id === "leakage-detect" && lkLogs.map((log, i) => <div key={i}>{log}</div>)}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
