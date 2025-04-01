
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Define interfaces for animation objects to replace generic 'object' type
interface AnimationStyles {
  opacity?: number;
  height?: number | string;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  [key: string]: any; // Allow for other animation properties
}

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  initial?: "hidden" | "visible" | string | AnimationStyles;
  animate?: "hidden" | "visible" | string | AnimationStyles | {
    scale?: number | number[];
    opacity?: number | number[];
    top?: string | string[];
    y?: number | number[];
    x?: number | number[];
  };
  whileHover?: AnimationStyles; 
  whileTap?: AnimationStyles;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    type?: "tween" | "spring";
    stiffness?: number;
    damping?: number;
    repeat?: number | boolean | "infinity";
  };
  variants?: {
    hidden?: AnimationStyles;
    visible?: AnimationStyles;
    hover?: AnimationStyles;
    tap?: AnimationStyles;
    [key: string]: AnimationStyles | undefined;
  };
}

// Special props for SVG elements
interface MotionSVGProps extends MotionProps {
  d?: string;
  fill?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  strokeDashoffset?: string;
  stroke?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
}

// Create a generic motion component factory
const createMotionComponent = (Component: keyof JSX.IntrinsicElements) => ({
  children,
  className,
  initial,
  animate,
  whileHover,
  whileTap,
  transition,
  variants,
  ...props
}: MotionProps) => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default animations if no variants provided
  const defaultVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -3 },
    tap: { scale: 0.97 }
  };
  
  // Merge provided variants with defaults
  const mergedVariants = { ...defaultVariants, ...variants };
  
  // Animation classes based on states
  const getAnimationClasses = () => {
    if (!mounted) return typeof initial === 'string' && initial === 'hidden' ? 'opacity-0' : '';
    
    if (typeof animate === 'string') {
      if (animate === 'visible') {
        return `animate-fade-in`;
      }
      return animate === 'hidden' ? 'opacity-0' : '';
    }
    
    return '';
  };
  
  // Handle dynamic styles based on animate prop when it's an object
  const getDynamicStyles = () => {
    const baseStyles = {
      animationDuration: transition?.duration ? `${transition.duration}s` : '0.3s',
      animationDelay: transition?.delay ? `${transition.delay}s` : '0s',
      transitionTimingFunction: transition?.ease || 'cubic-bezier(0.4, 0, 0.2, 1)',
      transition: 'all 0.3s ease',
      animationIterationCount: transition?.repeat === 'infinity' ? 'infinite' : 
                                typeof transition?.repeat === 'number' ? `${transition.repeat}` : 
                                transition?.repeat === true ? 'infinite' : 'initial'
    };
    
    // If tapping and whileTap is defined, apply those styles
    if (isTapping && whileTap) {
      return {
        ...baseStyles,
        ...whileTap,
        transform: getTransformString(whileTap)
      };
    }
    
    // If hovering and whileHover is defined, apply those styles
    if (isHovering && whileHover) {
      return {
        ...baseStyles,
        ...whileHover,
        transform: getTransformString(whileHover)
      };
    }
    
    // If animate is an object, apply those styles
    if (typeof animate === 'object' && animate !== null) {
      const animateObj = animate as AnimationStyles;
      return {
        ...baseStyles,
        ...animateObj,
        opacity: animateObj.opacity !== undefined ? 
                 (Array.isArray(animateObj.opacity) ? animateObj.opacity[0] : animateObj.opacity) : 1,
        height: animateObj.height !== undefined ? 
          (typeof animateObj.height === 'number' ? `${animateObj.height}px` : animateObj.height) : 
          'auto',
        transform: getTransformString(animateObj),
      };
    }
    
    // If initial is an object and not mounted yet, apply those styles
    if (!mounted && typeof initial === 'object' && initial !== null) {
      const initialObj = initial as AnimationStyles;
      return {
        ...baseStyles,
        ...initialObj,
        opacity: initialObj.opacity !== undefined ? initialObj.opacity : 0,
        height: initialObj.height !== undefined ? 
          (typeof initialObj.height === 'number' ? `${initialObj.height}px` : initialObj.height) : 
          'auto',
        transform: getTransformString(initialObj),
      };
    }
    
    return baseStyles;
  };
  
  // Helper to generate transform string from multiple properties
  const getTransformString = (styles: AnimationStyles): string | undefined => {
    const transforms = [];
    
    if (styles.y !== undefined) {
      const yValue = Array.isArray(styles.y) ? styles.y[0] : styles.y;
      transforms.push(`translateY(${yValue}px)`);
    }
    
    if (styles.x !== undefined) {
      const xValue = Array.isArray(styles.x) ? styles.x[0] : styles.x;
      transforms.push(`translateX(${xValue}px)`);
    }
    
    if (styles.scale !== undefined) {
      const scaleValue = Array.isArray(styles.scale) ? styles.scale[0] : styles.scale;
      transforms.push(`scale(${scaleValue})`);
    }
    
    if (styles.rotate !== undefined) {
      const rotateValue = Array.isArray(styles.rotate) ? styles.rotate[0] : styles.rotate;
      transforms.push(`rotate(${rotateValue}deg)`);
    }
    
    return transforms.length > 0 ? transforms.join(' ') : undefined;
  };

  // @ts-ignore - This is needed to allow dynamic component rendering
  const TagName = Component as any;
  
  return (
    <TagName
      className={cn(
        'transition-all',
        className,
        getAnimationClasses()
      )}
      style={getDynamicStyles()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setIsTapping(true)}
      onMouseUp={() => setIsTapping(false)}
      onTouchStart={() => setIsTapping(true)}
      onTouchEnd={() => setIsTapping(false)}
      {...props}
    >
      {children}
    </TagName>
  );
};

// Create a special component for SVG path
const createSVGComponent = (Component: keyof JSX.IntrinsicElements) => ({
  children,
  className,
  initial,
  animate,
  whileHover,
  whileTap,
  transition,
  variants,
  ...props
}: MotionSVGProps) => {
  // Using the same logic as createMotionComponent, but with SVG-specific props
  const motionComponent = createMotionComponent(Component);
  return motionComponent({
    children,
    className,
    initial,
    animate,
    whileHover,
    whileTap,
    transition,
    variants,
    ...props
  });
};

// Export motion components
export const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  p: createMotionComponent('p'),
  span: createMotionComponent('span'),
  li: createMotionComponent('li'),
  ul: createMotionComponent('ul'),
  article: createMotionComponent('article'),
  button: createMotionComponent('button'),
  a: createMotionComponent('a'),
  
  // SVG elements
  svg: createSVGComponent('svg'),
  path: createSVGComponent('path'),
  circle: createSVGComponent('circle'),
  rect: createSVGComponent('rect'),
};

export default motion;
