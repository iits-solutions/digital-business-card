type StatsCardProps = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-2xl p-8">

      <p className="text-gray-400 mb-4">
        {title}
      </p>

      <h3 className="text-5xl font-bold">
        {value}
      </h3>

    </div>
  );
}