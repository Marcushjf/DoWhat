import { Link } from "react-router-dom"
import 'bootstrap/js/dist/collapse'
import { Fragment } from "react/jsx-runtime"
import { useEffect, useState } from "react"

interface SideBarProp {
    rooms: any[]
}

function SideBar({ rooms }: SideBarProp) {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [show, setShow] = useState(true)
    // Function to check if screen width is too small
    const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 1500);
    };

    // Add event listener to check screen size on mount and window resize
    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    return (
        <Fragment>
            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="offcanvasSideBar"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-body p-0 m-0">
                    <div className="d-flex flex-column bg-body justify-content-space-between vh-100">
                        <Link to="/home" className="d-flex p-4 ms-3 ">
                            <i className="bi bi-bootstrap fs-5 me-2"></i>
                            <span className="fs-4">DoWhat</span>
                        </Link>
                        <hr className="text-secondary m-0" />
                        <ul className="nav nav-pills flex-column pt-3 pb-3" id="parentM">
                            <li className="nav-item p-2 ps-4" data-bs-toggle="offcanvas">
                                <Link to="/home" className="nav-link">
                                    <i className="bi bi-house me-2 fs-5"></i>
                                    <span className="fs-5">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item p-2 ps-4" data-bs-toggle="offcanvas">
                                <Link to="/" className="nav-link">
                                    <i className="bi bi-speedometer me-2 fs-5"></i>
                                    <span className="fs-5">WIP</span>
                                </Link>
                            </li>
                            <li className="nav-item p-2 ps-4" data-bs-toggle="offcanvas">
                                <Link to="/" className="nav-link">
                                    <i className="bi bi-speedometer me-2 fs-5"></i>
                                    <span className="fs-5">WIP</span>
                                </Link>
                            </li>
                            <li className="nav-item p-2 ps-4" data-bs-toggle="offcanvas">
                                <Link to="/" className="nav-link">
                                    <i className="bi bi-speedometer me-2 fs-5"></i>
                                    <span className="fs-5">WIP</span>
                                </Link>
                            </li>
                        </ul>
                        <hr className="text-secondary m-0" />
                        <Collapse rooms={rooms} />
                    </div>
                </div>
            </div>
            {(!isSmallScreen && show) &&
                <div className="d-flex flex-column bg-body justify-content-space-between vh-100" style={{ width: '290px', position: 'relative' }}>
                    <button type="button" className="btn text-light" id="sideBarCollapse" onClick={() => { setShow(prevShow => !prevShow) }} style={{ position: 'absolute', right: 3, top: 3, width: '50px', height: '50px' }}><i className="bi bi-layout-sidebar"></i></button>
                    <Link to="/home" className="d-flex p-4 ms-3 ">
                        <i className="bi bi-bootstrap fs-5 me-2"></i>
                        <span className="fs-4">DoWhat</span>
                    </Link>
                    <hr className="text-secondary m-0" />
                    <ul className="nav nav-pills flex-column pt-3 pb-3" id="parentM">
                        <li className="nav-item p-2 ps-4">
                            <Link to="/home" className="nav-link">
                                <i className="bi bi-house me-2 fs-5"></i>
                                <span className="fs-5 nav-underline">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item p-2 ps-4">
                            <Link to="/home" className="nav-link">
                                <i className="bi bi-speedometer me-2 fs-5"></i>
                                <span className="fs-5 nav-underline">WIP</span>
                            </Link>
                        </li>
                        <li className="nav-item p-2 ps-4">
                            <Link to="/home" className="nav-link">
                                <i className="bi bi-speedometer me-2 fs-5"></i>
                                <span className="fs-5 nav-underline">WIP</span>
                            </Link>
                        </li>
                        <li className="nav-item p-2 ps-4">
                            <Link to="/home" className="nav-link">
                                <i className="bi bi-speedometer me-2 fs-5"></i>
                                <span className="fs-5 nav-underline">WIP</span>
                            </Link>
                        </li>
                    </ul>
                    <hr className="text-secondary m-0" />
                    <Collapse rooms={rooms} />
                </div>}

            {isSmallScreen &&
                <button
                    className="btn text-light position-fixed top-0 start-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSideBar"
                    aria-controls="offcanvasSideBar"
                    style={{ height: '50px', width: '50px', zIndex: 2000 }}
                >
                    <i className="bi bi-layout-sidebar"></i>
                </button>
            }
            {(!show && !isSmallScreen) &&
                <button
                    className="btn text-light position-fixed top-0 start-0"
                    type="button"
                    onClick={() => { setShow(prevShow => !prevShow) }}
                    style={{ height: '50px', width: '50px', zIndex: 2000 }}
                >
                    <i className="bi bi-layout-sidebar"></i>
                </button>
            }
        </Fragment>

    )
}

interface CollapseProp {
    rooms: any[]
}

function Collapse({ rooms }: CollapseProp) {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility of the collapse content
    function toggleVisibility() {
        setIsVisible(prev => !prev);
    }

    // CSS class based on visibility state
    const collapseClass = isVisible ? 'slide-down' : 'slide-up';

    return (
        <Fragment>
            <div className="flex-column w-100 ps-5 pt-3 pb-3 ms-2" style={{ cursor: 'pointer' }} onClick={toggleVisibility}>
                <span className="fs-6 nav-underline">Rooms</span>
                {isVisible ? (<i className="bi bi-arrow-down-short ps-3"></i>) : (<i className="bi bi-arrow-right-short ps-3"></i>)}
            </div>
            <div className={`flex-column ${collapseClass}`} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {!(rooms.length === 0) ? (
                    rooms.map((room) => (
                        <Fragment key={room.room_name}>
                            <hr className="text-secondary m-0 ms-4 me-4" />
                            <Link to={`/room/${room.room_name}`} className="nav-link">
                                <div className="p-2 ps-5 flex-column justify-content-center" style={{ cursor: 'pointer' }} id="sideBarCard">
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
        </Fragment>
    );
}


export default SideBar