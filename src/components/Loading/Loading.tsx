import React from 'react';
import { Spin } from 'antd'; 

const Loading: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    zIndex: 9999
  }}>
    <Spin size="large" />
  </div>
);

export default Loading;
