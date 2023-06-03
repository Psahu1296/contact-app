import React from "react";
import { useNavigate } from "react-router-dom";
import { MENUS } from "../utils/Contatnts";

interface ISidebar {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  selectedTab: number;
}

const ROUTE = ['/', "/chart-map"]


const Sidebar = ({ selectedTab, setSelectedTab }: ISidebar) => {
  const navigate = useNavigate()
  const sidebarHandler = (idx: number) => {
    setSelectedTab(idx)
    navigate(ROUTE[idx])
  }
  return (
    <div className=" sidebar w-[20%] h-full bg-green-radial flex flex-col justify-start items-center">
        <h1 className="text-primary font-[700] text-[32px] mb-4">C&M</h1>
        {MENUS.map((menu: string, idx: number) => <div key={menu+idx} className={`${selectedTab === idx ? 'bg-red' : 'bg-white'}  text-dark w-[90%] h-12 px-4 mb-4 rounded-[12px] flex justify-center items-center cursor-pointer hover:scale-[1.05] active:scale-[1] select-none`} onClick={()=> sidebarHandler(idx)}>{menu}</div>)}
    </div>
  );
};

export default Sidebar;
