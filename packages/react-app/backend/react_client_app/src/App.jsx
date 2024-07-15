import React, {
    useEffect
} from 'react';
import {
    Navigate,
    Route,
    Routes,
    useLocation
} from 'react-router-dom';

import {
    Bounce,
    ToastContainer
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './css/style.css';

import MainDashboard from './pages';
import PageNotFound from './pages/utility/PageNotFound';
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import Overview from "./pages/features/dashboard";

import {
    useGetCurrentUserQuery
} from "./api/apiSlice";
import HomePage from "./pages/features/home";

import Users from './pages/features/users'
import UsersAdd from './pages/features/users/UsersAdd'
import UsersList from './pages/features/users/UsersList'
import UsersListItemDetail from './pages/features/users/UsersListItemDetail'


import Roles from './pages/features/roles'
import RolesAdd from './pages/features/roles/RolesAdd'
import RolesList from './pages/features/roles/RolesList'
import RolesListItemDetail from './pages/features/roles/RolesListItemDetail'


import Campaigns from './pages/features/campaigns'
import CampaignsAdd from './pages/features/campaigns/CampaignsAdd'
import CampaignsList from './pages/features/campaigns/CampaignsList'
import CampaignsListItemDetail from './pages/features/campaigns/CampaignsListItemDetail'


import Tasks from './pages/features/tasks'
import TasksAdd from './pages/features/tasks/TasksAdd'
import TasksList from './pages/features/tasks/TasksList'
import TasksListItemDetail from './pages/features/tasks/TasksListItemDetail'


import Notifications from './pages/features/notifications'
import NotificationsAdd from './pages/features/notifications/NotificationsAdd'
import NotificationsList from './pages/features/notifications/NotificationsList'
import NotificationsListItemDetail from './pages/features/notifications/NotificationsListItemDetail'


import Participatingcampaigns from './pages/features/participatingcampaigns'
import ParticipatingcampaignsAdd from './pages/features/participatingcampaigns/ParticipatingcampaignsAdd'
import ParticipatingcampaignsList from './pages/features/participatingcampaigns/ParticipatingcampaignsList'
import ParticipatingcampaignsListItemDetail from './pages/features/participatingcampaigns/ParticipatingcampaignsListItemDetail'





function App() {
    const location = useLocation();
    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({
            top: 0
        })
        document.querySelector('html').style.scrollBehavior = ''
    }, [location.pathname]); // triggered on route change

    const {
        data = {}, isError, isLoading, isSuccess, error
    } = useGetCurrentUserQuery()

    if (isLoading) return <h1>Loading</h1>

    return (
        <>
            {/*TODO: improve this shitty logic and compartmentalize it */}
            {isError && error.status === 401 && (location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/reset-password') ?
                <Navigate to='/signin' replace={true}/> : <></>}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/" element={<MainDashboard/>}>
                    <Route path="/dashboard" element={<Overview/>}/>
                    
                    
                    <Route path="/users" element={<Users />}>
                        <Route path="/users/add" element={<UsersAdd />} />
<Route path="/users" element={<UsersList />} />
<Route path="/users/:userId" element={<UsersListItemDetail />} />

                    </Route>
                    

                    <Route path="/roles" element={<Roles />}>
                        <Route path="/roles/add" element={<RolesAdd />} />
<Route path="/roles" element={<RolesList />} />
<Route path="/roles/:roleId" element={<RolesListItemDetail />} />

                    </Route>
                    

                    <Route path="/campaigns" element={<Campaigns />}>
                        <Route path="/campaigns/add" element={<CampaignsAdd />} />
<Route path="/campaigns" element={<CampaignsList />} />
<Route path="/campaigns/:campaignId" element={<CampaignsListItemDetail />} />

                    </Route>
                    

                    <Route path="/tasks" element={<Tasks />}>
                        <Route path="/tasks/add" element={<TasksAdd />} />
<Route path="/tasks" element={<TasksList />} />
<Route path="/tasks/:taskId" element={<TasksListItemDetail />} />

                    </Route>
                    

                    <Route path="/notifications" element={<Notifications />}>
                        <Route path="/notifications/add" element={<NotificationsAdd />} />
<Route path="/notifications" element={<NotificationsList />} />
<Route path="/notifications/:notificationId" element={<NotificationsListItemDetail />} />

                    </Route>
                    

                    <Route path="/participatingcampaigns" element={<Participatingcampaigns />}>
                        <Route path="/participatingcampaigns/add" element={<ParticipatingcampaignsAdd />} />
<Route path="/participatingcampaigns" element={<ParticipatingcampaignsList />} />
<Route path="/participatingcampaigns/:participatingcampaignId" element={<ParticipatingcampaignsListItemDetail />} />

                    </Route>
                    
         

                </Route>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    );
}

export default App;