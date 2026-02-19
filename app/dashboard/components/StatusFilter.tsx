import React from "react";

interface StatusFilterProps {
  status: string;
  setStatus: (status: string) => void;
}

export default function StatusFilter({ status, setStatus }: StatusFilterProps) {
  return (
    <div className="mb-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border px-3 py-2 text-sm"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}
