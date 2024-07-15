import React, {
    useEffect
} from 'react'
import {
    useLazyGetTaskQuery,
    useUpdateTaskMutation
} from "./tasksSlice"
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

const TasksListDetail = ({}) => {
    const {
        taskId
    } = useParams();
    const [taskTrigger, taskResult, taskLastPromiseInfo] = useLazyGetTaskQuery()

    const [updateTask] = useUpdateTaskMutation()

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
            taskTrigger(taskId)
            .unwrap(), {
                pending: `Fetching Task detail`,
                success: `Fetched Task detail successfully`,
                error: `Could not get Task detail`,
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
    }, [taskId]);


    const onFormSubmit = async (formData) => {
        const {
            label,
            icon,
            link,
            required,
        } = formData;

        toast.promise(updateTask({
            id: taskResult.data.id,
            label,
            icon,
            link,
            required,
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


    if (taskResult.isLoading || taskResult.isUninitialized || taskResult.isFetching) {
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

    if (taskResult.isError) {

        toast.error("Could not fetch Task detail", {
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

    if (taskResult.isSuccess) {
        return (
            <>
            <div className="border-t border-slate-200">
                    <form className="row p-3" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="grid grid-cols-2 gap-x-5">
                            
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "label" >
                    Label  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="label"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={taskResult.data.label ?? '-'}
                    name="label"
                    {...register('label', {
                            required: {value: true, message: "Label  is required"},

                        }
                    )}
                />
                {errors.label && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.label.message}</span></p>}
            </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="icon">
                                        Icon  
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="icon"
                                        defaultValue={taskResult.data.icon ?? '-'}
                                        {...register('icon', {
                                            required: {value: false},
}
                                        )}
                                    ></textarea>
                                </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="link">
                                        Link  <span className="text-rose-500">*</span>
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="link"
                                        defaultValue={taskResult.data.link ?? '-'}
                                        {...register('link', {
                                            required: {value: true, message: "Link  is required"},
required: {value: false},
}
                                        )}
                                    ></textarea>
                                </div>
                <div className="pb-5">
                                    <label className="flex text-sm font-medium mb-1" htmlFor="mandatory">
                                        Required  <span className="text-rose-500"></span>
                                        <div className="form-switch my-full ml-1">
                                            <input 
                                                type="checkbox" 
                                                id={`toggle-required-task`}
                                                className="sr-only"
                                                checked={taskResult.data.required} 
                                                onChange={async (e) => {
                                                    toggleRequired({id: taskResult.data.id})
                                                }} 
                                            />
                                            <label className="bg-slate-400" htmlFor={`toggle-required-task`}>
                                                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                                            </label>
                                        </div>
                                    </label>
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
                                <span className="hidden xs:block ml-1">Update Task </span>
                            </button>
                        </div>
                    </form>
                </div>
        </>

        );
    }


}
export default TasksListDetail