"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { IoMdCheckmark } from "react-icons/io";
import { usePublishStore } from "../_lib/store/usePublishStore";

import "react-datepicker/dist/react-datepicker.css";

function PublishForm({ categories, colleges }) {
  const router = useRouter();

  // 1. إدارة الـ Form بالكامل هنا بشكل مستقل
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      collegeId: "",
      image: null,
      dailyPrice: "",
      insuranceAmount: "",
      minReputationScore: "",
      availableFrom: null,
      availableTo: null,
      isAvailable: false,
    },
  });

  // 2. مراقبة حالة الـ Reset من الـ Zustand Store
  const shouldReset = usePublishStore((state) => state.shouldReset);
  const completeFormReset = usePublishStore((state) => state.completeFormReset);

  useEffect(() => {
    if (shouldReset) {
      reset(); // تصفير الفورم بالكامل فوراً (الحقول والصورة بتختفي معاه)
      completeFormReset(); // إرجاع الحالة لـ false
    }
  }, [shouldReset, reset, completeFormReset]);

  const onSubmit = (data) => {
    console.log(data);
    usePublishStore.getState().setPublishData(data);
    router.push("/publish/confirm");
  };

  // تتبع التواريخ عشان الـ Validation والـ Price التلقائي لو حبيت
  const startDate = watch("availableFrom");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 lg:max-w-2xl lg:mx-auto"
    >
      <div className="space-y-4 mb-8">
        <h2 className="text-base font-semibold">General Information</h2>

        {/* Product Name */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label className="text-base text-gray-dark" htmlFor="title">
            Product Name
          </label>
          {errors.title && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.title.message}
            </p>
          )}
          <input
            id="title"
            type="text"
            className="rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("title", { required: "Product name is required" })}
          />
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label className="text-base text-gray-dark" htmlFor="description">
            Description
          </label>
          {errors.description && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.description.message}
            </p>
          )}
          <textarea
            id="description"
            rows={5}
            placeholder="Write detailed product information...."
            className="resize-none rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label className="text-base text-gray-dark" htmlFor="categoryId">
            Category
          </label>
          {errors.categoryId && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.categoryId.message}
            </p>
          )}
          <select
            id="categoryId"
            className="rounded-3xl col-span-2 border-gray-lighter border px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("categoryId", { required: "Category is required" })}
          >
            <option value="" disabled>
              Select...
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* College */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label className="text-base text-gray-dark" htmlFor="collegeId">
            College
          </label>
          {errors.collegeId && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.collegeId.message}
            </p>
          )}
          <select
            id="collegeId"
            className="rounded-3xl col-span-2 border-gray-lighter border px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("collegeId", { required: "College is required" })}
          >
            <option value="" disabled>
              Select...
            </option>
            {colleges?.map((col) => (
              <option key={col.id} value={col.id}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Images - الـ Controller هنا بيحل مشكلة الـ reset تماماً وبدون أخطاء كاشينج */}
      <div className="space-y-4 -mb-4">
        <h2 className="text-base font-semibold -mb-7">Products Images</h2>
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          {errors.image && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.image.message}
            </p>
          )}

          <Controller
            name="image"
            control={control}
            rules={{
              required: "Product image is required",
              validate: {
                lessThan5MB: (file) =>
                  !file || file?.size < 5000000 || "Max file size is 5MB",
                acceptedFormats: (file) =>
                  !file ||
                  ["image/jpeg", "image/png", "image/gif"].includes(
                    file?.type,
                  ) ||
                  "Only JPEG, PNG, and GIF formats are accepted",
              },
            }}
            render={({ field: { onChange, value } }) => {
              // المعاينة بتتحسب ديناميكياً من الـ value جوة الـ هوك فورم، لو اتصفرت بتموت فوراً
              const preview =
                value instanceof File ? URL.createObjectURL(value) : null;

              return (
                <div className="my-12 flex flex-col justify-center items-center w-[200%]">
                  <label
                    htmlFor="upload-product-image"
                    className="cursor-pointer border border-[#e1e1e1] rounded-3xl w-full lg:h-70 h-37.5 flex items-center justify-center overflow-hidden"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        className="w-full h-full object-fit"
                        alt="product preview"
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <img src="/mid-camera.svg" alt="upload icon" />
                        <span className="text-sm text-gray-lighter">
                          Upload Image
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    id="upload-product-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) onChange(file);
                    }}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-base font-semibold">Price and Insurance</h2>

        {/* Daily Price */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          {errors.dailyPrice && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.dailyPrice.message}
            </p>
          )}
          <div className="col-span-2 grid grid-cols-3 items-center gap-2">
            <label
              className="col-span-2 text-base text-gray-light"
              htmlFor="dailyPrice"
            >
              Price
            </label>
            <input
              id="dailyPrice"
              type="text"
              inputMode="decimal"
              step="0.01"
              placeholder="Enter your price"
              className="rounded-3xl col-span-full placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...register("dailyPrice", {
                required: "Price is required",
                validate: (value) => {
                  const num = Number(value);

                  if (isNaN(num)) return "Please enter a valid number";

                  if (num < 0.01) return "Price must be at least $0.01";

                  return true;
                },
              })}
            />
          </div>
        </div>

        {/* Insurance Amount */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label className="text-base text-gray-dark" htmlFor="insuranceAmount">
            Insurance
          </label>
          {errors.insuranceAmount && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.insuranceAmount.message}
            </p>
          )}
          <input
            id="insuranceAmount"
            type="text"
            inputMode="decimal"
            className="rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("insuranceAmount", {
              required: "Insurance amount is required",
              validate: (value) => {
                const num = Number(value);

                if (isNaN(num)) return "Please enter a valid number";

                if (num < 0.01) return "Insurance must be at least $0.01";

                return true;
              },
            })}
          />
        </div>

        {/* Min Reputation Score */}
        <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
          <label
            className="text-base text-gray-dark"
            htmlFor="minReputationScore"
          >
            Min Reputation score
          </label>
          {errors.minReputationScore && (
            <p className="text-red-500 text-sm col-span-2">
              {errors.minReputationScore.message}
            </p>
          )}
          <input
            id="minReputationScore"
            type="text"
            inputMode="numeric"
            className="rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            {...register("minReputationScore", {
              required: "Minimum reputation score is required",
              validate: (value) => {
                const num = Number(value);

                if (isNaN(num)) return "Please enter a valid number";

                if (num < 0)
                  return "Reputation score must be a non-negative number";

                return true;
              },
            })}
          />
        </div>
      </div>

      {/* Available Dates */}
      <div className="space-y-4 mb-8">
        <h2 className="text-base font-semibold">Available Date</h2>
        <div className="flex justify-between gap-4 items-center">
          {/* From Date */}
          <Controller
            control={control}
            name="availableFrom"
            rules={{ required: "Start date is required" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                minDate={new Date()}
                placeholderText="Start date"
                onChange={(date) => {
                  field.onChange(date);
                  setValue("availableTo", null, { shouldValidate: true });
                }}
                className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            )}
          />

          {/* To Date */}
          <Controller
            control={control}
            name="availableTo"
            rules={{
              required: "End date is required",
              validate: (value) =>
                !startDate ||
                !value ||
                value >= startDate ||
                "End date must be after start date",
            }}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                minDate={startDate || new Date()}
                placeholderText="End date"
                className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            )}
          />
        </div>
        {(errors.availableFrom || errors.availableTo) && (
          <p className="text-red-500 text-sm">
            {errors.availableFrom?.message || errors.availableTo?.message}
          </p>
        )}
      </div>

      {/* Additional Options */}
      <div className="mb-4">
        <h2 className="text-base font-semibold mb-4">Additional Options</h2>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAvailable"
            className="peer hidden"
            {...register("isAvailable")}
          />
          <label
            htmlFor="isAvailable"
            className="w-6 h-6 cursor-pointer rounded-lg relative bg-gray-200 peer-checked:bg-primary-500 transition block"
          >
            <span className="absolute text-gray-200 peer-checked:text-white transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <IoMdCheckmark />
            </span>
          </label>
          <label
            htmlFor="isAvailable"
            className="text-sm font-normal text-gray-light cursor-pointer"
          >
            Available for customer display
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        className="btn-primary disabled:bg-gray-200 disabled:cursor-not-allowed transition-all duration-700 disabled:text-gray-500"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}

export default PublishForm;

import Form from "./Form";
import { usePublishTool } from "../_lib/hooks/usePublishTool";
import SpinnerMini from "./SpinnerMini";

export function PublishFormModal({ categories, colleges, onCloseModal }) {
  const { mutatePublish, isPending } = usePublishTool("modal");
  return (
    <Form
      onSubmit={(data) => {
        mutatePublish(
          { ...data, isAvailable: true },
          {
            onSuccess: () => onCloseModal?.(),
          },
        );
      }}
    >
      <Form.Step index={0}>
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-semibold">General Informations</h2>
          <Form.Field
            name="title"
            rules={{ required: "product name is required" }}
          >
            <Form.Label>Product Name</Form.Label>
            <Form.Error />
            <Form.Input type="text" />
          </Form.Field>

          {/* FIXME: */}
          <Form.Field
            name="description"
            rules={{ required: "description is required" }}
          >
            <Form.Label>Description</Form.Label>
            <Form.Error />
            <Form.Textarea placeholder="Write detailed product information...." />
          </Form.Field>
          <Form.Field
            name="categoryId"
            rules={{
              required: "category is required",
            }}
          >
            <Form.Label>Category</Form.Label>
            <Form.Error />
            <Form.Select options={categories} />
          </Form.Field>

          {/* FIXME: */}
          <Form.Field
            name="collegeId"
            rules={{
              required: "category is required",
            }}
          >
            <Form.Label>college</Form.Label>
            <Form.Error />
            <Form.Select options={colleges} />
          </Form.Field>
        </div>
        <div className="space-y-4 -mb-4">
          <h2 className="text-base font-semibold -mb-7">Products Images</h2>
          <Form.Field
            name="image"
            rules={{
              validate: {
                lessThan5MB: (file) =>
                  file?.size < 5000000 || "Max file size is 5MB",
                acceptedFormats: (file) =>
                  ["image/jpeg", "image/png", "image/gif"].includes(
                    file?.type,
                  ) || "Only JPEG, PNG, and GIF formats are accepted",
              },
            }}
          >
            <Form.AvatarUpload variant="rectangle" />
            <Form.Error />
          </Form.Field>
        </div>
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-semibold">Price and Insurance</h2>
          <Form.Field
            name="dailyPrice"
            rules={{
              required: "price is required",
              min: { value: 0.01, message: "Price must be at least $0.01" },
            }}
          >
            <Form.Price />
          </Form.Field>
          <Form.Field
            name="insuranceAmount"
            rules={{
              required: "insurance is required",
              min: { value: 0.01, message: "Insurance must be at least $0.01" },
            }}
          >
            <Form.Label>Insurance</Form.Label>
            <Form.Error />
            <Form.Input type="number" />
          </Form.Field>

          <Form.Field
            name="minReputationScore"
            rules={{
              required: "minimum reputation score is required",
              min: {
                value: 0,
                message: "Reputation score must be a non-negative number",
              },
            }}
          >
            <Form.Label>Min Reputation score</Form.Label>
            <Form.Error />
            <Form.Input type="number" />
          </Form.Field>
        </div>
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-semibold">Available Date</h2>
          {/* date picker */}
          <Form.DateFiled
            startDateName="availableFrom"
            endDateName="availableTo"
          />
        </div>
        {/* <div className="">
          <h2 className="text-base font-semibold mb-4">Additional Options</h2>
          <Form.Field name="isAvailable">
            <Form.Checkbox label="Available for customer display" />
          </Form.Field>
        </div> */}
        <div className="flex items-center mt-1 gap-4 justify-center ">
          <Form.SubmitButton type="edit" pending={isPending}>
            {isPending ? <SpinnerMini /> : "Publish"}
          </Form.SubmitButton>
          <button
            className="inline cursor-pointer px-2 py-3 border-gray-200 bg-white hover:bg-gray-200 transition-all duration-300"
            onClick={onCloseModal}
            disabled={isPending}
          >
            cancel
          </button>
        </div>
      </Form.Step>
    </Form>
  );
}
