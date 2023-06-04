import React from 'react'
import { IContact } from '../utils/Contatnts'


interface ICard  {
    contact: IContact
}
const ContactCard = ({contact} : ICard) => {
  return (
    <div className={`${ contact.status === "active" ? 'bg-active shadow-[0_10px_20px_#70db9b]' : 'bg-inactive shadow-[0_10px_20px_#ff8c8c]' } flex flex-col items-center rounded-[12px] p-6 shadow-[0_0_10px_#c4c4c4] mt-5 justify-center`}>
        <p className="text-secondary text-[28px] mb-3 font-[500]">{contact.firstName +" " + contact.lastName}</p>
        <p className="text-secondary text-[22px] font-[500]">{contact.status[0].toUpperCase()+contact.status.slice(1)}</p>
    </div>
  )
}

export default ContactCard