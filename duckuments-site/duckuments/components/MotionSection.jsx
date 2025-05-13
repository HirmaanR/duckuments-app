"use client";

import { AnimatePresence, motion } from "motion/react";

const MotionSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.6, easing: "ease-out" }}
    >
      {children}
    </motion.div>
  );
};

const LayoutMotionSection = ({ children }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const HideMotionSection = ({ children, isVisible }) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible ? <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
        : null}
    </AnimatePresence>
  )
}

const BlurMotion = ({ children }) => {
  return (
    <motion.div
      initial={{ filter: "blur(30px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// TODO : set motion for plus and delete button 
const RotateMotion = ({ children, isVisible }) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible ? <motion.div
        initial={{ '--rotate': '0deg' }}
        animate={{ '--rotate': '90deg' }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.div>
        : null}
    </AnimatePresence>
  )
}

export { MotionSection, LayoutMotionSection, HideMotionSection, BlurMotion, RotateMotion };
