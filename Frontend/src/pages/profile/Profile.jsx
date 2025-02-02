import { useState } from "react";
import { useAppStore } from "../../store/";
import { IoArrowBack } from "react-icons/io5";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { colors, getColor } from "@/lib/utils";
import { FaTrash, FaPlus  } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { userInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const saveChanges = async () => {}

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex justify-center items-center flex-col gap-10">
     <div className="flex flex-col gap-10 w-[80vw] md:w-max">
      <div>
        <IoArrowBack className="text-4xl lg:text-6xl text-white/60 cursor-pointer" />
      </div>
      <div className="grid grid-cols-2">
          <div className="h-full w-32 md:h-48 md:w-48 relative flex items-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {
                image ? (
                  <AvatarImage src={image} alt="profile" className="object-cover h-full w-full bg-black" />
                ) : (
                  <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                    {
                      firstName ? firstName.split("").shift()
                      : userInfo.email.split("").shift()
                    }
                  </div>
                )
              }
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                  {
                    image ? (
                      <FaTrash className="text-white text-3xl cursor-pointer" /> 
                    ) : (
                      <FaPlus className="text-white text-3xl cursor-pointer" />
                    )
                  }
                </div>
              )}
          </div>
            <div className="flex min-w-32 md:min-w-64 flex-col gap-5 items-center justify-center text-white">
              <div className="w-full">
                <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
              </div>
              <div className="w-full">
              <Input placeholder="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
              </div>
              <div className="w-full">
              <Input placeholder="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
              </div>
              <div className="w-full flex gap-5">
                {
                  colors.map((color, index) => (
                    <div className={`${color} h-8 w-8 rounded-full cursor-pointer  transition-colors duration-300 ${selectedColor === index ? " outline-white/50 outline outline-2":""}`} key={index} onClick={() => setSelectedColor(index)}></div>
                  ))}
              </div>
            </div>
      </div>
      <div className="w-full">
        <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
              Save changes
        </Button>

      </div>
     </div>
    </div>
  );
};
