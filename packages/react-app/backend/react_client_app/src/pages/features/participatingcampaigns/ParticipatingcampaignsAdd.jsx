import React, {
    useState
} from 'react'
import {
    useForm
} from "react-hook-form";
import {
    useCreateParticipatingcampaignMutation,
    useLazyCreateParticipatingcampaignMutation,
    useGetParticipatingcampaignsQuery,
    useLazyGetParticipatingcampaignsQuery,
    useGetParticipatingcampaignQuery,
    useLazyGetParticipatingcampaignQuery,
    useUpdateParticipatingcampaignMutation,
    useLazyUpdateParticipatingcampaignMutation,
    useDestroyParticipatingcampaignMutation,
    useLazyDestroyParticipatingcampaignMutation,
} from "./participatingcampaignsSlice";
import {
    useDispatch
} from "react-redux";
import {
    SketchPicker
} from "react-color";
import {
    Navigate
} from "react-router-dom";
import {
    Bounce,
    toast
} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    CKEditor
} from "@ckeditor/ckeditor5-react";

const ParticipatingcampaignsAdd = (props) => {
    const [redirectToList, setRedirectToList] = useState(false)



    const dispatch = useDispatch()
    const [createParticipatingcampaign, participatingcampaignResult, participatingcampaignResponsePromise] = useCreateParticipatingcampaignMutation()
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        },
    } = useForm();

    const onFormSubmit = async (formData) => {
        const {} = formData;

        toast.promise(createParticipatingcampaign({


                })
                .unwrap(), {
                    pending: `Adding a Participatingcampaign `,
                    success: `Successfully added Participatingcampaign `,
                    error: `Could not add Participatingcampaign `,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
            .then(result => {
                setRedirectToList(true)
            })
    }

    if (redirectToList) {
        return (<Navigate to={`/participatingcampaign`} replace={false}/>)
    }

    return (
        <>
            
                
                <div className="border-t border-slate-200">
                    <form className="row p-3" onSubmit={handleSubmit(onFormSubmit)}>

                        <div className="grid grid-cols-2 gap-x-5">
                        
                            
                        
                        </div>
                        <div className="flex">
                        <button
                            className="ml-auto mt-auto btn btn-sm border-red-500 hover:bg-red-600 text-red-400 hover:text-white"
                            type="button"
                            onClick={(event) => {
                                history.back()
                            }}
                        >
                            <span className="hidden xs:block ml-0">Cancel</span>
                        </button>
                            <button className="ml-2 mt-auto btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                                    type="submit"
                            >
                                <span className="hidden xs:block ml-2">Add Participatingcampaign</span>
                            </button>
                        </div>
                    </form>
                </div>
              
        </>
    )
}

export default ParticipatingcampaignsAdd