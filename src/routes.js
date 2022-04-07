import BasicLayout from "./layouts/BasicLayout";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";

const routes = () => {
    return [
        {
            path: '/login',
            element: <Login isLogin={false} />,
        },
        {
            path: '/',
            element: <BasicLayout />,
            children: [
                { path: '/:id', element: <Chat /> },
            ]
        }
    ]
}

export default routes;