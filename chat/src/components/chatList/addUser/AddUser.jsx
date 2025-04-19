import React, { useState, useEffect } from "react";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const AddUser = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.length === 0) {
        setUsers([]);
        return;
      }

      try {
        const userRef = collection(db, "users");
        const q = query(
          userRef,
          where("username", ">=", searchTerm),
          where("username", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs
          .map(doc => doc.data())
          .filter(user => user.id !== currentUser.id);
        setUsers(userList);
      } catch (err) {
        console.log(err);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentUser.id]);

  const handleAdd = async (user) => {
    // Reference to the user chats collection
    const userChatsRef = doc(db, "userchats", currentUser.id);
    try {
      // Get the current user's existing chat data
      const userChatsSnap = await getDoc(userChatsRef);
      const existingChats = userChatsSnap.exists() ? userChatsSnap.data().chats || [] : [];

      // Check if the selected user is already in the current user's chat list
      const alreadyExists = existingChats.some(
        (chat) => chat.receiverId === user.id
      );

      if (alreadyExists) {
        alert("User is already in your chat list.");
        return;
      }

      // Create a new chat document
      const chatRef = collection(db, "chats");
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update the current user's chat list with the new chat
      await updateDoc(userChatsRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // Update the selected user's chat list with the new chat
      const otherUserChatsRef = doc(db, "userchats", user.id);
      await updateDoc(otherUserChatsRef, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      onClose(); // Close the modal after adding the user
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addUser">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search username"
      />
      <div className="userList">
        {users.map((user) => (
          <div key={user.id} className="user">
            <div className="detail">
              <img src={user.avatar} alt="" />
              <span>{user.username}</span>
            </div>
            <button onClick={() => handleAdd(user)}>Add User</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUser;
