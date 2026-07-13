// export async function generateMetadata({ params }) {
//   const { name } = await getCabin(params.cabinId);
//   return {
//     title: `Cabin ${name}`,
//   };
// }

import CategoriesGrid from "@/app/_components/CategoriesGrid";

export const metadata = {
  title: "categories",
};

function page() {
  // params.categoryId
  return (
    <div>
      <CategoriesGrid />
    </div>
  );
}

export default page;
