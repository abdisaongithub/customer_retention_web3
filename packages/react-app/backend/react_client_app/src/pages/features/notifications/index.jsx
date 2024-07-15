import React from 'react'
import {
    Link,
    Outlet,
    useLocation
} from "react-router-dom";

const Notifications = (props) => {
    const location = useLocation();
    const {
        pathname
    } = location;

    return (
        <>
            <div className="sm:flex sm:justify-between sm:items-center mb-5">

                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Notifications  ✨</h1>
                </div>
                
                {
                    pathname.includes('add') ? <></> :
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            <Link
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                to={`/notifications/add`}
                            >
                                <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                    <path
                                        d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                                </svg>
                                <span className="hidden xs:block ml-2">Add Notification</span>
                            </Link>
                        </div>

                }

            </div>

            <Outlet />
                       
        </>
    )
}

export default Notifications