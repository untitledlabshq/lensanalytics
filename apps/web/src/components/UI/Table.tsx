import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { FC } from "react";

interface Props {
  columns: any;
  data: any;
}

const Table: FC<Props> = ({ columns, data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // console.log(table.getState());

  table
    .getRowModel()
    .rows.map((row) =>
      row
        .getVisibleCells()
        .map((cell) => console.log(cell.column.id, cell.getContext()))
    );

  return (
    <>
      <div className="relative overflow-x-auto border border-slate-200 hidden md:block">
        {/* desktop table */}
        <table className="border-collapse table-auto w-full bg-white text-sm">
          <thead className="border-b border-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-slate-200 font-normal text-xs p-4 text-slate-500 text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 border-b border-slate-50">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile table */}
      <div className="block md:hidden">
        <table className="border-collapse table-auto w-full  text-sm">
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <dl
                key={row.id}
                className="border-solid border my-1 border-slate-50 bg-white shadow-sm"
              >
                {row.getVisibleCells().map((cell, key) => (
                  <div
                    key={key}
                    className="bg-white px-4 py-2  flex flex-row justify-between "
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {cell.column.id}
                    </dt>
                    <dd className="mt-1 text-right text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
