import React, { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './home/Home';
import Login from './login/Login';
import Register from './login/Register';
import Starfield from 'react-starfield';
import SideBar from './SideBar';
import Room from './room/Room';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const App: React.FC = () => {

  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      socket.emit("req_rooms");
      socket.off("res_rooms").on("res_rooms", () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/occupant/${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error loading Rooms");
            }
            return response.json();
          })
          .then((data) => {
            setRooms(data);
          })
          .catch((error) => {
            setError(error.message);
          });
      });
      socket.off("init").on("init", () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/occupant/${username}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error loading Rooms");
            }
            return response.json();
          })
          .then((data) => {
            setRooms(data);
            const roomNames = data.map((item: any) => item.room_name);
            socket.emit('socket_connect', roomNames)
          })
          .catch((error) => {
            setError(error.message);
          });
      });
    }
  }, [socket, username]);

  function login(userid: string) {
    setUsername(userid);
  }

  return (
    <div className='row h-100 w-100' style={{ overflow: 'auto' }}>
      {error && <div className="alert alert-danger">{error}</div>}
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      {username && (
        <SideBar rooms={rooms} />
      )}
      <div className='col'>
        <Routes>
          <Route path='/' element={<Login login={login} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home userid={username} socket={socket} rooms={rooms} />} />
          <Route path='/room/:room_id' element={<Room socket={socket} user={username} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
