import Main from "./pages";
import 'antd/dist/antd.min.css';
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter> 
      <Main />
    </BrowserRouter>
  );
}

export default App;
