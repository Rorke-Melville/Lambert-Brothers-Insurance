import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      background: 'rgba(255, 255, 255)', 
      color: '#3d559a',
      fontWeight: 'bold',
      fontSize: '1.05em',
      padding: '20px 0', 
      textAlign: 'center' 
    }}>
      <p>&copy; 2025 Lambert Brothers Insurance. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
