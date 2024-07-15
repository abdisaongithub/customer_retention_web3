import React, {
    useEffect
} from 'react'
import {
    useLazyGetParticipatingcampaignQuery,
    useUpdateParticipatingcampaignMutation
} from "./participatingcampaignsSlice"
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

const ParticipatingcampaignsListDetail = ({}) => {
    const {
        participatingcampaignId
    } = useParams();
    const [participatingcampaignTrigger, participatingcampaignResult, participatingcampaignLastPromiseInfo] = useLazyGetParticipatingcampaignQuery()

    const [updateParticipatingcampaign] = useUpdateParticipatingcampaignMutation()

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
            participatingcampaignTrigger(participatingcampaignId)
            .unwrap(), {
                pending: `Fetching Participatingcampaign detail`,
                success: `Fetched Participatingcampaign detail successfully`,
                error: `Could not get Participatingcampaign detail`,
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
    }, [participatingcampaignId]);


    const onFormSubmit = async (formData) => {
        const {
            status,
        } = formData;

        toast.promise(updateParticipatingcampaign({
            id: participatingcampaignResult.data.id,
            status,
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


    if (participatingcampaignResult.isLoading || participatingcampaignResult.isUninitialized || participatingcampaignResult.isFetching) {
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

    if (participatingcampaignResult.isError) {

        toast.error("Could not fetch Participatingcampaign detail", {
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

    if (participatingcampaignResult.isSuccess) {
        return (
            <>
            <div className="border-t border-slate-200">
                    <form className="row p-3" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-2 gap-x-5">
                            
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "status" >
                    Status  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="status"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={participatingcampaignResult.data.status ?? '-'}
                    name="status"
                    {...register('status', {
                            required: {value: true, message: "Status  is required"},

                        }
                    )}
                />
                {errors.status && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.status.message}</span></p>}
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
                                <span className="hidden xs:block ml-1">Update Participatingcampaign </span>
                            </button>
                        </div>
                    </form>
                </div>
        </>

        );
    }


}
export default ParticipatingcampaignsListDetail