import React, {Suspense, useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import Loader from "react-loader-spinner";
import {useSelector, useDispatch} from "react-redux";
import {useToasts} from "react-toast-notifications";

/* others */
import {checkToken} from "../store/actions/authAction";
import {errorMessage} from "../helpers/helpers";

/* components */
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home";
import Image from "../components/Image";
import Logs from "../components/Logs";
import NotFound from "../components/NotFound";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function App() {
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth);

    useEffect( _ => {
        if(!isAuth) dispatch(checkToken()).then(data => errorMessage(data, addToast));
    }, [isAuth]);

    return (
        <Suspense fallback={<div className={"main-loader"}><Loader type="Oval" color="#000" height={100} width={100}/></div>}>
            <Switch>
                <PublicRoute restricted={false} component={SignIn} auth={isAuth} path="/sign-in" exact />
                <PublicRoute restricted={false} component={SignUp} auth={isAuth} path="/sign-up" exact />
                <PrivateRoute auth={isAuth} component={Home} path="/" exact />
                <PrivateRoute auth={isAuth} component={Logs} path="/logs/:id" exact />
                <PrivateRoute auth={isAuth} component={Image} path="/image/:id" exact />
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Suspense>
    );
}