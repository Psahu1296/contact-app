import { Provider } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { store } from "./Redux/Store";
import Header from "./components/Header";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ChartsMaps from "./components/ChartsMaps";

function App() {
  const [selectedTab, setSeleectedTab] = useState<number>(0)
  return (
    <div className="App h-[100vh]">
      <Provider store={store}>
      <BrowserRouter>
        <div className="flex h-full">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSeleectedTab}/>
        <div className="flex-1 flex flex-col">
        <Header selectedTab={selectedTab}/>
        <div className="flex-1 w-full h-full">
        <Routes>
          <Route path='/' element={<ContactList />}/>
          <Route path="chart-map" element={<ChartsMaps />}/>
        </Routes>
        </div>
        </div>
        </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
