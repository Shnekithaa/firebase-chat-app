import React, { useEffect, useState, useRef } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [addModel, setAddModel] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const modalRef = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        if (res.exists()) {
          const items = res.data().chats || [];
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });

          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } else {
          setChats([]);
        }
      }
    );

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddModel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unSub();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    if (chatIndex !== -1) {
      userChats[chatIndex].isSeen = true;
      const userChatsRef = doc(db, "userchats", currentUser.id);
      try {
        await updateDoc(userChatsRef, {
          chats: userChats,
        });
        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <span className="infoText">Add people to chat</span>
        <img
          src={addModel ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddModel((prev) => !prev)}
        />
      </div>

      <div className="chatlist-1">
        {filteredChats.map((chat) => (
          <div
            className={`user-container ${
              chat.chatId === chatId ? "active" : ""
            }`}
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
          >
            <img
              src={
                chat.user.blocked.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user.avatar || "./avatar.png"
              }
              alt=""
            />
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
          </div>
        ))}
      </div>

      <div className="chatlist-2">
        {addModel && (
          <div ref={modalRef}>
            <AddUser onClose={() => setAddModel(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
