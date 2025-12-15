export default function Table({ columns, data }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((col: string) => (
              <th key={col} className="p-3 text-left">{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row: any, idx: number) => (
            <tr key={idx} className="border-b">
              {row.map((cell: any, i: number) => (
                <td key={i} className="p-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
