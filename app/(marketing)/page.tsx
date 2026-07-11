"use client";

import Link from "next/link";
import { Shield, ArrowRight, CheckCircle, Database, Globe, Activity, Bot, BarChart3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-32 pb-40 overflow-hidden perspective-1000">
      {/* 3D Animated Background Shapes */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full border-[100px] border-white/10 opacity-60 backdrop-blur-3xl -z-10 shadow-[inset_0_0_100px_rgba(255,255,255,0.4)]"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-20%] w-[1200px] h-[1200px] rounded-full border-[60px] border-white/5 opacity-50 backdrop-blur-xl -z-10"
      />
      
      {/* Intense light flares */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <motion.div 
        style={{ opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* Left Content */}
        <div className="lg:col-span-7 z-10">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel-heavy text-sm font-bold text-white mb-10 shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]" />
            Trusted by enterprise compliance teams
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-7xl sm:text-8xl lg:text-[7rem] font-bold text-white leading-[1.0] tracking-tighter mb-8 drop-shadow-2xl">
            Elevate your <br />
            <span className="text-gradient-white">compliance</span> <br />
            with AI.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl sm:text-3xl text-white/90 mb-12 max-w-2xl leading-relaxed tracking-tight font-medium drop-shadow-md">
            Discover how our globally distributed, agent-driven ledger transforms vendor risk management with unmatched auditability.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-[#FF5E00] text-lg font-black hover:bg-white/90 hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Get Started
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full glass-panel-heavy text-white text-lg font-bold hover:bg-white/20 transition-all">
              Discover More
            </Link>
          </motion.div>
        </div>

        {/* Right Graphic (Floating 3D Glass Card) */}
        <motion.div 
          variants={fadeInUp}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="lg:col-span-5 relative z-10"
        >
          <div className="relative w-full aspect-[4/5] rounded-[3rem] glass-panel-heavy p-3 shadow-2xl overflow-hidden group border-white/40">
             <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#FF6A00]/80 to-[#FF3D00]/80 border border-white/20 flex flex-col p-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                    <div className="w-3 h-3 rounded-full bg-white/40" />
                  </div>
                  <div className="h-5 w-28 bg-white/20 rounded-full" />
                </div>
                
                <div className="flex-1 flex flex-col justify-end space-y-6">
                  <div className="h-32 rounded-2xl bg-white/10 border border-white/30 w-full relative overflow-hidden backdrop-blur-xl flex items-end">
                    <div className="absolute top-4 left-4 h-4 w-24 bg-white/30 rounded-full" />
                    {/* Simulated chart bars */}
                    <div className="flex items-end gap-3 px-4 h-20 w-full">
                      {[40, 70, 45, 90, 60, 85].map((h, i) => (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-white/80 to-white/20 rounded-t-lg"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-20 rounded-2xl glass-panel w-full flex items-center px-5 gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                       <CheckCircle className="w-6 h-6 text-[#FF5E00]" />
                    </div>
                    <div>
                      <div className="h-4 w-40 bg-white/60 rounded-full mb-2" />
                      <div className="h-3 w-24 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="py-24 border-y border-white/10 bg-white/5 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-base font-bold tracking-[0.3em] text-white/60 uppercase mb-12">Powered By Industry Leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12">
          {["CockroachDB", "AWS Global", "SOC2 Assure", "ISO Certify", "GDPR Cloud"].map((partner) => (
            <motion.div 
              whileHover={{ scale: 1.1, color: "rgba(255,255,255,1)" }}
              key={partner} 
              className="text-2xl font-black tracking-tight text-white/50 cursor-pointer transition-colors"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel font-bold text-white mb-8 border-white/20 uppercase tracking-widest text-sm">
            Solutions
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-tight drop-shadow-xl">
            Streamline <br/> complex tasks.
          </h2>
          <p className="text-2xl text-white/80 mb-12 leading-relaxed font-medium">
            Automate routine vendor document reviews, freeing up your compliance team to focus on strategic risk mitigation while our AI agents build the audit trail.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard" className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#FF5E00] text-lg font-bold hover:scale-105 transition-all shadow-xl">
              Launch Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-[4rem] glass-panel-heavy border-white/30 p-10 shadow-2xl relative">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[4rem]" />
             
             {/* Floating Animated Elements */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 -right-12 w-72 p-6 glass-panel-heavy rounded-[2rem] rotate-[-5deg] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-white/40"
             >
               <div className="flex gap-4 items-center mb-4">
                 <div className="p-3 bg-white rounded-full">
                    <Bot className="w-6 h-6 text-[#FF5E00]" />
                 </div>
                 <div className="h-3 w-32 bg-white/40 rounded-full" />
               </div>
               <div className="h-2.5 w-full bg-white/20 rounded-full mb-3" />
               <div className="h-2.5 w-4/5 bg-white/20 rounded-full" />
             </motion.div>
             
             <motion.div 
               animate={{ y: [10, -10, 10] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-10 -left-12 w-80 p-6 glass-panel-heavy rounded-[2rem] rotate-[5deg] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-white/40"
             >
               <div className="flex justify-between items-center mb-6">
                 <div className="p-3 bg-white rounded-full">
                    <Database className="w-6 h-6 text-[#FF5E00]" />
                 </div>
                 <span className="text-xs font-black text-[#FF5E00] px-3 py-1.5 rounded-full bg-white uppercase tracking-wider">Synced</span>
               </div>
               <div className="space-y-3">
                 <div className="h-2.5 w-full bg-white/30 rounded-full" />
                 <div className="h-2.5 w-full bg-white/30 rounded-full" />
                 <div className="h-2.5 w-2/3 bg-white/30 rounded-full" />
               </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function KeyFeaturesSection() {
  const keys = [
    { num: "01", title: "Simplify complex workflows.", desc: "Our AI automates repetitive tasks across compliance departments, from extracting controls to scoring risk, dramatically reducing manual effort." },
    { num: "02", title: "Unlock actionable intelligence.", desc: "The platform provides deep insights, turning raw vendor documents into structured, queryable data for improved vendor selection." },
    {num: "03", title: "Connect global regions.", desc: "Backed by CockroachDB, LedgerGuard maintains a strongly consistent audit trail across US, EU, and APAC seamlessly." }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-[5rem] font-black text-white tracking-tighter drop-shadow-xl leading-tight"
        >
          Intelligent <br/> Architecture
        </motion.h2>
      </div>

      <div className="space-y-48">
        {keys.map((k, i) => (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            key={k.num} 
            className={`flex flex-col gap-20 ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
          >
            {/* Text Side */}
            <motion.div variants={fadeInUp} className="flex-1">
              <div className="text-lg font-black tracking-[0.3em] text-white/50 uppercase mb-8">
                {k.num}
              </div>
              <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-tight drop-shadow-lg">
                {k.title}
              </h3>
              <p className="text-2xl text-white/90 mb-12 leading-relaxed font-medium">
                {k.desc}
              </p>
            </motion.div>

            {/* Graphic Side */}
            <motion.div variants={fadeInUp} className="flex-1 w-full">
              <div className="aspect-video rounded-[3rem] glass-panel-heavy border-white/30 p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                
                {/* Massive internal shape */}
                <motion.div 
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-[4rem] rotate-12 blur-2xl" 
                />

                <div className="relative z-10 w-full h-full border border-white/20 rounded-2xl bg-black/10 backdrop-blur-md p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl">
                        {i === 0 ? <Activity className="w-8 h-8 text-[#FF5E00]"/> : i === 1 ? <BarChart3 className="w-8 h-8 text-[#FF5E00]"/> : <Globe className="w-8 h-8 text-[#FF5E00]"/>}
                     </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-white/40 rounded-full" />
                    <div className="h-3 w-4/5 bg-white/30 rounded-full" />
                    <div className="h-3 w-1/2 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-40 px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto glass-panel-heavy border-white/40 rounded-[4rem] p-20 md:p-32 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        
        <h2 className="text-6xl md:text-[6rem] font-black text-white tracking-tighter mb-10 relative z-10 drop-shadow-2xl leading-tight">
          Ready to transform <br/> compliance?
        </h2>
        <p className="text-2xl text-white/90 mb-16 max-w-3xl mx-auto relative z-10 font-medium">
          Join leading enterprises that trust LedgerGuard AI for globally consistent, agentic vendor management.
        </p>
        <div className="flex justify-center relative z-10">
          <Link href="/signup" className="flex items-center gap-3 px-12 py-6 rounded-full bg-white text-[#FF5E00] text-xl font-black hover:scale-105 transition-all shadow-2xl">
            Create Free Account
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/20 pt-24 pb-12 px-6 bg-white/5 backdrop-blur-xl relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <Shield className="w-6 h-6 text-[#FF5E00]" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">LedgerGuard AI</span>
          </div>
          <div className="flex gap-10">
            {["Twitter", "LinkedIn", "GitHub"].map((link) => (
               <Link key={link} href="#" className="text-lg font-bold text-white/70 hover:text-white transition-colors">{link}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-base font-medium text-white/50">
          <p>© 2026 LedgerGuard AI. Global Compliance.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <PartnersSection />
      <SolutionsSection />
      <KeyFeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
