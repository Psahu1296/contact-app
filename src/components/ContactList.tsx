import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { cross, deleteIcon, edit } from "../assets";
import NewContact from "./NewContact";
import { useState } from "react";
import ContactCard from "./ContactCard";
import { IContact } from "../utils/Contatnts";
import { deleteContact } from "../Redux/Reducers/contactSlice";

const ContactList = () => {
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [selected, setSelected] = useState<IContact>({
    id: "",
    firstName: "",
    lastName: "",
    status: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch()

  const hideHandler = (type: string) => {
    if (type === "new" ) {
      setIsAddNew(false)
      return
    }
    setIsEdit(false)
  }
  console.log(contacts);
  return (
    <div className="w-full h-full bg-white text-dark relative">
      <div className="w-full flex justify-center">
        <button
          className="p-5 bg-green rounded-[12px] text-primary font-[500] text-xl my-5 hover:scale-[1.05] active:scale-[1]"
          onClick={() => setIsAddNew(true)}
        >
          Create Contact
        </button>
      </div>
      {contacts.length === 0 ? (
        <div className="flex flex-col items-center ">
          <div className="bg-white flex justify-between items-center  w-[380px] rounded-[12px] p-6 shadow-[0_0_10px_#c4c4c4] mt-5">
            <img
              src={cross}
              alt="cross"
              className="w-[46px] h-[46px] opacity-40 "
            />
            <p className="text-secondary text-2xl font-[500] ">
              No contact found <br />
              Plese add contact from <br />
              Create contact button
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-evenly flex-wrap gap-8">
          {contacts.map((contact) => (
            <div>
              <ContactCard contact={contact} />
              <div className="w-full flex justify-around mt-6 items-center">
                <img
                  src={edit}
                  alt="cross"
                  className="w-[28px] h-[28px] hover:scale-[1.08] active:scale-[1] cursor-pointer"
                  onClick={() => {
                    setIsEdit(true);
                    setSelected(contact);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt="cross"
                  className="w-[36px] h-[36px] hover:scale-[1.08] active:scale-[1] cursor-pointer"
                  onClick={() => dispatch(deleteContact(contact.id))}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {isAddNew && <NewContact type="new" hideAddNew={hideHandler} />}
      {isEdit && <NewContact type="edit" hideAddNew={hideHandler} selectedContact={selected}/>}
    </div>
  );
};

export default ContactList;
