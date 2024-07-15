import React, {
    useEffect
} from 'react'
import {
    useLazyGetCampaignQuery,
    useUpdateCampaignMutation
} from "./campaignsSlice"
import {
    useDispatch
} from "react-redux";
import {
    useForm
} from "react-hook-form";
import {
    Lightbox
} from "react-modal-image-responsive";
import {
    useParams
} from "react-router-dom";
import SadFace from "../../../images/sad-face.svg";
import {
    ClipLoader
} from "react-spinners";
import {
    Bounce,
    toast
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = import.meta.env.VITE_LOCAL_API

const CampaignsListDetail = ({}) => {
        const {
            campaignId
        } = useParams();
        const [campaignTrigger, campaignResult, campaignLastPromiseInfo] = useLazyGetCampaignQuery()

        const [updateCampaign] = useUpdateCampaignMutation()

        const {
            register,
            handleSubmit,
            reset,
            formState: {
                errors
            },
        } = useForm()

        const dispatch = useDispatch()

        useEffect(() => {
            toast.promise(
                campaignTrigger(campaignId)
                .unwrap(), {
                    pending: `Fetching Campaign detail`,
                    success: `Fetched Campaign detail successfully`,
                    error: `Could not get Campaign detail`,
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
        }, [campaignId]);


        const onFormSubmit = async (formData) => {
            const {
                title,
                description,
                allocated_amount,
                allocation_currency,
                logo,
                verified,
                cover_image,
                start,
                end,
                prize_candidates,
            } = formData;

            toast.promise(updateCampaign({
                id: campaignResult.data.id,
                title,
                description,
                allocated_amount,
                allocation_currency,
                logo,
                verified,
                cover_image,
                start,
                end,
                prize_candidates,
            }).unwrap(), {
                pending: "Creating Project",
                success: `Successfully updated the record`,
                error: `Could not update record`,
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

        }


        if (campaignResult.isLoading || campaignResult.isUninitialized || campaignResult.isFetching) {
            return (
                <div className={`flex items-center justify-center h-screen`}>
            <ClipLoader
                className={`my-auto`}
                color={`#000000`}
                loading={true}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
            )
        }

        if (campaignResult.isError) {

            toast.error("Could not fetch Campaign detail", {
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

            return (<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="max-w-2xl m-auto mt-16">
                                <div className="text-center px-4">
                                    <div className="inline-flex mb-8">
                                        <img src={SadFace} width="176" height="176"
                                             alt="404 illustration"/>
                                    </div>
                                    <div className="mb-6 text-3xl">Something Went Wrong</div>
                                </div>
                            </div>
                        </div>)
        }

        if (campaignResult.isSuccess) {
            return (
                    <>
            <div className="border-t border-slate-200">
                    <form className="row p-3" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-2 gap-x-5">
                            
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "title" >
                    Title  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="title"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={campaignResult.data.title ?? '-'}
                    name="title"
                    {...register('title', {
                            required: {value: true, message: "Title  is required"},

                        }
                    )}
                />
                {errors.title && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.title.message}</span></p>}
            </div>
                
                < div
                className = "pb-5" >
                    < label
                className = "block text-sm font-medium mb-1"
                htmlFor = "description" >
                    Description  <span className="text-rose-500">*</span>
                    < /label>
                    <CKEditor
                        name={'businessDescription'}
                        editor={ClassicEditor}
                        // data={detail !== null ? detail.description : ''}
                        data={campaignResult.data.description ?? ''}
                        onReady={editor => {
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescriptionText(data)
                        }}
                        onBlur={(event, editor) => {
                            // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
            </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="allocated_amount">
                                        Allocated Amount  <span className="text-rose-500">*</span>
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="allocated_amount"
                                        defaultValue={campaignResult.data.allocated_amount ?? '-'}
                                        {...register('allocated_amount', {
                                            required: {value: true, message: "Allocated Amount  is required"},
}
                                        )}
                                    ></textarea>
                                </div>
                
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "allocation_currency" >
                    Allocation Currency  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="allocation_currency"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={campaignResult.data.allocation_currency ?? '-'}
                    name="allocation_currency"
                    {...register('allocation_currency', {
                            required: {value: true, message: "Allocation Currency  is required"},

                        }
                    )}
                />
                {errors.allocation_currency && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.allocation_currency.message}</span></p>}
            </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="logo">
                                        Logo  <span className="text-rose-500">*</span>
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="logo"
                                        defaultValue={campaignResult.data.logo ?? '-'}
                                        {...register('logo', {
                                            required: {value: true, message: "Logo  is required"},
}
                                        )}
                                    ></textarea>
                                </div>
                <div className="pb-5">
                                    <label className="flex text-sm font-medium mb-1" htmlFor="mandatory">
                                        Verified  <span className="text-rose-500"></span>
                                        <div className="form-switch my-full ml-1">
                                            <input 
                                                type="checkbox" 
                                                id={`toggle-verified-campaign`}
                                                className="sr-only"
                                                checked={campaignResult.data.verified} 
                                                onChange={async (e) => {
                                                    toggleVerified({id: campaignResult.data.id})
                                                }} 
                                            />
                                            <label className="bg-slate-400" htmlFor={`toggle-verified-campaign`}>
                                                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                                            </label>
                                        </div>
                                    </label>
                                </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="cover_image">
                                        Cover Image  
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="cover_image"
                                        defaultValue={campaignResult.data.cover_image ?? '-'}
                                        {...register('cover_image', {
                                            required: {value: false},
}
                                        )}
                                    ></textarea>
                                </div>
                
                            <div 
                            className="pb-5">
                                <label 
                                className="block text-sm font-medium mb-1" 
                                htmlFor="start">
                                    Start  <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    id="start" 
                                    className="form-input w-full ml-2 "
                                     type="datetime-local"
                                     defaultValue={campaignResult.data.start ?? ''}
                                     name="start"
                                       {...register('start', {
                                            required: {value: true, message: "Start  is required"},
}
                                     )} 
                                />
                            </div>
                
                            <div 
                            className="pb-5">
                                <label 
                                className="block text-sm font-medium mb-1" 
                                htmlFor="end">
                                    End  <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    id="end" 
                                    className="form-input w-full ml-2 "
                                     type="datetime-local"
                                     defaultValue={campaignResult.data.end ?? ''}
                                     name="end"
                                       {...register('end', {
                                            required: {value: true, message: "End  is required"},
}
                                     )} 
                                />
                            </div>
                
                            <div 
                            className="pb-5">
                                <label 
                                className="block text-sm font-medium mb-1" 
                                htmlFor="prize_candidates">
                                    Prize Candidates  <span className="text-rose-500">*</span>
                                </label>
                                <input 
                                    id="prize_candidates" 
                                    className="form-input full ml-2 "
                                     type="number"
                                     step="any"
                                     defaultValue={campaignResult.data.prize_candidates ?? '0'}
                                     name="prize_candidates"
                                       {...register('prize_candidates', {
                                            required: {value: true, message: "Prize Candidates  is required"},
}
                                     )} 
                                />
                            </div>
                
                        </div>
                        <div className="flex">
                            <button className="ml-auto mt-auto btn bg-red-500 hover:bg-red-600 text-white"
                                    type="button"
                                    onClick={event => {
                                            history.back()
                                        }
                                    }
                            >
                                <span className="hidden xs:block ml-1">Cancel</span>
                            </button>
                            <button className="ml-2 mt-auto btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                    type="submit"
                            >
                                <span className="hidden xs:block ml-1">Update Campaign </span>
                            </button>
                        </div>
                    </form>
                </div>
        </>

    );
    }
    
    
}
export default CampaignsListDetail