import { Outlet } from "react-router-dom";
import './app.css';
import Header from './components/Header';

function LoggedIn() {

    return (
        <div className="bg-[#0C0F11] min-h-screen">
            <Header />
            <div className="pt-5 pb-20 px-5 ">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default LoggedIn;
