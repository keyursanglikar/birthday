import React, { useState } from 'react';

export const LazyImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  placeholderColor = 'rgba(157, 18, 56, 0.15)',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: style.width || '100%',
        height: style.height || '100%',
        background: isLoaded ? 'transparent' : placeholderColor,
        display: style.display || 'inline-block',
        borderRadius: style.borderRadius || 0
      }}
    >
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            animation: 'shimmer 1.4s infinite',
            pointerEvents: 'none'
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={{
          ...style,
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease-in-out'
        }}
        className={className}
        {...props}
      />
    </div>
  );
};
