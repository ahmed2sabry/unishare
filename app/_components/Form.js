"use client";
import { createContext, useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { Controller, set, useForm, useWatch } from "react-hook-form";
import HeadingAuth from "./HeadingAuth";
import { IoMdCheckmark } from "react-icons/io";
import SpinnerMini from "./SpinnerMini";
import { usePublishStore } from "../_lib/store/usePublishStore";

const FormContext = createContext();
const FieldContext = createContext();

function Form({ children, onSubmit }) {
  const [hasFile, setHasFile] = useState(false);
  // FIXME: you pass formState instead of errors remember
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    watch,
    control,
    formState,
    reset,
  } = useForm();

  const [step, setStep] = useState(0);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const skipAvatar = () => {
    setValue("avatar", null);

    const data = getValues(); // كل الفورم بدون validation

    onSubmit(data);
  };

  // const submitForm = async (data) => {
  //   const isValid = await trigger();
  //   const avatar = getValues();
  //   console.log(isValid, avatar);

  //   if (!isValid) return;

  //   onSubmit(data);
  // };

  // const shouldReset = usePublishStore((state) => state.shouldReset);
  // const completeFormReset = usePublishStore((state) => state.completeFormReset);

  // useEffect(() => {
  //   if (shouldReset) {
  //     reset();

  //     completeFormReset();
  //   }
  // }, [shouldReset, reset, completeFormReset]);

  return (
    <FormContext.Provider
      value={{
        step,
        next,
        prev,
        formState,
        register,
        trigger,
        getValues,
        skipAvatar,
        setValue,
        watch,
        control,
        hasFile,
        setHasFile,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
}
export function StepCount() {
  const { step } = useContext(FormContext);
  return (
    <div className=" flex gap-1 items-center">
      <span
        className={`w-6 h-6 flex justify-center items-center rounded-full text-gray-light ${step >= 0 ? "bg-primary-500 border-primary-500" : "border-gray-light"}`}
      >
        {step >= 0 ? <img src="/check-icon.svg" alt="check icon" /> : 1}
      </span>
      <span
        className={`h-[1px] w-12  ${step >= 0 ? "bg-primary-500" : "bg-gray-light"}`}
      ></span>
      <span
        className={`w-6 h-6 flex justify-center items-center  rounded-full text-gray-light border ${step >= 1 ? "bg-primary-500 border-primary-500" : "border-gray-light"}`}
      >
        {step >= 1 ? <img src="/check-icon.svg" alt="check icon" /> : 2}
      </span>
      <span
        className={`h-[1px] w-12  ${step >= 1 ? "bg-primary-500" : "bg-gray-light"}`}
      ></span>
      <span
        className={`w-6 h-6 flex justify-center items-center  rounded-full  text-gray-light border ${step >= 2 ? "bg-primary-500 border-primary-500" : "border-gray-light"}`}
      >
        {step >= 2 ? <img src="/check-icon.svg" alt="check icon" /> : 3}
      </span>
    </div>
  );
}

export function Step({ children, index }) {
  const { step } = useContext(FormContext);

  if (step !== index) return null;

  return <div className="flex flex-col gap-4">{children}</div>;
}

export function NextButton({ fields }) {
  const { next, trigger } = useContext(FormContext);
  async function handleNext() {
    const isValid = await trigger(fields);

    if (isValid) next();
  }
  return (
    <button className="btn-primary" type="button" onClick={handleNext}>
      Continue
    </button>
  );
}

export function PrevButton() {
  const { prev } = useContext(FormContext);
  return (
    <button className="btn-primary" type="button" onClick={prev}>
      Back
    </button>
  );
}

export function SubmitButton({ children, type, pending }) {
  const { getValues, hasFile } = useContext(FormContext);
  if (type === "signup") {
    // const avatar = getValues("avatar");
    // const isDisabled = !avatar;
    // console.log(avatar, "ppp");
    return (
      <button
        disabled={!hasFile || pending}
        className="btn-primary  disabled:bg-gray-200 disabled:cursor-not-allowed transition-all duration-700 disabled:text-gray-500"
        type="submit"
      >
        {/* {pending ? <SpinnerMini /> : children} */}
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={pending}
      className={`btn-primary disabled:bg-gray-200 disabled:cursor-not-allowed transition-all disabled:text-gray-500 ${type === "edit" && "px-6 mb-2"}  `}
      type="submit"
    >
      {children}
    </button>
  );
}

export function SkipButton() {
  const { skipAvatar } = useContext(FormContext);
  return (
    <button
      className="text-base cursor-pointer text-primary-500 no-underline hover:underline transition-all duration-300 font-normal"
      type="button"
      onClick={skipAvatar}
    >
      Skip Now
    </button>
  );
}

export function Field({ name, rules, children }) {
  return (
    <FieldContext.Provider value={{ name, rules }}>
      <div className="grid grid-cols-2 justify-between gap-x-4 gap-y-2">
        {children}
      </div>
    </FieldContext.Provider>
  );
}
export function Input({ variant, ...props }) {
  const { register, getValues } = useContext(FormContext);
  const handleWheel = (e) => e.target.blur();
  const { name, rules } = useContext(FieldContext);
  if (variant === "reset") {
    return (
      <input
        onWheel={handleWheel}
        className={`rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2  w-full focus:outline-none focus:ring-1  focus:ring-primary-500 ${variant === "edit" && "bg-gray-200 focus:bg-white"}`}
        id={name}
        {...register(
          name,
          name === "confirmPassword"
            ? {
                ...rules,
                validate: (value) =>
                  // FIXME:
                  value === getValues("newPassword") ||
                  "Passwords do not match",
              }
            : rules,
        )}
        {...props}
      />
    );
  }
  return (
    <input
      onWheel={handleWheel}
      className={`rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2  w-full focus:outline-none focus:ring-1  focus:ring-primary-500 `}
      id={name}
      {...register(
        name,
        name === "confirmPassword"
          ? {
              ...rules,
              validate: (value) =>
                // FIXME:
                value === getValues("Password") || "Passwords do not match",
            }
          : rules,
      )}
      {...props}
    />
  );
}

export function Price(props) {
  const {
    register,
    formState: { errors },
  } = useContext(FormContext);
  const { name, rules } = useContext(FieldContext);
  const [isFree, setIsFree] = useState(false);
  const handleWheel = (e) => e.target.blur();
  return (
    <div className=" col-span-2 grid grid-cols-3 items-center gap-2">
      <label className=" col-span-2 text-base text-gray-light" htmlFor={name}>
        Price
      </label>

      <div className=" justify-end flex items-center gap-1.5">
        <span className="text-gray-light text-sm font-normal ">Free</span>
        <label className=" relative inline-block w-9 h-4">
          <input
            type="checkbox"
            checked={isFree}
            onChange={() => setIsFree((prev) => !prev)}
            className="peer sr-only"
          />

          {/* Track */}
          <span className="absolute inset-0 cursor-pointer bg-[#A4AAB1] rounded-full transition duration-300 peer-checked:bg-primary-500"></span>

          {/* Thumb */}
          <span className="absolute left-0.5 bottom-0.5 w-3 h-3 bg-white rounded-full transition duration-300 peer-checked:translate-x-4.75"></span>
        </label>
      </div>

      <input
        type="number"
        onWheel={handleWheel}
        placeholder="Enter your price"
        disabled={isFree}
        className="rounded-3xl  col-span-full placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border-[1px] px-4 py-2  w-full focus:outline-none focus:ring-1  focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        id={name}
        {...register(name, rules)}
        {...props}
      />

      {errors[name] && (
        <p className="text-red-500 -mt-1 text-sm col-span-full justify-self-end ">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}

export function Textarea({ variant, ...props }) {
  const { register } = useContext(FormContext);
  const { name, rules } = useContext(FieldContext);

  return (
    <textarea
      rows={variant === "small" ? 1 : 5}
      className={`resize-none rounded-3xl col-span-2 placeholder:text-sm placeholder:text-gray-lighter border-gray-lighter border px-4 py-2  w-full focus:outline-none focus:ring-1 focus:ring-primary-500 `}
      id={name}
      {...register(name, rules)}
      {...props}
    />
  );
}

export function Checkbox(props) {
  const {
    register,
    formState: { errors },
  } = useContext(FormContext);
  const { name, rules } = useContext(FieldContext);

  return (
    <div className="flex items-center col-span-2 gap-2">
      <input
        type="checkbox"
        id={name}
        className="peer hidden"
        {...register(name, rules)}
        {...props}
      />
      <label
        htmlFor={name}
        className="w-6 h-6 cursor-pointer rounded-lg relative  bg-gray-200 peer-checked:bg-primary-500 transition "
      >
        <span className="absolute text-gray-200 peer-checked:text-white  transition top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <IoMdCheckmark />
        </span>
      </label>

      <label
        htmlFor={name}
        className="text-sm font-normal text-gray-light cursor-pointer"
      >
        {props.label}
      </label>

      {errors[name] && (
        <p className="text-red-500 text-sm ml-2">{errors[name].message}</p>
      )}
    </div>
  );
}

// export function DateFiled({ startDateName, endDateName }) {
//   const { control, watch, setValue } = useContext(FormContext);

//   const today = new Date(new Date().setHours(0, 0, 0, 0));
//   const startDate = watch(startDateName);

//   return (
//     <div className="flex justify-between gap-4 items-center">
//       {/* Start */}
//       <Controller
//         control={control}
//         name={startDateName}
//         rules={{ required: "Start date is required" }}
//         render={({ field }) => (
//           <DatePicker
//             minDate={today}
//             selected={field.value}
//             onChange={(date) => {
//               field.onChange(date);
//               setValue(endDateName, null); // reset end
//             }}
//             placeholderText="Start date"
//             className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
//           />
//         )}
//       />

//       {/* End */}
//       <Controller
//         control={control}
//         name={endDateName}
//         rules={{
//           required: "End date is required",
//           validate: (value) =>
//             !startDate ||
//             value >= startDate ||
//             "End date must be after start date",
//         }}
//         render={({ field }) => (
//           <DatePicker
//             selected={field.value}
//             onChange={(date) => field.onChange(date)}
//             minDate={startDate || today}
//             placeholderText="End date"
//             className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
//           />
//         )}
//       />
//     </div>
//   );
// }

export function DateFiled({ startDateName, endDateName }) {
  const { control, watch, setValue } = useContext(FormContext);

  const startDate = watch(startDateName);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex justify-between gap-4 items-center">
      {/* Start Date */}
      <Controller
        control={control}
        name={startDateName}
        rules={{ required: "Start date is required" }}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            minDate={today}
            onChange={(date) => {
              field.onChange(date);

              setValue(endDateName, null, { shouldValidate: true });
            }}
            placeholderText="Start date"
            className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        )}
      />

      {/* End Date */}
      <Controller
        control={control}
        name={endDateName}
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
            minDate={startDate || today}
            placeholderText="End date"
            className="rounded-3xl border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        )}
      />
    </div>
  );
}

export function RentalSummary({
  startDateName,
  endDateName,
  price,
  insurance,
}) {
  const { control } = useContext(FormContext);

  const [startDate, endDate] = useWatch({
    control,
    name: [startDateName, endDateName],
  });

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();
  console.log("Total rental days:", totalDays);
  if (totalDays === 0) return null;

  return (
    // <span className="text-base font-medium">
    //   {totalDays} {totalDays === 1 ? "day" : "days"}
    // </span>
    <ul className="flex flex-col gap-3 mt-6 mb-8">
      <h2 className="text-base font-medium leading-none">Price Summary </h2>
      <li className="flex items-center justify-between">
        <h4 className="text-gray-light font-medium text-sm">Duration</h4>
        <span className="text-base font-medium">
          {totalDays} {totalDays === 1 ? "day" : "days"}
        </span>
      </li>
      <li className="flex items-center justify-between">
        <h4 className="text-gray-light font-medium text-sm">
          Subtotal{" "}
          <span className="text-sm">
            (Price for {totalDays} {totalDays === 1 ? "day" : "days"})
          </span>
        </h4>
        <span className="text-base font-medium">{totalDays * price} EGP</span>
      </li>
      <li className="flex items-center justify-between">
        <h4 className="text-gray-light font-medium text-sm">Insurance</h4>
        <span className="text-base font-medium">{insurance} EGP</span>
      </li>
      <li className="flex items-center justify-between border-t pt-3 border-[#e1e1e1]">
        <h4 className="text-gray-light font-medium text-sm">Total Price</h4>
        <span className="text-base font-medium">
          {totalDays * price + insurance} EGP
        </span>
      </li>
    </ul>
  );
}

export function Select({ options, ...props }) {
  const { register } = useContext(FormContext);
  const { name, rules } = useContext(FieldContext);

  return (
    <select
      className="rounded-3xl col-span-2 border-gray-lighter border px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
      {...register(name, rules)}
      {...props}
    >
      <option value="" disabled>
        Select...
      </option>

      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export function Label({ children }) {
  const { name } = useContext(FieldContext);
  return (
    <label className="text-base text-gray-dark" htmlFor={name}>
      {children}
    </label>
  );
}

// export function Error() {
//   const { errors } = useContext(FormContext);
//   const { name } = useContext(FieldContext);

//   if (!errors[name]) return null;

//   return (
//     // FIXME:you added col-span-2 here remember to delete it
//     <p className="text-red-500 text-sm col-span-2">{errors[name].message}</p>
//   );
// }

export function Error() {
  const {
    control,
    formState: { errors },
  } = useContext(FormContext);
  const { name } = useContext(FieldContext);

  useWatch({ control, name });

  const error = errors[name];
  if (!error) return null;

  return <p className="text-red-500 text-sm col-span-2">{error.message}</p>;
}

export function FormHeading() {
  const { step } = useContext(FormContext);
  let text = {
    heading: ["Sign Up", "Set up your profile", "Add profile photo"],
    subHeading: [
      "Create your account to rent and share tools.",
      "Complete your profile with your university details.",
      "Upload a clear photo of yourself",
    ],
  };
  return (
    <HeadingAuth
      heading={text.heading[step]}
      subHeading={text.subHeading[step]}
    />
  );
}

export function AvatarUpload({ variant = "circle", image = null, ...props }) {
  const { register, setValue, setHasFile } = useContext(FormContext);

  const { name, rules } = useContext(FieldContext);

  const [preview, setPreview] = useState(image);
  const inputId = `upload-${name}`;
  const { onChange: rhfOnChange, ref, ...rest } = register(name, rules);

  function handleChange(e) {
    const file = e.target.files[0];

    if (!file) return;
    setHasFile(true);

    setPreview(URL.createObjectURL(file));
    setValue(name, file, { shouldValidate: true, shouldDirty: true });
    console.log(file);
  }

  return (
    <div className=" my-12 flex flex-col justify-center items-center w-[200%] ">
      {variant === "circle" ? (
        <label
          htmlFor={inputId}
          className="cursor-pointer   w-44 h-44 rounded-full bg-[#efefef] flex items-center justify-center overflow-hidden outline outline-2 outline-gray-light outline-dashed outline-offset-12"
        >
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-fill"
              alt="profile pic"
            />
          ) : (
            <img src="/upload.svg" alt="upload icon" />
          )}
        </label>
      ) : (
        <label
          htmlFor={inputId}
          className="cursor-pointer border border-[#e1e1e1] rounded-3xl w-full  h-37.5  flex items-center justify-center overflow-hidden "
        >
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-fill"
              alt="profile pic"
            />
          ) : (
            <div className="flex  items-center gap-1">
              <img src="/mid-camera.svg" alt="upload icon" />
              <span className="text-sm text-gray-lighter">Upload Image</span>
            </div>
          )}
        </label>
      )}

      <input
        id={inputId}
        type="file"
        className="hidden"
        accept="image/*"
        ref={ref}
        {...rest}
        onChange={(e) => {
          rhfOnChange(e);
          handleChange(e);
        }}
      />
    </div>
  );
}

Form.Step = Step;
Form.Field = Field;
Form.StepCount = StepCount;
Form.NextButton = NextButton;
Form.PrevButton = PrevButton;
Form.SubmitButton = SubmitButton;
Form.AvatarUpload = AvatarUpload;
Form.Input = Input;
Form.Textarea = Textarea;
Form.Label = Label;
Form.Error = Error;
Form.FormHeading = FormHeading;
Form.Select = Select;
Form.SkipButton = SkipButton;
Form.Price = Price;
Form.DateFiled = DateFiled;
Form.Checkbox = Checkbox;
Form.RentalSummary = RentalSummary;

export default Form;
