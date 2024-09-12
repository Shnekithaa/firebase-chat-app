import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";

function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = "";
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
    
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message own">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              id illo velit accusamus perferendis officia at, dicta ducimus ad.
              Quam ipsum accusantium obcaecati vitae natus temporibus neque quia
              expedita rem.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              id illo velit accusamus perferendis officia at, dicta ducimus ad.
              Quam ipsum accusantium obcaecati vitae natus temporibus neque quia
              expedita rem.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src="./avatar.png" alt="" />
          <img src="" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              id illo velit accusamus perferendis officia at, dicta ducimus ad.
              Quam ipsum accusantium obcaecati vitae natus temporibus neque quia
              expedita rem.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat;
