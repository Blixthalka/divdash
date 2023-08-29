import { Outlet } from "react-router-dom";
import './app.css';
import Header from './components/Header';

function LoggedIn() {

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <div className="pt-5 pb-20 px-5 ">
                <div className="max-w-4xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>

    );
}

export default LoggedIn;
