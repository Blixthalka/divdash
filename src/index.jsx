import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import App from './App';
import LoggedIn from './LoggedIn';
import './index.css';
import Dashboard from './routes/Dashboard';
import DashboardYear from './routes/DashboardYear';
import Instrument from './routes/Instrument';
import NotFound from './routes/NotFound';
import Upload from './routes/Upload';
import UploadTag from './routes/UploadTag';
import Index from './routes/Index';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<LoggedIn />} >

            <Route index element={<Index />} />
            <Route element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:year" element={<DashboardYear />} />
            <Route path="instruments/:isin" element={<Instrument />} />
            <Route path="upload" element={<Upload />} />
            <Route path="upload/:tag" element={<UploadTag />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


