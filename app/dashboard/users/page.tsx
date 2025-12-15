import Table from "../components/table";

const dummyUsers = [
  { name: "Adil", email: "adil@gmail.com", role: "admin" },
  { name: "John", email: "john@gmail.com", role: "user" },
];

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <Table
        columns={["Name", "Email", "Role"]}
        data={dummyUsers.map((u) => [u.name, u.email, u.role])}
      />
    </div>
  );
}
