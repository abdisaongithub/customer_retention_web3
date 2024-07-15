import React, {
    useState
} from 'react'
import {
    useForm
} from "react-hook-form";
import {
    useCreateNotificationMutation,
    useLazyCreateNotificationMutation,
    useGetNotificationsQuery,
    useLazyGetNotificationsQuery,
    useGetNotificationQuery,
    useLazyGetNotificationQuery,
    useDestroyNotificationMutation,
    useLazyDestroyNotificationMutation,
    useTurnToTrueReadMutation,
    useLazyTurnToTrueReadMutation,
} from "./notificationsSlice";
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

const NotificationsAdd = (props) => {
        const [redirectToList, setRedirectToList] = useState(false)


        const [descriptionText, setDescriptionText] = useState('')
        const [isRead, setIsRead] = useState(false)

        const dispatch = useDispatch()
        const [createNotification, notificationResult, notificationResponsePromise] = useCreateNotificationMutation()
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
                title,
            } = formData;

            toast.promise(createNotification({
                        description: descriptionText,
                        read: isRead,
                        title,
                    })
                    .unwrap(), {
                        pending: `Adding a Notification `,
                        success: `Successfully added Notification `,
                        error: `Could not add Notification `,
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
            return (<Navigate to={`/notification`} replace={false}/>)
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
                htmlFor = "title" >
                    Title  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="title"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
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
                        data={descriptionText}
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
                 < div
                className = "pb-5" >
                    < label
                className = "flex text-sm font-medium mb-1"
                htmlFor = "mandatory" >
                    Read  < span
                className = "text-rose-500" > < /span>
                <div className="form-switch my-full ml-1">
                    <input
                        type="checkbox"
                        id={`toggle-read-notification`}
                                                className="sr-only"
                                                checked={isRead}
                                                onChange={async (e) => {
                                                    setIsRead(!isRead)
                                                }}
                                            />
                                            <label className="bg-slate-400" htmlFor={`toggle-read-notification`}>
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
                                <span className="hidden xs:block ml-2">Add Notification</span>
                            </button>
                        </div>
                    </form>
                </div>
              
        </>
    )
}

export default NotificationsAdd
    