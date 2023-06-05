import { MENUS } from "../utils/Contatnts"


interface IHeader {
  selectedTab: number
}

const Header = ({selectedTab} : IHeader)  => {
  return (
    <div className='header h-[80px] font-[600] text-2xl font- flex justify-center items-center'>{MENUS[selectedTab]}</div>
  )
}

export default Header