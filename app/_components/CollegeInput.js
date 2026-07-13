import Form from "./Form";

async function CollegeInput() {
  const [res1, res2] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Colleges`),
  ]);
  const [categories, colleges] = await Promise.all([res1.json(), res2.json()]);
  return (
    <>
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
    </>
  );
}

export default CollegeInput;
