import { Link } from "react-router-dom"
import 'bootstrap/js/dist/collapse'
import { Fragment } from "react/jsx-runtime"
import { useState } from "react"

interface SideBarProp {
    rooms: any[]
}

function SideBar({ rooms }: SideBarProp) {
    return (
        <div className="d-flex flex-column bg-body justify-content-space-between vh-100">
            <Link to="/home" className="d-flex p-4 ms-3 ">
                <i className="bi bi-bootstrap fs-5 me-2"></i>
                <span className="fs-4">DoWhat</span>
            </Link>
            <hr className="text-secondary m-0" />
            <ul className="nav nav-pills flex-column pt-3 pb-3" id="parentM">
                <li className="nav-item p-2 ps-4">
                    <Link to="/home" className="nav-link">
                        <i className="bi bi-house me-2 fs-5"></i>
                        <span className="fs-5">Home</span>
                    </Link>
                </li>
                <li className="nav-item p-2 ps-4">
                    <Link to="/" className="nav-link">
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">WIP</span>
                    </Link>
                </li>
                <li className="nav-item p-2 ps-4">
                    <Link to="/" className="nav-link">
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">WIP</span>
                    </Link>
                </li>
                <li className="nav-item p-2 ps-4">
                    <Link to="/" className="nav-link">
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">WIP</span>
                    </Link>
                </li>
            </ul>
            <hr className="text-secondary m-0" />
            <Collapse rooms={rooms} />
        </div>
    )
}

interface CollapseProp {
    rooms: any[]
}

function Collapse({ rooms }: CollapseProp) {
    const [show, setShow] = useState(false)
    return (
        <Fragment>
            <div className="flex-column w-100 ps-5 pt-3 pb-3 ms-2" style={{ cursor: 'pointer' }} onClick={() => setShow(prevShow => !prevShow)}>
                <span className="fs-6 pe-3">Rooms</span>
                <i className="bi bi-arrow-right-short"></i>
            </div>
            {show ? (
                <div>
                    <hr className="text-secondary m-0 ms-4 me-4" />
                </div>
            ) : (
                <div className="flex-column" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {!(rooms.length === 0) ? (
                        rooms.map((room) => (
                            <Fragment key={room.room_name}>
                                <hr className="text-secondary m-0 ms-4 me-4" />
                                <Link to={`/room/${room.room_name}`} className="nav-link">
                                    <div
                                        className="p-2 ps-5 flex-column justify-content-center"
                                        style={{ cursor: 'pointer' }}
                                        id="sideBarCard"
                                    >
                                        {room.room_name}
                                    </div>
                                </Link>
                            </Fragment>
                        ))
                    ) : (
                        <Fragment>
                            <div className="p-2 ps-5 flex-column justify-content-center">
                                Not in any Rooms <i className="bi bi-emoji-dizzy ms-3"></i>
                            </div>
                        </Fragment>
                    )}
                </div>
            )}


        </Fragment>


    )
}

export default SideBar