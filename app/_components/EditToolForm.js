"use client";
import { Suspense } from "react";
import CollegeInput from "./CollegeInput";
import Form from "./Form";
import Spinner from "./Spinner";
import { useEditTool } from "../_lib/hooks/useEditTool";

function EditToolForm({ item, colleges, categories, onCloseModal }) {
  const { isEditing, editTool } = useEditTool();
  return (
    <Form
      onSubmit={(data) => {
        const cleanded = Object.fromEntries(
          Object.entries(data).filter(([_, value]) => {
            if (value instanceof FileList) {
              return value.length > 0;
            }

            return value !== "";
          }),
        );

        editTool(
          { id: item.id, editData: cleanded },
          {
            onSuccess: () => onCloseModal?.(),
          },
        );
      }}
    >
      <Form.Step index={0}>
        <Form.Field
          name="title"
          rules={{ required: "product name is required" }}
        >
          <Form.Label>Product Name</Form.Label>
          <Form.Error />
          <Form.Input type="text" defaultValue={item.title} />
        </Form.Field>
        <Form.Field name="description">
          <Form.Label>Description</Form.Label>
          <Form.Error />
          <Form.Textarea
            placeholder="Write detailed product information...."
            variant="small"
            defaultValue={item.description}
          />
        </Form.Field>
      </Form.Step>
      {/* FIXME: */}
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
      <Form.Field
        name="image"
        // rules={{
        //   validate: {
        //     lessThan5MB: (file) =>
        //       file?.size < 5000000 || "Max file size is 5MB",
        //     acceptedFormats: (file) =>
        //       ["image/jpeg", "image/png", "image/gif"].includes(file?.type) ||
        //       "Only JPEG, PNG, and GIF formats are accepted",
        //   },
        // }}
      >
        <Form.AvatarUpload
          variant="rectangle"
          image={item.imageUrl}
          defaultValue={item.imageUrl}
        />
        <Form.Error />
      </Form.Field>
      <div className="flex items-center gap-2 justify-between">
        <Form.Field
          name="dailyPrice"
          rules={{
            required: "price is required",
            min: { value: 0.01, message: "Price must be at least $0.01" },
          }}
        >
          <Form.Label>Price</Form.Label>
          <Form.Error />
          <Form.Input type="number" defaultValue={item.dailyPrice} />
        </Form.Field>
        <Form.Field name="insuranceAmount">
          <Form.Label>Insurance</Form.Label>
          <Form.Error />
          <Form.Input
            type="number"
            variant="edit"
            placeholder="insurance"
            defaultValue={item.insuranceAmount}
          />
        </Form.Field>
      </div>
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
        <Form.Input type="number" defaultValue={item.minReputationScore} />
      </Form.Field>
      <div className="flex items-center mt-1 gap-4 justify-self-center ">
        <Form.SubmitButton type="edit" pending={isEditing}>
          Edit
        </Form.SubmitButton>
        <button
          className="inline cursor-pointer px-2 py-3 border-gray-200 bg-white hover:bg-gray-200 transition-all duration-300"
          onClick={onCloseModal}
        >
          cancel
        </button>
      </div>
    </Form>
  );
}

export default EditToolForm;
