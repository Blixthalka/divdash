import React, { useState, createContext } from 'react';
import { Outlet } from "react-router-dom";
import './app.css'
import { ToastContextProvider } from './components/ToastContex'
import moment from 'moment/moment';

export const AppContext = createContext();


function fetchDividendsLocalStorage() {
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

function fetchSettingsLocalStorage() {
    const json = localStorage.getItem("settings");
    if (!json) {
        return {
            merge: []
        }
    }

    return JSON.parse(json)
}


function App() {
    const [dividends, setDividends] = useState(fetchDividendsLocalStorage());
    const [settings, setSettings] = useState(fetchSettingsLocalStorage())


    function setDiv(divs) {
        localStorage.setItem("dividends", JSON.stringify(divs));
        setDividends(divs)
    }


    function setSet(sett) {
        localStorage.setItem("settings", JSON.stringify(sett));
        setSettings(sett)
    }

    return (
        <AppContext.Provider value={{
            dividends: dividends,
            settings: settings,
            setDividends: setDiv,
            setSettings: setSet
        }}>
            <ToastContextProvider>
                <Outlet />
            </ToastContextProvider>
        </AppContext.Provider>
    );
}

export default App;
