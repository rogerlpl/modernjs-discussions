import { defineConfig } from '@modern-js/runtime';
import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, BrowserRouter, Link, Outlet } from '@modern-js/runtime/router';

import { useEffect, useState } from 'react';
import { get as hello } from '@api/hello'
const AppLayout = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        hello().then((setText));

    }, []);
    return (
        <>
            <div><Link to={'/table'}>Loading conventional routed sub-applications</Link></div>
            <div><Link to={'/dashboard'}>Loading Self-Controlled Routing Sub-Applications</Link></div>
            <div><Link to={'/'}>Uninstall a sub-application</Link></div>
            <h1>{text}</h1>
            <Outlet />
        </>
    )
}


const App = () => {
    const { apps, MApp, Table, Dashboard } = useModuleApps();

    // If you are not using the MApp component, you need to use createBrowserRouter to create the route.
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<AppLayout />} >
                {apps?.map(app => {
                    const { Component } = app;
                    console.log(`${app.name.toLowerCase()}/*`)
                    console.log(Component?.length)
                    // Fuzzy match, path needs to be written in a pattern similar to abc/*
                    return (
                        <Route
                            key={app.name}
                            path={`${app.name.toLowerCase()}/*`}
                            element={
                                //@ts-ignore
                                < Component
                                    loadable={{
                                        loading: ({ pastDelay, error }: any) => {
                                            if (error) {
                                                return <div>error: {error?.message}</div>;
                                            } else if (pastDelay) {
                                                return <div>loading</div>;
                                            } else {
                                                return null;
                                            }
                                        },
                                    }}
                                />


                            }
                        />
                    )
                })}
            </Route>
        )
    );

    return (
        // Approach 1: Use MApp to automatically load sub-applications based on the configured activeWhen parameter (this project is configured in modern.config.ts)
        <BrowserRouter>
            <AppLayout />
            <MApp />
        </BrowserRouter>

        // Approach 2: Manually write Route components to load sub-applications, which is convenient for scenarios that require authentication and other pre-requisite operations
        // <>
        //     <RouterProvider router={router} />
        // </>
    );
};

defineConfig(App, {
    masterApp: {
        manifest: {
            getAppList: async () => {
                // get from remote api
                return [

                    {
                        name: 'Table',
                        entry: 'http://localhost:4001',
                        activeWhen: '/table'
                    },
                    {
                        name: 'Dashboard',
                        entry: 'http://localhost:4002',
                        activeWhen: '/dashboard'
                    }];
            },
        },
    },
});



// defineConfig(App, {
//     masterApp: {
//         apps: [
//             {
//                 // name is case sensitive, what name provides is what useModuleApps returns
//                 name: 'Dashboard',
//                 activeWhen: '/dashboard',
//                 entry: 'http://127.0.0.1:4002/',
//             },
//             {
//                 name: 'Table',
//                 activeWhen: '/table',
//                 entry: 'http://localhost:4001',
//             },
//         ],
//     },
// });


export default App;