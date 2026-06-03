export default function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-100 hover:shadow-md transition">
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-3xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}
