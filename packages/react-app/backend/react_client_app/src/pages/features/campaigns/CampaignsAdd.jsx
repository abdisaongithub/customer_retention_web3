import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateCampaignMutation,
  useLazyCreateCampaignMutation,
  useGetCampaignsQuery,
  useLazyGetCampaignsQuery,
  useGetCampaignQuery,
  useLazyGetCampaignQuery,
  useUpdateCampaignMutation,
  useLazyUpdateCampaignMutation,
  useDestroyCampaignMutation,
  useLazyDestroyCampaignMutation,
  useToggleVerifiedMutation,
  useLazyToggleVerifiedMutation,
} from "./campaignsSlice";
import { useDispatch } from "react-redux";
import { SketchPicker } from "react-color";
import { Navigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CampaignsAdd = (props) => {
  const [redirectToList, setRedirectToList] = useState(false);

  const [descriptionText, setDescriptionText] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const dispatch = useDispatch();
  const [createCampaign, campaignResult, campaignResponsePromise] =
    useCreateCampaignMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (formData) => {
    const {
      title,
      allocated_amount,
      allocation_currency,
      logo,
      cover_image,
      start,
      end,
      prize_candidates,
    } = formData;

    toast
      .promise(
        createCampaign({
          description: descriptionText,
          verified: isVerified,
          title,
          allocated_amount,
          allocation_currency,
          logo,
          cover_image,
          start,
          end,
          prize_candidates,
        }).unwrap(),
        {
          pending: `Adding a Campaign `,
          success: `Successfully added Campaign `,
          error: `Could not add Campaign `,
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        },
      )
      .then((result) => {
        setRedirectToList(true);
      });
  };

  if (redirectToList) {
    return <Navigate to={`/campaign`} replace={false} />;
  }

  return (
    <>
      <div className="border-t border-slate-200">
        <form className="row p-3" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="grid grid-cols-2 gap-x-5">
            <div className="pb-5">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                className="form-input w-full ml-2 "
                type="text"
                defaultValue={""}
                name="title"
                {...register("title", {
                  required: { value: true, message: "Title  is required" },
                })}
              />
              {errors.title && (
                <p className={`ml-2 mt-1 text-red-600`}>
                  <span>{errors.title.message}</span>
                </p>
              )}
            </div>

            <div className="pb-5">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description <span className="text-rose-500">*</span>
              </label>
              <CKEditor
                name={"businessDescription"}
                editor={ClassicEditor}
                // data={detail !== null ? detail.description : ''}
                data={descriptionText}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescriptionText(data);
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
                htmlFor="allocated_amount"
              >
                Allocated Amount <span className="text-rose-500">*</span>
              </label>
              <input
                type={"number"}
                className="form-input w-full ml-2 "
                name="allocated_amount"
                defaultValue={"0"}
                {...register("allocated_amount", {
                  required: {
                    value: true,
                    message: "Allocated Amount  is required",
                  },
                })}
              ></input>
            </div>

            <div className="pb-5">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="allocation_currency"
              >
                Allocation Currency <span className="text-rose-500">*</span>
              </label>
              <input
                id="allocation_currency"
                className="form-input w-full ml-2 "
                type="text"
                defaultValue={""}
                name="allocation_currency"
                {...register("allocation_currency", {
                  required: {
                    value: true,
                    message: "Allocation Currency  is required",
                  },
                })}
              />
              {errors.allocation_currency && (
                <p className={`ml-2 mt-1 text-red-600`}>
                  <span>{errors.allocation_currency.message}</span>
                </p>
              )}
            </div>

            <div className="pb-5">
              <label className="block text-sm font-medium mb-1" htmlFor="logo">
                Logo
              </label>
              <input
                type={"file"}
                className="form-input w-full ml-2 "
                name="logo"
              ></input>
            </div>
            <div className="pb-5">
              <label
                className="flex text-sm font-medium mb-1"
                htmlFor="mandatory"
              >
                Verified <span className="text-rose-500"> </span>
                <div className="form-switch my-full ml-1">
                  <input
                    type="checkbox"
                    id={`toggle-verified-campaign`}
                    className="sr-only"
                    checked={isVerified}
                    onChange={async (e) => {
                      setIsVerified(!isVerified);
                    }}
                  />
                  <label
                    className="bg-slate-400"
                    htmlFor={`toggle-verified-campaign`}
                  >
                    <span
                      className="bg-white shadow-sm"
                      aria-hidden="true"
                    ></span>
                  </label>
                </div>
              </label>
            </div>

            <div className="pb-5">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="cover_image"
              >
                Cover Image
              </label>
              <input
                type={"file"}
                className="form-input w-full ml-2 "
                name="cover_image"
                defaultValue={""}
                {...register("cover_image", {
                  required: { value: false },
                })}
              ></input>
            </div>

            <div className="pb-5">
              <label className="block text-sm font-medium mb-1" htmlFor="start">
                Start <span className="text-rose-500">*</span>
              </label>
              <input
                id="start"
                className="form-input w-full ml-2 "
                type="datetime-local"
                defaultValue={""}
                name="start"
                {...register("start", {
                  required: { value: true, message: "Start  is required" },
                })}
              />
            </div>

            <div className="pb-5">
              <label className="block text-sm font-medium mb-1" htmlFor="end">
                End <span className="text-rose-500">*</span>
              </label>
              <input
                id="end"
                className="form-input w-full ml-2 "
                type="datetime-local"
                defaultValue={""}
                name="end"
                {...register("end", {
                  required: { value: true, message: "End  is required" },
                })}
              />
            </div>

            <div className="pb-5">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="prize_candidates"
              >
                Prize Candidates <span className="text-rose-500">*</span>
              </label>
              <input
                id="prize_candidates"
                className="form-input full ml-2 "
                type="number"
                step="any"
                defaultValue={0}
                name="prize_candidates"
                {...register("prize_candidates", {
                  required: {
                    value: true,
                    message: "Prize Candidates  is required",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex">
            <button
              className="ml-auto mt-auto btn btn-sm border-red-500 hover:bg-red-600 text-red-400 hover:text-white"
              type="button"
              onClick={(event) => {
                history.back();
              }}
            >
              <span className="hidden xs:block ml-0">Cancel</span>
            </button>
            <button
              className="ml-2 mt-auto btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              type="submit"
            >
              <span className="hidden xs:block ml-2">Add Campaign</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CampaignsAdd;
