'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ 
      background: 'var(--color-bg)', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Background grid */}
      <div className="gridBg" style={{ opacity: 0.6 }} />

      {/* Futuristic soft gradient background glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        maxWidth: '640px'
      }}>
        {/* Pill Badge */}
        <motion.div 
          className="badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            borderColor: 'rgba(239, 68, 68, 0.15)', 
            background: 'rgba(239, 68, 68, 0.04)',
            color: '#ef4444' 
          }}
        >
          <span className="badgePulse" style={{ background: '#ef4444' }} />
          <span>STATUS: 404 NOT FOUND</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="timelineTitle"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}
        >
          Lost in the <span style={{ color: '#8b5cf6' }}>core</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          The page or workspace path you requested does not exist on this shard. It might have been moved, renamed, or is temporarily offline.
        </motion.p>

        {/* Faux Terminal Console */}
        <motion.div 
          className="commandConsole"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ 
            width: '100%', 
            maxWidth: '460px', 
            margin: '0 auto 3rem auto',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div className="consoleHeader">
            <div className="consoleDots">
              <span className="consoleDot" style={{ background: '#ef4444', opacity: 1 }} />
              <span className="consoleDot" style={{ background: '#f97316', opacity: 1 }} />
              <span className="consoleDot" style={{ background: '#22c55e', opacity: 1 }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#ef4444', fontWeight: 600 }}>SYSTEM_DIAGNOSTICS</span>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            textAlign: 'left', 
            fontFamily: 'monospace', 
            fontSize: '0.8rem', 
            lineHeight: '1.6', 
            background: '#ffffff',
            color: 'var(--color-fg-muted)' 
          }}>
            <div><span style={{ color: '#ef4444' }}>&gt; ERR_ROUTE_NOT_FOUND:</span> path resolution failed</div>
            <div>&gt; query_hash: 0x8F3D129C...</div>
            <div>&gt; checking local indices... [0 matches]</div>
            <div>&gt; auto_recovery: suggested redirect path loaded</div>
            <div style={{ color: '#22c55e', marginTop: '0.5rem' }}>&gt; READY_TO_NAVIGATE: system ok</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="ctaGroup"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          style={{ gap: '1rem', width: '100%', justifyContent: 'center' }}
        >
          <Link href="/" className="primaryCta" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
            Back to Dashboard
          </Link>
          <Link href="/#features" className="secondaryCta" style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}>
            Explore Features
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
