import Login from "./Login";

interface BodyProps {
    login: (userid: string) => void;
}

function Body({ login }: BodyProps) {
    return (
        <div className="p-0">
            <nav className="navbar bg-body-tertiary p-0 m-0 fixed-top" style={{ height: '100px' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{ paddingLeft: '20%' }}>
                        <img src="/DoWhat.png" alt="Logo" height={'75px'} className="d-inline-block align-text-top" />
                    </a>
                </div>
            </nav>
            <div style={{ paddingTop: '100px' }}>
                <FirstSection login={login} />
                <SecondSection />
            </div>
        </div>
    )
}

interface FirstSectionProps {
    login: (userid: string) => void;
}

function FirstSection({ login }: FirstSectionProps) {
    return (
        <div className="row d-flex m-0 p-0 pt-5 pb-5 bg-body justify-content-center">
            <div className="col-lg-4 p-5 d-flex justify-content-end">
                <div className="" style={{ maxWidth: '560px' }}>
                    <h1 className="p-2">Accomplish more TOGETHER with DoWhat</h1>
                    <h4 className="p-3 pt-3 pb-5">So many tasks, so little time — made easier for effective communication</h4>
                    <div className="p-2">
                        <h5 className="pb-2">What you can do:</h5>
                        <div className="p-2">
                            <i className="bi bi-check-lg"></i>
                            <span>Create up to 10 rooms</span>
                        </div>
                        <div className="p-2">
                            <i className="bi bi-check-lg"></i>
                            <span>Work with up to 9 other users per room</span>
                        </div>
                        <div className="p-2">
                            <i className="bi bi-check-lg"></i>
                            <span>Leave messages for others to note</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center p-0">
                <Login login={login} />
            </div>
        </div>
    )
}

function SecondSection() {
    return (
        <div className="row d-flex justify-content-center p-0 m-0 pt-5 pb-5">
            <div className="row justify-content-center p-0 m-0 pt-5">
                <div className="col-md-9 d-flex justify-content-center align-items-center p-0 m-0">
                    <div className="flex-column text-start">
                        <h2 className="p-1">Unlocking Collaboration,</h2>
                        <h2 className="p-1">Empowering Teams,</h2>
                        <h2 className="p-1">Do More Together with DoWhat.</h2>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center p-0" style={{ marginBottom: '50px', marginTop: '50px' }}>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ minWidth: '460px', width: '600px' }}>
                    <h5>Clear your mind</h5>
                    <h2>The fastest way to get tasks out of your head.</h2>
                    <h4>Never lose sight of your goals again and Track your progress effortlessly as you check off tasks.</h4>
                </div>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ height: '460px', minWidth: '460px', width: '600px' }}>
                    <img src="/Screenshot1.png" alt="screenshot1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="rounded-4 border" id="scoll-fade"/>
                </div>
            </div>
            <div className="row justify-content-center p-0" style={{ marginBottom: '50px', marginTop: '50px' }}>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ height: '460px', minWidth: '460px', width: '600px' }}>
                    <img src="/Screenshot1.png" alt="screenshot1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="rounded-4 border" id="scoll-fade"/>
                </div>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ minWidth: '460px', width: '600px' }}>
                    <h5>Tasks organisation</h5>
                    <h2>Visual cues and neat layouts</h2>
                    <h4>Organize tasks systematically, making it easier to prioritize and manage workload.</h4>
                </div>
            </div>
            <div className="row justify-content-center p-0" style={{ marginBottom: '50px', marginTop: '50px' }}>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ minWidth: '460px', width: '600px' }}>
                    <h5>Effective Collaboration</h5>
                    <h2>A Great way to communicate and work as a team.</h2>
                    <h4>Stay focused on your objectives while maintaining seamless communication.</h4>
                </div>
                <div className="d-flex flex-column justify-content-center col-md-4 row-md-4 p-5" style={{ height: '460px', minWidth: '460px', width: '600px' }}>
                    <img src="/Screenshot1.png" alt="screenshot1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="rounded-4 border" id="scoll-fade"/>
                </div>
            </div>
        </div>
    );

}

export default Body