"use client";

import { useState } from "react";
import { useAppDispatch } from "@/app/redux/store/hooks";
import { createOrder } from "@/app/redux/features/orderSlice";

export default function AddOrderModal({ open, onClose }) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    service: "",
    description: "",
  });

  const [files, setFiles] = useState([]);

  if (!open) return null;

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    files.forEach((f) => formData.append("files", f));

    dispatch(createOrder(formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg
                      max-h-[90vh] overflow-y-auto">

        <h2 className="mb-4 text-xl font-semibold">Add New Order</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="mb-3 w-full rounded-lg border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        <input
          type="file"
          multiple
          className="mb-3 w-full text-sm"
          onChange={(e) => setFiles([...e.target.files])}
        />

        {/* Image Preview */}
        {files.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <img
                key={i}
                src={URL.createObjectURL(f)}
                className="h-16 w-16 rounded object-cover"
              />
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm
                       text-white hover:bg-blue-700"
          >
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
}
