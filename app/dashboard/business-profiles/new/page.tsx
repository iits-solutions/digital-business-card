import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
async function createBusinessProfile(formData: FormData) {
  "use server";

  const session =
  await getServerSession(authOptions);

if (!session?.user?.email) {
  redirect("/login");
}

const user =
  await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

if (!user) {
  throw new Error("User not found");
}

  await prisma.businessProfile.create({
    data: {
      userId: user.id,
      firstName: String(formData.get("firstName")),
      lastName: String(formData.get("lastName")),

      companyName: String(formData.get("companyName")),
      jobTitle: String(formData.get("jobTitle")),

      primaryPhone: String(formData.get("primaryPhone")),
      email: String(formData.get("email")),

      city: String(formData.get("city")),
      country: String(formData.get("country")),

      slug: String(formData.get("slug")),

      
      },
  });
redirect("/dashboard/business-profiles");
}
export default function NewBusinessProfilePage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Create Professional Profile
      </h1>

      <form action={createBusinessProfile} className="space-y-4 max-w-lg">

  <div>
    <label>First Name *</label>
    <input
      name="firstName"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Last Name *</label>
    <input
      name="lastName"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Company Name *</label>
    <input
      name="companyName"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Job Title *</label>
    <input
      name="jobTitle"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Primary Phone *</label>
    <input
      name="primaryPhone"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Email *</label>
    <input
      name="email"
      type="email"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>City *</label>
    <input
      name="city"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Country *</label>
    <input
      name="country"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
    />
  </div>

  <div>
    <label>Slug *</label>
    <input
      name="slug"
      className="w-full p-2 bg-gray-900 border border-gray-700 rounded"
      placeholder="its-solutions"
    />
  </div>
<input
  type="hidden"
  name="active"
  value="true"
/>
  <button
    className="bg-green-600 px-4 py-2 rounded"
  >
    Save Professional Profile

  </button>

</form>
    </div>
  );
}