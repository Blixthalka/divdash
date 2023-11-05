import React, { useState, createContext } from 'react';
import { Outlet } from "react-router-dom";
import './app.css'
import { ToastContextProvider } from './components/ToastContex'
import moment from 'moment/moment';
import ReactGA from 'react-ga';


export const AppContext = createContext();

ReactGA.initialize('G-RWVMJK7H71');
ReactGA.pageview(window.location.pathname + window.location.search);

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
            merge: [],
            goals: []
        }
    }

    const values = JSON.parse(json)
    return {
        merge: values?.merge || [],
        goals: (values?.goals || []).sort((a, b) => a.year > b.year ? -1 : 1)
    }
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
