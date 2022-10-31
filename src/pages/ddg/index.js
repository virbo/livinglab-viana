import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import io from 'socket.io-client';
import { BaseEndpointRest, BaseEndpointSocket, EndPointRawData } from '../../config/public';

const socket = io(BaseEndpointSocket);

const SocketListening = (props) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('ping');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('payload', (data) => {
      console.log(data.image_url)
      setImageUrl(data.image_url)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('payload');
    };
  }, [])

  return (
    <div>
      <p>Connected: {'' + isConnected}</p>
      <img src={imageUrl || props.image} width="450px" />
    </div>
  );
}

export default SocketListening