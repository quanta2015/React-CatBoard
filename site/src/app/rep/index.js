import React, { useState } from 'react';

const Comment = ({ data, reply }) => {
  const [replies, setReplies] = useState(reply.content || []);
  const [newReply, setNewReply] = useState('');

  const addReply = () => {
    const replyToAdd = {
      data: newReply,
      user: "yourUser",
      icon: "yourIcon",
      sub_date: new Date().toISOString()
    };
    setReplies([...replies, replyToAdd]);
    setNewReply('');
  };

  return (
    <div>
      <div>{data.user}: {data.data}</div>
      <input value={newReply} onChange={e => setNewReply(e.target.value)} />
      <button onClick={addReply}>回复</button>
      {replies.map((reply, index) => (
        <Comment key={index} data={reply} reply={{}} />
      ))}
    </div>
  );
};


const Post = () => {
  const content = {
    data: "aaa",
    user: "tom",
    icon: "icon-a",
    sub_date: "2021-01-01 2:12"
  }

  const reply = []

  console.log(reply,'reply')


  return (
    <div>
      <Comment data={content} reply={reply} />
    </div>
  );
};

export default Post;
