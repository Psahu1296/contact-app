import React, { useEffect, useState } from "react";
import { IContact } from "../utils/Contatnts";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../Redux/Reducers/contactSlice";

interface INewContact {
  type: string;
  selectedContact?: IContact;
  contacts?: IContact[];
  hideAddNew:(args: string) => void;
}
const NewContact = ({
  type,
  selectedContact,
  contacts,
  hideAddNew,
}: INewContact) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState<IContact>({
    id: "",
    firstName: "",
    lastName: "",
    status: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
    console.log(event.target)
  };
  const saveHandler = () => {
    if (type === "new" && contact.firstName && contact.lastName) {
      const saveContact = { ...contact, id: Date.now().toString() };
      dispatch(addContact(saveContact));
      console.log("Saving contact");
      hideAddNew("new");
      return;
    }

    if (type === "edit" && contact.firstName && contact.lastName) {
      const contactToUpdate = contacts?.find(
        (contact) => contact.id === selectedContact?.id
      );
      const updatedContact = { ...contactToUpdate, id: contact.id, firstName: contact.firstName, lastName: contact.lastName, status: contact.status};

      dispatch(editContact(updatedContact));

      console.log("Saving contact");
      hideAddNew("edit");
      return;
    }
  };

  useEffect(() => {
    if (type === "edit" && selectedContact) {
      setContact({
        id: selectedContact.id,
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        status: selectedContact.status,
      });
    }
  }, [type]);
  return (
    <div className="absolute z-[10] w-full h-full flex justify-center items-center top-0 left-0 bg-black-100/25">
      <div className="bg-white flex flex-col items-start rounded-[12px] p-6 shadow-[0_0_10px_#c4c4c4] mt-5 justify-center">
        <h1 className="text-secondary text-3xl mb-3">Create New Contact</h1>
        <div className="first flex items-center w-full mt-6">
          <label className="w-1/3 text-secondary text-xl font-[500]">
            {" "}
            First Name :
          </label>
          <input
            type="text"
            className="bg-white border-[1px] rounded-[12px] h-[48px] ml-2 px-3 outline-none border-[1px] border-[#4F4F4F] focus:border-[#3DB46D]"
            name="firstName"
            maxLength={50}
            value={contact.firstName}
            onChange={changeHandler}
          />
        </div>
        <div className="first flex items-center mt-6 w-full">
          <label className="w-1/3 text-secondary text-xl font-[500]">
            {" "}
            Last Name :
          </label>
          <input
            type="text"
            className="bg-white border-[1px] rounded-[12px] h-[48px] ml-2 px-3 outline-none border-[1px] border-[#4F4F4F] focus:border-[#3DB46D]"
            maxLength={50}
            value={contact.lastName}
            name="lastName"
            onChange={changeHandler}
          />
        </div>
        <div className="first flex items-center mt-6 w-full">
          <label className="w-1/3 text-secondary text-xl font-[500]">
            {" "}
            Status:
          </label>
          <div className="flex-1">
            <div>
              <input
                type="radio"
                name="status"
                className="w-4 h-4"
                value="active"
                onChange={changeHandler}
                checked={contact.status === 'active'}
              />
              <label className="w-1/3 text-secondary text-xl font-[500] ml-2">
                Active
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="status"
                className="w-4 h-4"
                value="inactive"
                onChange={changeHandler}
                checked={contact.status === 'inactive'}
              />
              <label className="w-1/3 text-secondary text-xl font-[500] ml-2">
                Inactive
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="px-5 py-3 bg-green rounded-[12px] text-primary font-[500] text-xl my-5 hover:scale-[1.05] active:scale-[1]"
            onClick={saveHandler}
          >
            Save contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
