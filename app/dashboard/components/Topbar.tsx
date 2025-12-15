export default function Topbar() {
  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="font-semibold">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
          alt="profile"
        />
      </div>
    </div>
  );
}
