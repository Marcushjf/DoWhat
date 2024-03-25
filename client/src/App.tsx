import React, { Fragment, useEffect, useState} from 'react';
import Room from './room/Room';
import { io } from 'socket.io-client';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from './home/Home';
import Login from './login/Login';
import Register from './login/Register';


const socket = io(`${import.meta.env.VITE_BACKEND_URL}`)

const App: React.FC = () => {

  const [username, setUsername] = useState('')
  const [room_id, setRoom_id] = useState('')

  function join_room(room:string) {
    setRoom_id(room)
  }

  function login(userid: string){
    setUsername(userid)
    console.log(username)
  } 

  return(
    <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path='/' element={<Login login={login}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home userid={username} socket={socket} join={join_room}/>}/>
        <Route path='/room/:room_id' element={<Room socket={socket} user={username} room={room_id}/>}/>
      </Routes>
    </Fragment>
    </BrowserRouter>
  )
};

export default App;
