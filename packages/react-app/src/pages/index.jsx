import React, {useEffect, useState} from 'react';

import {Outlet} from "react-router-dom";

import Banner2 from "../components/Banner2";
import {useSelector} from "react-redux";

import Sidebar from '../components/sidebar';
import Header from '../components/header';

function MainDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [bannerOpen, setBannerOpen] = useState(false)
    const notification = useSelector((state) => state.notification.notification)

    useEffect(() => {
        setBannerOpen(notification !== null)
    }, [notification])

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                {
                    notification !== null
                        ? <Banner2
                            type={notification.type}
                            open={bannerOpen}
                            setOpen={setBannerOpen}
                            className={`mx-5 my-5 mb-0`}
                        >
                            {notification.message}
                        </Banner2>
                        : <></>
                }
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainDashboard;
