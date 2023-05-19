import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import React from "react";
import newRequest from "../../utils/newRequest";
import moment from "moment";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./Messages.scss";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };




  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Add New Hostel</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <div className="messages">
                {isLoading ? (
                  "loading"
                ) : error ? (
                  "error"
                ) : (
                  <div className="container">
                    <div className="title">
                      <h1>Messages</h1>
                    </div>
                    <table>
                      <tr>
                        <th>Messenger</th>
                        <th>Last Message</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                      {data.map((c) => (
                        <tr className={((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && "active"} key={c.id}>
                          <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                          {/* <td>{c.userId}</td> */}
                          <td>
                            <Link to={`/message/${c.id}`} className="link">
                              {c?.lastMessage?.substring(0, 100)}...
                            </Link>
                          </td>
                          <td>{moment(c.updatedAt).fromNow()}</td>
                          <td>
                            <button className={(currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) ? "unread" : "read"} onClick={() => handleRead(c.id)} disabled={(currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) ? false : true}>
                              {(currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) ? "Mark as Read" : "Seen"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
