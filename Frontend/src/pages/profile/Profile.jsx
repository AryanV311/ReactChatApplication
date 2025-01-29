import { useState } from "react";
import { useAppStore } from "../../store/";
import { IoArrowBack } from "react-icons/io5";

export const Profile = () => {
  const { userInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, sethovered] = useState(false)
  const [selectedColored, setSelectedColored] = useState(0)

  const saveChanges = async () => {}

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex justify-center items-center flex-col gap-10">
     <div className="flex flex-col gap-10 w-[80vw] md:w-max">
      <div>
        <IoArrowBack />
      </div>
     </div>
    </div>
  );
};
