import './App.css';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import MapView from './components/MapView';
import TrainTable from './components/trainTable';
import StationsTable from './components/stationsTable';
import Chat from './components/chat';

function App() {
  const nalum = 18642683
  const user = "Joaquin Concha"

  const {
    sendJsonMessage,
    lastJsonMessage
  } = useWebSocket("wss://tarea-2.2024-1.tallerdeintegracion.cl/connect", {
    share: true
  })

  useEffect(() => {
    // Envía el mensaje inicial después de que se establezca la conexión
    window.addEventListener("message", () => {
      sendJsonMessage({
        type: "JOIN",
        payload: {
          id: `${nalum}`,
          username: `${user}`
        }
      })
      console.log("Connected to WebSocket Server")
    });
  }, [sendJsonMessage]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <MapView lastJsonMessage={lastJsonMessage} />
        <Chat lastJsonMessage={lastJsonMessage} sendJsonMessage={sendJsonMessage} />
      </div>
      <div>
        <TrainTable lastJsonMessage={lastJsonMessage} />
        <StationsTable />
      </div>
    </div>
  );
}

export default App;
