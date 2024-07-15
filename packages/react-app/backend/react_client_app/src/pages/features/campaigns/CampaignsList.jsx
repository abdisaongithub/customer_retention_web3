import React, {
    useEffect,
    useState
} from 'react'
import CampaignsListItem from "./CampaignsListItem"
import {
    useGetCampaignsQuery
} from "./campaignsSlice"
import PaginationClassic from "../../compnents/PaginationClassic"
import {
    useDispatch
} from "react-redux";
import SadFace from "../../../images/sad-face.svg";
import {
    Bounce,
    toast
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CampaignsList = () => {
    const {
        data = {}, isError, isLoading, isSuccess, error
    } = useGetCampaignsQuery()

    const dispatch = useDispatch()

    if (isLoading) return <h1>Loading</h1>

    if (isError) {
        toast.error("Could not fetch the Campaign", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
        })
        return <h1>Some Error Happened</h1>
    }

    return (
        <>
            {
                data?.['rows'].length > 0
                    ? <>
            <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
                <header className="px-5 py-4">
                    <h2 className="font-semibold text-slate-800">Campaigns - <span
                        className="text-slate-400 font-medium">{data?.['count']}</span></h2>
                </header>
                <div>
                
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            {/* Table header */}
                            <thead
                                className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                            <tr key={0}>
                            
                                
                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="font-semibold text-left">Title </div>
                            </th>
                            
                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="font-semibold text-left">Description </div>
                            </th>
                            
                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="font-semibold text-left">Allocated Amount </div>
                            </th>
                            
                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="font-semibold text-left">Allocation Currency </div>
                            </th>
                            
                            <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div className="font-semibold text-left">Verified </div>
                            </th>
                            
                                
                                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-left">Actions</div>
                                </th>
                                
                            </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="text-sm divide-y divide-slate-200">
                            {
                              data['rows']?.map(listElement => {
                                    return (
                                        <CampaignsListItem
                                            key={listElement.id}
                                            react_unique_identifier_key={listElement.id}
                                            title={listElement.title}
                               description={listElement.description}
                               allocated_amount={listElement.allocated_amount}
                               allocation_currency={listElement.allocation_currency}
                               verified={listElement.verified}
                               
                                        />
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-8">
                <PaginationClassic totalPages={data?.['total_pages']} count={data?.['count']} currentPage={data?.['current_page']}/>
            </div>
        </>
        :
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="max-w-2xl m-auto mt-16">
                            <div className="text-center px-4">
                                <div className="inline-flex mb-8">
                                    <img src={SadFace} width="176" height="176"
                                         alt="404 illustration"/>
                                </div>
                                <div className="mb-6 text-3xl">No Data Found Here</div>
                            </div>
                        </div>
                    </div>
            }

        </>

    );
}
export default CampaignsList