import { useRouteError, useLocation, useNavigate } from "@modern-js/runtime/router";
import { useEffect } from "react";

export default function ErrorPage() {
    const error: any = useRouteError();
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(location.pathname)
        navigate(location.pathname, { replace: true })
    }, [location.pathname])
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}