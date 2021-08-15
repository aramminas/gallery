import React, {Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Loader from "react-loader-spinner";
/* components */
import Home from "./components/Home";
import Image from "./components/Image";
import Logs from  "./components/Logs";
import NotFound from "./components/NotFound";

export default function App() {
    return (
        <Suspense fallback={<div className={"main-loader"}><Loader type="Oval" color="#000" height={100} width={100}/></div>}>
            <Switch>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route path="/logs/:id">
                    <Logs/>
                </Route>
                <Route path="/image/:id">
                    <Image/>
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Suspense>
    );
}