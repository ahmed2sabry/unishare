import SignupForm from "@/app/_components/SignupForm";
import Link from "next/link";

const metadata = {
  title: "sign up",
};

// const colleges = [
//   // Engineering
//   { value: "engineering", label: "Faculty of Engineering" },

//   // Science
//   { value: "science", label: "Faculty of Science" },

//   // Medicine
//   { value: "medicine", label: "Faculty of Medicine" },
//   { value: "dentistry", label: "Faculty of Dentistry" },
//   { value: "pharmacy", label: "Faculty of Pharmacy" },

//   // Computer & Information
//   {
//     value: "computers_and_ai",
//     label: "Faculty of Computers and Artificial Intelligence",
//   },
//   { value: "computer_science", label: "Faculty of Computer Science" },

//   // Commerce / Business
//   { value: "commerce", label: "Faculty of Commerce" },
//   { value: "business", label: "Faculty of Business Administration" },

//   // Law & Arts
//   { value: "law", label: "Faculty of Law" },
//   { value: "arts", label: "Faculty of Arts" },
//   { value: "languages", label: "Faculty of Languages (Al-Alsun)" },

//   // Education
//   { value: "education", label: "Faculty of Education" },
//   { value: "kindergarten", label: "Faculty of Early Childhood Education" },

//   // Specific/Other
//   { value: "agriculture", label: "Faculty of Agriculture" },
//   { value: "veterinary", label: "Faculty of Veterinary Medicine" },
//   { value: "fine_arts", label: "Faculty of Fine Arts" },
//   { value: "applied_arts", label: "Faculty of Applied Arts" },
//   { value: "physical_education", label: "Faculty of Physical Education" },
//   { value: "nursing", label: "Faculty of Nursing" },
//   { value: "tourism_and_hotels", label: "Faculty of Tourism and Hotels" },
// ];

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/colleges`);
  const collegesData = await res.json();
  console.log(collegesData);

  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <SignupForm colleges={collegesData} />
      </div>
    </div>
  );
}
