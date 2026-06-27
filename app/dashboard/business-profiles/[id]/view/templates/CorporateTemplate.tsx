interface Props {
  profile: any;
  fullName: string;
}

export default function CorporateTemplate({
  profile,
  fullName,
}: Props) {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Banner */}
      <div className="relative h-64">
        {profile.backgroundImage ? (
          <img
            src={profile.backgroundImage}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-blue-700" />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-6">

            <img
              src={profile.profileImage || "/default-avatar.png"}
              alt={fullName}
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
            />

            <div>

              <h1 className="text-4xl font-bold text-gray-900">
                {fullName}
              </h1>

              <p className="text-blue-700 text-xl mt-2">
                @{profile.slug}
              </p>

              <p className="text-gray-700 mt-2">
                {profile.jobTitle}
              </p>

              <p className="text-gray-500">
                {profile.companyName}
              </p>

            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-bold text-gray-900">
              About Me
            </h2>

            <p className="text-gray-700 mt-3">
              {profile.aboutMe || "Welcome to my digital business profile."}
            </p>

          </div>

          <div className="flex gap-4 mt-8">

            <a
              href={`/api/business-vcard/${profile.id}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Save Contact
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Contact Me
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}