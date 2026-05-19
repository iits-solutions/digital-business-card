interface StatsCardProps {

  title: string;

  value: number;

  icon: string;

}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {

  return (

    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-gray-400 text-lg">

          {title}

        </h3>

        <span className="text-3xl">

          {icon}

        </span>

      </div>

      <h2 className="text-4xl font-bold">

        {value}

      </h2>

    </div>
  );
}