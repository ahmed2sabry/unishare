"use client";

import Spinner from "@/app/_components/Spinner";
import { useGetProfileInfo } from "@/app/_lib/hooks/useGetProfileInfo";
import Form from "@/app/_components/Form";
import { useEditProfile } from "@/app/_lib/hooks/useEditProfile";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Image from "next/image";

function EditProfileForm() {
  const { isPending, profileInfo } = useGetProfileInfo();
  const { isEditing, editProfile } = useEditProfile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  if (!isMounted || isPending) return <Spinner />;

  return (
    <div className="min-h-screen px-4 py-6">
      <Form
        onSubmit={(data) => {
          if (
            data.fullName === profileInfo?.fullName &&
            data.phoneNumber === profileInfo?.phoneNumber
          ) {
            toast.error("No changes detected in the profile information.");
            return;
          }
          editProfile({
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
          });
        }}
      >
        <Form.Step index={0}>
          {/* <Form.Field
            name="profileImage"
           
          >
            <Form.AvatarUpload
              image={profileInfo?.profilePictureUrl}
              defaultValue={profileInfo?.profilePictureUrl}
            />
            <Form.Error />
          </Form.Field> */}
          {/* <div> */}
          <div className=" relative w-40 h-40 mx-auto my-8 ">
            <Image
              src={profileInfo?.profilePictureUrl || "/Unknown_person.jpg"}
              alt="profile pic"
              fill
              className="rounded-full object-cover border-primary-500 border-2 shadow-primary-500"
            />
          </div>
          {/* </div> */}

          <Form.Field
            name="fullName"
            rules={{
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters long",
              },
            }}
          >
            <Form.Label>Full Name</Form.Label>
            <Form.Error />
            <Form.Input type="text" defaultValue={profileInfo?.fullName} />
          </Form.Field>

          <Form.Field
            name="phoneNumber"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^(010|011|012|015)[0-9]{8}$/,
                message: "Enter a valid Egyptian phone number",
              },
            }}
          >
            <Form.Label>Phone Number</Form.Label>
            <Form.Error />
            <Form.Input type="text" defaultValue={profileInfo?.phoneNumber} />
          </Form.Field>

          {/* college */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                className="font-normal text-gray-light text-base"
                htmlFor="college"
              >
                College
              </label>
              <span className="text-sm text-red-500">
                {/* {errors.college?.message} */}
              </span>
            </div>
            <input
              type="text"
              // {...register("college", { required: "College is required" })}
              id="college"
              defaultValue={profileInfo?.facultyName}
              disabled
              className="text-gray-light border border-gray-lighter rounded-3xl px-4 py-2 placeholder:text-sm placeholder:text-gray-light focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300"
            />
          </div>

          {/* University Email */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                className="font-normal text-gray-light text-base"
                htmlFor="universityEmail"
              >
                University Email
              </label>
              <span className="text-sm text-red-500">
                {/* {errors.universityEmail?.message} */}
              </span>
            </div>
            <input
              type="text"
              // {...register("universityEmail", {
              //   required: "University Email is required",
              // })}
              defaultValue="example@university.edu"
              id="universityEmail"
              disabled
              className="text-gray-light border border-gray-lighter rounded-3xl px-4 py-2 placeholder:text-sm placeholder:text-gray-light focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300"
            />
          </div>

          {/* Student ID */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label
                className="font-normal text-gray-light text-base"
                htmlFor="studentId"
              >
                Student ID
              </label>
              <span className="text-sm text-red-500">
                {/* {errors.studentId?.message} */}
              </span>
            </div>
            <input
              type="text"
              // {...register("studentId", { required: "Student ID is required" })}
              id="studentId"
              defaultValue="1000598743"
              disabled
              className="text-gray-light border border-gray-lighter rounded-3xl px-4 py-2 placeholder:text-sm placeholder:text-gray-light focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300"
            />
          </div>

          {/* <button className="btn-primary" type="submit">
            Edit Profile
          </button> */}
          <Form.SubmitButton pending={isEditing}>
            Edit Profile
          </Form.SubmitButton>
        </Form.Step>
      </Form>
    </div>
  );
}

export default EditProfileForm;
