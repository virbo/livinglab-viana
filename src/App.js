import image from './no-data.jpg';
import './App.css';
import SocketListening from './pages/ddg';

function App() {
  return (
    <>
      <SocketListening image={image} />
    </>
  );
}

export default App;
