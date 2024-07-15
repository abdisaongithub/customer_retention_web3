import React, {
    useState
} from 'react'
import {
    useForm
} from "react-hook-form";
import {
    useCreateTaskMutation,
    useLazyCreateTaskMutation,
    useGetTasksQuery,
    useLazyGetTasksQuery,
    useGetTaskQuery,
    useLazyGetTaskQuery,
    useUpdateTaskMutation,
    useLazyUpdateTaskMutation,
    useDestroyTaskMutation,
    useLazyDestroyTaskMutation,
} from "./tasksSlice";
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

const TasksAdd = (props) => {
        const [redirectToList, setRedirectToList] = useState(false)


        const [isRequired, setIsRequired] = useState(false)

        const dispatch = useDispatch()
        const [createTask, taskResult, taskResponsePromise] = useCreateTaskMutation()
        const {
            register,
            handleSubmit,
            reset,
            formState: {
                errors
            },
        } = useForm();

        const onFormSubmit = async (formData) => {
            const {
                label,
                icon,
                link,
            } = formData;

            toast.promise(createTask({
                        required: isRequired,
                        label,
                        icon,
                        link,
                    })
                    .unwrap(), {
                        pending: `Adding a Task `,
                        success: `Successfully added Task `,
                        error: `Could not add Task `,
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
            return (<Navigate to={`/task`} replace={false}/>)
        }

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
                    defaultValue={''}
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
                                        defaultValue={''}
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
                                        defaultValue={''}
                                        {...register('link', {
                                            required: {value: true, message: "Link  is required"},
required: {value: false},
}
                                        )}
                                    ></textarea>
                                </div>
                 < div
                className = "pb-5" >
                    < label
                className = "flex text-sm font-medium mb-1"
                htmlFor = "mandatory" >
                    Required  < span
                className = "text-rose-500" > < /span>
                <div className="form-switch my-full ml-1">
                    <input
                        type="checkbox"
                        id={`toggle-required-task`}
                                                className="sr-only"
                                                checked={isRequired}
                                                onChange={async (e) => {
                                                    setIsRequired(!isRequired)
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
                                <span className="hidden xs:block ml-2">Add Task</span>
                            </button>
                        </div>
                    </form>
                </div>
              
        </>
    )
}

export default TasksAdd
    