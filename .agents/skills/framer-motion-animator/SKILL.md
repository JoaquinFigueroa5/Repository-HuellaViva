---
name: framer-motion-animator
description: Creates smooth animations and micro-interactions using Framer Motion including page transitions, gestures, scroll-based animations, and orchestrated sequences. Use when users request "add animation", "framer motion", "page transition", "animate component", or "micro-interactions".
---

# Framer Motion Animator

Build delightful animations and interactions with Framer Motion's declarative API in JSX/React.

## Core Workflow

1. **Identify animation needs**: Entrance, exit, hover, gestures
2. **Choose animation type**: Simple, variants, gestures, layout
3. **Define motion values**: Opacity, scale, position, rotation
4. **Add transitions**: Duration, easing, spring physics
5. **Orchestrate sequences**: Stagger, delay, parent-child
6. **Optimize performance**: GPU-accelerated properties

## Installation

```bash
npm install framer-motion
```

## Basic Animations

### Simple Animation

```jsx
import { motion } from 'framer-motion';

export function FadeIn({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOnHover({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
```

### Exit Animations with AnimatePresence

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

## Variants Pattern

### Staggered Children

```jsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function StaggeredList({ items }) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Interactive Variants

```jsx
import { motion } from 'framer-motion';

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  disabled: { opacity: 0.5, scale: 1 },
};

export function AnimatedButton({ children, disabled, onClick }) {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? 'disabled' : 'hover'}
      whileTap={disabled ? 'disabled' : 'tap'}
      animate={disabled ? 'disabled' : 'initial'}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      {children}
    </motion.button>
  );
}
```

## Page Transitions

### Next.js App Router

```jsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Shared Layout Animations

```jsx
import { motion, LayoutGroup } from 'framer-motion';

export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <LayoutGroup>
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative px-4 py-2"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-500 rounded-lg"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
```

## Gesture Animations

### Drag

```jsx
import { motion } from 'framer-motion';

export function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      className="w-32 h-32 bg-blue-500 rounded-lg cursor-grab"
    />
  );
}
```

### Swipe to Dismiss

```jsx
import { motion } from 'framer-motion';

export function SwipeToDelete({ onDelete, children }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -100) onDelete();
      }}
      className="relative"
    >
      {children}
      <motion.div
        className="absolute right-0 inset-y-0 bg-red-500 flex items-center px-4"
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Delete
      </motion.div>
    </motion.div>
  );
}
```

## Scroll Animations

### Scroll-Triggered

```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FadeInWhenVisible({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

### Scroll Progress

```jsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="h-screen flex items-center justify-center"
    >
      <h1 className="text-6xl font-bold">Parallax Hero</h1>
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
    />
  );
}
```

## Animation Hooks

### useAnimate (Imperativo)

```jsx
import { useAnimate } from 'framer-motion';

export function SubmitButton() {
  const [scope, animate] = useAnimate();

  const handleClick = async () => {
    await animate(scope.current, { scale: 0.95 }, { duration: 0.1 });
    await animate(scope.current, { scale: 1 }, { type: 'spring' });
    await animate(scope.current, { backgroundColor: '#22c55e' }, { duration: 0.2 });
  };

  return (
    <motion.button ref={scope} onClick={handleClick} className="px-4 py-2">
      Submit
    </motion.button>
  );
}
```

### useMotionValue & useTransform

```jsx
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function RotatingCard() {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-45, 45]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      style={{ x, rotateY, opacity }}
      className="w-64 h-96 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl"
    />
  );
}
```

## Componentes Reutilizables

### AnimatedContainer

```jsx
import { motion } from 'framer-motion';

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimatedContainer({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  className,
}) {
  return (
    <motion.div
      variants={animations[animation]}
      initial="hidden"
      animate="visible"
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### AnimatedList

```jsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function AnimatedList({ items, renderItem, keyExtractor, className }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {items.map((item, index) => (
        <motion.li key={keyExtractor(item, index)} variants={itemVariants}>
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## Transition Presets

```jsx
// lib/transitions.js
export const transitions = {
  spring: { type: 'spring', stiffness: 300, damping: 24 },
  springBouncy: { type: 'spring', stiffness: 500, damping: 15 },
  springStiff: { type: 'spring', stiffness: 700, damping: 30 },
  smooth: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
  snappy: { type: 'tween', duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
};

// Uso: <motion.div transition={transitions.spring} />
```

## Soporte para Reduced Motion

```jsx
import { useReducedMotion } from 'framer-motion';

export function AccessibleAnimation({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

## Best Practices

1. **Propiedades GPU-aceleradas**: `opacity`, `transform` (evitar `width`, `height`)
2. **`layout` para redimensionado suave**: Animaciones de layout automáticas
3. **`AnimatePresence`**: Siempre para animaciones de salida
4. **Preferir springs**: Más naturales que tweens para UI
5. **Respetar reduced motion**: Usar el hook `useReducedMotion`
6. **No animar layout thrashing**: Evitar `top`, `left`, `width`
7. **`layoutId`**: Para transiciones de elementos compartidos
8. **Stagger children**: Para animaciones de listas

## Output Checklist

- [ ] Tipo de animación apropiado (simple, variants, gestures)
- [ ] Transiciones suaves con easing correcto
- [ ] Exit animations con AnimatePresence
- [ ] Soporte para reduced motion
- [ ] Solo propiedades GPU-aceleradas
- [ ] Spring physics para sensación natural
- [ ] Staggered children en listas
- [ ] Probado en dispositivos de gama baja