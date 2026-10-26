import React from 'react';

// Displays the complete full cartoon face without circular cropping or cutting off beard/hair
export const CartoonBoy = ({
  width = 120,
  height = 140,
  style = {},
  className = ""
}) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))',
        flexShrink: 0,
        ...style
      }}
      className={className}
    >
      <img
        src="/boy-face.png"
        alt="Durvank Wagh"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};
