import React from "react";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./conversation.scss";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Conversation = () => {

  const messageContainerRef = useRef(null);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  const messageRef = useRef(null);

  const [id, setId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getConversations = async () => {
      const conversations = await newRequest.get(`/conversations`);
      setConversations(conversations.data);
      setId(conversations.data[0].id);
      console.log(conversations.data);
    };
    getConversations();
  }, []);

  console.log(id);

  const getMessages = async () => {
    console.log("FETCHING M,ESSAGES FOR CONVERSATION");
    const messagesId = id || conversations.data[0].id;
    // const messagesId = id || "6464ebc11d0e656d55f3d93e6464edfb3f7848e69f5eafa5";
    const messages = await newRequest.get(`/messages/${messagesId}`);
    setMessages(messages.data);
    console.log(messages.data);
  };

  useEffect(() => {
    getMessages();
  }, [id]);

  const handleClick = async () => {
    const newMessageData = {
      conversationId: id,
      desc: message,
    };
    console.log(newMessageData);
    const messages = await newRequest.post(`/messages`, newMessageData);
    getMessages();
    setMessage("");
    setId(id);
  };

  return (
    <div className="conversationWrapper">
      <Navbar />
      <div className="conversation_container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="CONVERSATIONS" />
            {/* <i className="fa fa-search"></i> */}
          </div>
          <ul className="list">
            {conversations?.map((c) => (
              <li className="clearfix" key={c._id} onClick={() => setId(c.id)}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                  {/* <div className="name">Vincent Porter</div> */}
                  <div className="name">{currentUser.isSeller ? c.buyerId.substring(0, 10) : c.sellerId.substring(0, 10)}...</div>
                  <div className="status">{/* <i className="fa fa-circle online"></i> online */}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="chat">
          <div className="chat-header clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

            <div className="chat-about">
              <div className="chat-with">Chat with Vincent Porter</div>
              <div className="chat-num-messages">already 1 902 messages</div>
            </div>
          </div>

          <div className="chat-history" ref={messageContainerRef}>
            <ul>
              {messages ? (
                messages?.map((m) => (
                  <>
                    <li key={m._id} className={m.userId._id == currentUser._id ? "clearfix" : undefined}>
                      <div className={m.userId._id == currentUser._id ? "message-data align-right" : "message-data"}>
                        <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                        <span className="message-data-name">{m.userId.username}</span>
                      </div>
                      <div className={m.userId._id == currentUser._id ? "message other-message float-right" : "message my-message"}>{m.desc}</div>
                    </li>
                  </>
                ))
              ) : (
                <h1>NO MESSAGES YET!</h1>
              )}
            </ul>
          </div>
          <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" rows="3"></textarea>
            <button onClick={handleClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
