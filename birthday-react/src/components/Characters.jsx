import React from 'react';

export const BoyAvatar = ({ width = 120, height = 120, className = "" }) => (
  <img
    src="/boy-face.png"
    alt="Boy Face"
    width={width}
    height={height}
    className={className}
    style={{
      objectFit: 'contain',
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.35))'
    }}
  />
);

export const GirlAvatar = ({ width = 120, height = 120, className = "" }) => (
  <img
    src="/girl-face.png"
    alt="Girl Face"
    width={width}
    height={height}
    className={className}
    style={{
      objectFit: 'contain',
      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.35))'
    }}
  />
);
