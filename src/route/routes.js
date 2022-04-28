import React from "react";
import Fallback from "../components/Fallback/Fallback";
import BasicLayout from "../layouts/BasicLayout";

const Chat = React.lazy(() => import("../pages/Chat/Chat"));
const Login = React.lazy(() => import("../pages/Login/Login"));

const routes = () => {
    return [
        {
            path: '/login',
            element:
                <React.Suspense fallback={<Fallback />}>
                    <Login isLogin={false} />
                </React.Suspense>,
        },
        {
            path: '/',
            element: <BasicLayout />,
            children: [
                {
                    path: '/:id', element:
                        <React.Suspense fallback={<Fallback />}>
                            <Chat />
                        </React.Suspense>
                },
            ]
        }
    ]
}

export default routes;