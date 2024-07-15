import React, {
    useState
} from 'react'
import {
    useForm
} from "react-hook-form";
import {
    useCreateUserMutation,
    useLazyCreateUserMutation,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useGetUserQuery,
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useLazyUpdateUserMutation,
    useDestroyUserMutation,
    useLazyDestroyUserMutation,
    useToggleStatusMutation,
    useLazyToggleStatusMutation,
} from "./usersSlice";
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

const UsersAdd = (props) => {
        const [redirectToList, setRedirectToList] = useState(false)



        const dispatch = useDispatch()
        const [createUser, userResult, userResponsePromise] = useCreateUserMutation()
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
                name,
                email,
                phone,
            } = formData;

            toast.promise(createUser({

                        name,
                        email,
                        phone,
                    })
                    .unwrap(), {
                        pending: `Adding a User `,
                        success: `Successfully added User `,
                        error: `Could not add User `,
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
            return (<Navigate to={`//user`} replace={false}/>)
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
                htmlFor = "name" >
                    Name  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="name"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
                    name="name"
                    {...register('name', {
                            required: {value: true, message: "Name  is required"},

                        }
                    )}
                />
                {errors.name && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.name.message}</span></p>}
            </div>
                
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "email" >
                    Email  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="email"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
                    name="email"
                    {...register('email', {
                            required: {value: true, message: "Email  is required"},
pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
message: 'You must provide a valid email'},

                        }
                    )}
                />
                {errors.email && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.email.message}</span></p>}
            </div>
                
                            <div className="pb-5">
                                    <label 
                                    className="block text-sm font-medium mb-1" 
                                    htmlFor="phone">
                                        Phone  
                                    </label>    
                                    <textarea
                                        rows={4}
                                        className="form-input w-full ml-2 "
                                        name="phone"
                                        defaultValue={''}
                                        {...register('phone', {
                                            required: {value: false},
}
                                        )}
                                    ></textarea>
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
                                <span className="hidden xs:block ml-2">Add User</span>
                            </button>
                        </div>
                    </form>
                </div>
              
        </>
    )
}

export default UsersAdd
    