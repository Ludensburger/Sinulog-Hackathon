export const PREMIUM_EASE = [0.16, 1, 0.3, 1]; // "The Premium Feel"
export const DURATION_FAST = 0.2;
export const DURATION_MEDIUM = 0.4;
export const DURATION_SLOW = 0.6;

// Staggered container for lists (Listings, Features, CMA data)
// Psychology: Discovery & processing time. Prevents data overwhelm.
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 80ms stagger
      delayChildren: 0.05,
    },
  },
};

// Item reveal (Cards, List items)
// Psychology: "Rising up" implies value and solidity.
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: PREMIUM_EASE,
      duration: DURATION_MEDIUM,
    },
  },
};

// Property Card Hover
// Psychology: Tactile feedback. "Lifting" the object to examine it closer.
export const cardHoverVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)", // Premium soft shadow
    transition: {
      type: "tween",
      ease: PREMIUM_EASE,
      duration: DURATION_FAST,
    },
  },
  tap: {
    scale: 0.98, // Subtle "press" feeling on mobile
    transition: {
      duration: 0.1,
    },
  },
};

// Page Transition
// Psychology: Smooth continuity between states.
export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: DURATION_MEDIUM,
      ease: PREMIUM_EASE
    }
  },
  exit: { opacity: 0, y: -10 }
};

// Success/Completion
// Psychology: Celebration and validation of choice.
export const successScaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};
