import React, {
    useEffect
} from 'react'
import {
    useLazyGetRoleQuery,
    useUpdateRoleMutation
} from "./rolesSlice"
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

const RolesListDetail = ({}) => {
    const {
        roleId
    } = useParams();
    const [roleTrigger, roleResult, roleLastPromiseInfo] = useLazyGetRoleQuery()

    const [updateRole] = useUpdateRoleMutation()

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
            roleTrigger(roleId)
            .unwrap(), {
                pending: `Fetching Role detail`,
                success: `Fetched Role detail successfully`,
                error: `Could not get Role detail`,
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
    }, [roleId]);


    const onFormSubmit = async (formData) => {
        const {
            role,
            displayName,
            description,
        } = formData;

        toast.promise(updateRole({
            id: roleResult.data.id,
            role,
            displayName,
            description,
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


    if (roleResult.isLoading || roleResult.isUninitialized || roleResult.isFetching) {
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

    if (roleResult.isError) {

        toast.error("Could not fetch Role detail", {
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

    if (roleResult.isSuccess) {
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
                    defaultValue={roleResult.data.role ?? '-'}
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
                    defaultValue={roleResult.data.displayName ?? '-'}
                    name="displayName"
                    {...register('displayName', {
                            required: {value: true, message: "Display Name  is required"},

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
                    defaultValue={roleResult.data.description ?? '-'}
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
                                <span className="hidden xs:block ml-1">Update Role </span>
                            </button>
                        </div>
                    </form>
                </div>
        </>

        );
    }


}
export default RolesListDetail