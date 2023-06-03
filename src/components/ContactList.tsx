import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const ContactList = () => {
  const contact = useSelector((state: RootState) => state.contact);
  return (
    <div className="w-full h-full bg-white text-dark">
      {contact.length === 0 ? (
        <div>
          <button >Create new Contact</button>

          <div className=""></div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ContactList;
