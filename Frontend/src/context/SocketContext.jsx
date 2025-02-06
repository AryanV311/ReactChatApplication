/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */

import { useAppStore } from "@/store";
import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

// export const useSocket = () => {
//     return useContext(SocketContext);
// }

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo } = useAppStore();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log(backendUrl);

    useEffect(() => {
        if (userInfo && !socket.current) {
            socket.current = io(backendUrl, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });

            socket.current.on("connect", () => {
                console.log("Connected to the server");
            }); 

            const handleRecieveMessage = (message) => {
                const {selectedChatData, selectedChatType, addMessage} = useAppStore.getState();

                console.log(message);
                console.log("selectedChat______",selectedChatData);

                if(selectedChatType!== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id )){ 
                    addMessage(message)
                    console.log("message rec", message);
                }
            }

            // console.log("revendbcmsc", handleRecieveMessage());
            socket.current.on("recieveMessage",handleRecieveMessage)
            // socket.current.on("disconnect", () => {
            //     console.log("Disconnected from the server");
            // });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, [userInfo, backendUrl]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};