import React from 'react';

interface SuperheroPiggyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'float' | 'bounce' | 'wiggle' | 'none';
  className?: string;
  showCape?: boolean;
  showGlow?: boolean;
}

const SuperheroPiggy: React.FC<SuperheroPiggyProps> = ({ 
  size = 'md', 
  animation = 'float',
  className = '',
  showCape = false,
  showGlow = true
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const animationClasses = {
    float: 'animate-float',
    bounce: 'animate-bounce-gentle',
    wiggle: 'animate-wiggle',
    none: ''
  };

  const glowStyle = showGlow ? {
    filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))'
  } : {};

  // Fallback superhero piggy emoji if image doesn't load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    
    // Create a fallback element
    const fallback = document.createElement('div');
    fallback.innerHTML = '🐷';
    fallback.className = `${sizeClasses[size]} ${animationClasses[animation]} ${className} inline-flex items-center justify-center text-primary-600 bg-primary-100 rounded-full`;
    fallback.style.fontSize = size === 'xl' ? '1.5rem' : size === 'lg' ? '1.2rem' : size === 'md' ? '1rem' : '0.8rem';
    
    if (target.parentNode) {
      target.parentNode.insertBefore(fallback, target);
    }
  };

  return (
    <div className="relative inline-block">
      {showCape && (
        <div className="absolute -top-1 -left-1 w-3 h-4 bg-red-500 rounded-t-full transform -rotate-12 opacity-80"></div>
      )}
      <img 
        src="/image.png" 
        alt="SureSavings Superhero Piggy" 
        className={`${sizeClasses[size]} ${animationClasses[animation]} ${className} superhero-piggy`}
        style={glowStyle}
        onError={handleImageError}
        loading="lazy"
      />
      {showGlow && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-80"></div>
      )}
    </div>
  );
};

export default SuperheroPiggy;