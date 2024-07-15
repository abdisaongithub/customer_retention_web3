import React, {
    useState
} from 'react'
import {
    useForm
} from "react-hook-form";
import {
    useCreateRoleMutation,
    useLazyCreateRoleMutation,
    useGetRolesQuery,
    useLazyGetRolesQuery,
    useGetRoleQuery,
    useLazyGetRoleQuery,
    useUpdateRoleMutation,
    useLazyUpdateRoleMutation,
    useDestroyRoleMutation,
    useLazyDestroyRoleMutation,
} from "./rolesSlice";
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

const RolesAdd = (props) => {
        const [redirectToList, setRedirectToList] = useState(false)



        const dispatch = useDispatch()
        const [createRole, roleResult, roleResponsePromise] = useCreateRoleMutation()
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
                role,
                displayName,
                description,
            } = formData;

            toast.promise(createRole({

                        role,
                        displayName,
                        description,
                    })
                    .unwrap(), {
                        pending: `Adding a Role `,
                        success: `Successfully added Role `,
                        error: `Could not add Role `,
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
            return (<Navigate to={`//role`} replace={false}/>)
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
                htmlFor = "role" >
                    Role  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="role"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
                    name="role"
                    {...register('role', {
                            required: {value: true, message: "Role  is required"},

                        }
                    )}
                />
                {errors.role && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.role.message}</span></p>}
            </div>
                
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "displayName" >
                    Display Name  <span className="text-rose-500">*</span>
                    </label>
                <input
                    id="displayName"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
                    name="displayName"
                    {...register('displayName', {
                            required: {value: true, message: "Display Name  is required"},
pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
message: 'You must provide a valid email'},

                        }
                    )}
                />
                {errors.displayName && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.displayName.message}</span></p>}
            </div>
                
                    <div
                className = "pb-5" >
                    <label
                className = "block text-sm font-medium mb-1"
                htmlFor = "description" >
                    Description  
                    </label>
                <input
                    id="description"
                    className="form-input w-full ml-2 "
                    type="text"
                    defaultValue={''}
                    name="description"
                    {...register('description', {
                            required: {value: false},

                        }
                    )}
                />
                {errors.description && <p className={`ml-2 mt-1 text-red-600`}><span>{errors.description.message}</span></p>}
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
                                <span className="hidden xs:block ml-2">Add Role</span>
                            </button>
                        </div>
                    </form>
                </div>
              
        </>
    )
}

export default RolesAdd
    