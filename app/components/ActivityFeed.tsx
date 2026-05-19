interface Activity {

  id: string;

  type: string;

  message: string;

  createdAt: Date;

}

export default function ActivityFeed({
  activities,
}: {
  activities: Activity[];
}) {

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 mt-10">

        <div className="space-y-4">

        {activities.length ? (

          activities.map((activity) => (

            <div
              key={activity.id}
              className="bg-black/30 rounded-2xl p-4 border border-white/5"
            >

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="font-medium">

                    {activity.message}

                  </p>

                  <p className="text-sm text-gray-400 mt-1">

                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="text-2xl">

                  {activity.type ===
                  "PROFILE_VIEW"
                    ? "👀"
                    : activity.type ===
                      "QR_SCAN"
                    ? "📱"
                    : activity.type ===
                      "NFC_TAP"
                    ? "📶"
                    : activity.type ===
                      "NEW_LEAD"
                    ? "🤝"
                    : "⚡"}

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-gray-400">

            No recent activity yet.

          </div>

        )}

      </div>

    </div>
  );
}