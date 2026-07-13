import { redirect } from "next/navigation";

function page() {
  // TODO: Implement authentication check here
  redirect("/profile/requests/received");
}

export default page;
