import React, { Fragment, useEffect, useState} from 'react';
import Room from './room/Room';
import { io } from 'socket.io-client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './home/Home';

// interface Item {
//   name:string,
//   age:string
// }

const socket = io('http://localhost:3001')

const App: React.FC = () => {

  //const [items, setItems] = useState<Item[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/items')
  //     .then((res) => res.json())
  //     .then((data:Item[]) => {
  //       setItems(data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // function renderItems() {
  //   return items.map((item: Item, i: number) => (
  //     <div key={i}>
  //       <h3>{item.name}</h3>
  //       <h3>{item.age}</h3>
  //     </div>
  //   ));
  // }

  const [username, setUsername] = useState('')
  const [room_id, setRoom_id] = useState('')

  function join_room(params: {username: string, room_id: string}) {
    setRoom_id(params.room_id)
    setUsername(params.username)
    socket.emit('join',(params.room_id))
    console.log(`${username} joined room: ${room_id}`)
  }

  return(
    <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path='/' element={<Home join={join_room}/>}/>
        <Route path='/room/:room_id' element={<Room socket={socket} user={username} room={room_id}/>}/>
      </Routes>
    </Fragment>
    </BrowserRouter>
  )
};

export default App;
