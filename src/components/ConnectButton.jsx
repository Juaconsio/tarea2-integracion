import { useState } from 'react';
import { connectSocket, listingEvents } from '..//util/brokerClient';

const ConnectButton = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {

    listingEvents(connectSocket());
    setConnected(true);
  };

  return (
    <button onClick={handleConnect} style={{ display: connected ? 'none' : 'block' }}>
      Conectar
    </button>

  );
};

export default ConnectButton;