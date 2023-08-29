import React, { useState, createContext } from 'react';
import { Outlet } from "react-router-dom";
import './app.css'
import { ToastContextProvider } from './components/ToastContex'
import moment from 'moment/moment';

export const AppContext = createContext();


function fetchLocalStorage() {
    const json = localStorage.getItem("dividends");
    if (!json) {
        return []
    }

    return JSON.parse(json)
        .map(div => {
            return {
                date: moment(div.date),
                name: div.name,
                quantity: div.quantity,
                dividend: div.dividend,
                amount: div.amount,
                isin: div.isin,
                tag: div.tag
            }
        })
}


function App() {
    const [dividends, setDividends] = useState(fetchLocalStorage());


    function setDiv(divs) {
        localStorage.setItem("dividends", JSON.stringify(divs));
        setDividends(divs)
    }

    return (
        <AppContext.Provider value={{
            dividends: dividends,
            setDividends: setDiv
        }}>
            <ToastContextProvider>
                <Outlet />
            </ToastContextProvider>
        </AppContext.Provider>
    );
}

export default App;
