import React, {Suspense, Fragment, useEffect} from "react";
import {Switch, Route, useHistory} from "react-router-dom";
import Loader from "react-loader-spinner";
import {useSelector, useDispatch} from "react-redux";
import {useToasts} from "react-toast-notifications";

/* others */
import {checkToken} from "./store/actions/authAction";
import {errorMessage} from "./helpers/helpers";

/* components */
import Home from "./components/Home";
import Image from "./components/Image";
import Logs from  "./components/Logs";
import NotFound from "./components/NotFound";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

export default function App() {
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuth} = useSelector(state => state.auth);

    useEffect( _ => {
        const {pathname} = history.location;
        let lastRoute = localStorage.getItem('last_route');
        if(isAuth && (pathname === '/sign-in' || pathname === '/sign-up')){
            lastRoute ? history.push(lastRoute) : history.push("/");
        }else if (!isAuth && (pathname !== '/sign-in' && pathname !== '/sign-up')){
            const currentPath = lastRoute ? pathname : "/";
            localStorage.setItem('last_route', currentPath);
            dispatch(checkToken()).then(data => errorMessage(data, addToast));
            history.push("/sign-in");
        }
    }, [isAuth]);

    return (
        <Suspense fallback={<div className={"main-loader"}><Loader type="Oval" color="#000" height={100} width={100}/></div>}>
            <Switch>
                { isAuth ?
                    <Fragment>
                        <Route exact={true} path="/">
                            <Home />
                        </Route>
                        <Route path="/logs/:id">
                            <Logs/>
                        </Route>
                        <Route path="/image/:id">
                            <Image/>
                        </Route>
                    </Fragment> :
                    <Fragment>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                    </Fragment>
                }
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Suspense>
    );
}