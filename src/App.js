import React from "react";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PATH_HOME, PATH_SHARE } from "./utils/constants";
import { AuthProvider } from "./provider/Auth";
import configureStore from "./store";
import { Provider } from "react-redux";
import Share from "./route/Share/Share";
import Home from "./route/Home/Home";

const appStore = configureStore();

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="app-container">
        <Provider store={appStore}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path={PATH_SHARE} element={<Share />}/>
                <Route exact path={PATH_HOME} element={<Home/>} />
                <Route path="*" element={<Navigate to={PATH_HOME} />} />                  
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </div>
    </React.Fragment>
  );
}

export default App;
