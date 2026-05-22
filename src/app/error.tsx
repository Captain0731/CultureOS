'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error('Captured Runtime Error:', error);
  }, [error]);

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

      {/* Futuristic soft orange/red gradient background glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)',
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ 
            borderColor: 'rgba(249, 115, 22, 0.15)', 
            background: 'rgba(249, 115, 22, 0.04)',
            color: '#f97316' 
          }}
        >
          <span className="badgePulse" style={{ background: '#f97316' }} />
          <span>STATUS: RUNTIME EXCEPTION</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="timelineTitle"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
          style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}
        >
          A glitch in the <span style={{ color: '#f97316' }}>workspace</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          An unexpected error occurred while rendering this view. The system has automatically isolated the boundary to prevent data loss.
        </motion.p>

        {/* Exception Log */}
        <motion.div 
          className="commandConsole"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
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
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#f97316', fontWeight: 600 }}>EXCEPTION_TRACE</span>
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
            <div><span style={{ color: '#ef4444' }}>&gt; ERROR:</span> {error.message || 'Unknown runtime error'}</div>
            {error.digest && <div>&gt; digest: {error.digest}</div>}
            <div>&gt; module_sync: isolated</div>
            <div>&gt; advice: trigger reset state recovery</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="ctaGroup"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
          style={{ gap: '1rem', width: '100%', justifyContent: 'center' }}
        >
          <button 
            onClick={reset}
            className="primaryCta" 
            style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}
          >
            Try Recovery
          </button>
          <Link 
            href="/" 
            className="secondaryCta" 
            style={{ padding: '0.9rem 2rem', fontSize: '0.95rem' }}
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
