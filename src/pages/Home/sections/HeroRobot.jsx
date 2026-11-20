// src/pages/Home/sections/HeroRobot.jsx
//
// 3D black & white robot on the right of the hero.
//   • eyes, head and body turn towards the mouse cursor
//   • hover the robot and it waves
//   • floats, blinks and its antenna sways
// On phones (no mouse) it looks around by itself.
// Three.js is loaded separately (lazy), so the rest of the page loads fast.

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroRobot = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Load Three.js + build the scene
  useEffect(() => {
    let cancelled = false;
    let api = null;
    import('./robotScene').then(({ createRobotScene }) => {
      if (cancelled || !mountRef.current) return;
      try {
        api = createRobotScene(mountRef.current, { reduceMotion });
        sceneRef.current = api;
        setReady(true);
      } catch {
        // WebGL not available – the soft glow stays as a fallback
      }
    });
    return () => {
      cancelled = true;
      sceneRef.current = null;
      if (api) api.dispose();
    };
  }, [reduceMotion]);

  // Follow the mouse (or look around by itself on touch screens)
  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (hasMouse) {
      const onMove = (e) => {
        const el = mountRef.current;
        if (!el || !sceneRef.current) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.3;
        const nx = (e.clientX - cx) / (window.innerWidth * 0.5);
        const ny = (e.clientY - cy) / (window.innerHeight * 0.5);
        sceneRef.current.setLook(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)));
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }
    if (reduceMotion) return undefined;
    const spots = [[0, 0], [-0.7, -0.2], [0.6, 0.2], [0.2, -0.5], [-0.4, 0.4], [0, 0]];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % spots.length;
      sceneRef.current?.setLook(spots[i][0], spots[i][1]);
    }, 1800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      className="rb"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 40 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      onMouseEnter={() => sceneRef.current?.setWaving(true)}
      onMouseLeave={() => sceneRef.current?.setWaving(false)}
      onContextMenu={(e) => e.preventDefault()}
      aria-hidden="true"
    >
      <span className="rb-halo" />
      <span className="rb-floor" />
      <div ref={mountRef} className="rb-canvas" />

      <style>{`
        .rb {
          /* sized by the screen height so the whole hero fits on one screen */
          position: relative; height: min(calc(100svh - 290px), 600px); width: auto; max-width: 34vw; aspect-ratio: 3 / 4;
          flex-shrink: 0;
        }
        .rb-canvas { position: absolute; inset: 0; z-index: 1; }
        /* the robot can't be saved: no right-click menu, no drag, no long-press "Save image" */
        .rb, .rb-canvas, .rb-canvas canvas {
          -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; -webkit-user-drag: none;
        }
        .rb-canvas canvas { display: block; width: 100% !important; height: 100% !important; }
        .rb-halo {
          position: absolute; left: 50%; top: 40%; width: 115%; aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 40%, transparent 68%);
        }
        .rb-floor {
          position: absolute; left: 50%; bottom: 4%; width: 48%; height: 5%;
          transform: translateX(-50%); border-radius: 50%; pointer-events: none;
          background: radial-gradient(ellipse, rgba(255,255,255,0.14), transparent 70%);
          filter: blur(4px);
        }
      `}</style>
    </motion.div>
  );
};

export default HeroRobot;
