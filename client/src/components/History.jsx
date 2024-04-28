import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import fetchData from "./customInstance";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const History = () => {
  const queryClient = useQueryClient();

  const { isPending, data, isError } = useQuery({
    queryKey: ["history"],
    queryFn: () => fetchData.get("/history"),
  });

  const { mutate: deleteProduct, isLoading } = useMutation({
    mutationFn: (data) => fetchData.post(`/history/`, data),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries(["history"]);
    },
    onError: () => {
      toast.error("Error deleting product!");
    },
  });

  const handleRowDelete = (productCode, colorCode) => {
    const data = { productCode, colorCode };
    deleteProduct(data);
  };

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto mt-4">
        <p className="text-2xl font-semibold">Fetching History...</p>
        <div className="animate-pulse mt-8">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <div className="max-w-5xl mx-auto mt-4">
          <p className="text-5xl font-bold mt-8">Error fetching data!😶</p>
        </div>
      </>
    );
  }

  const products = data.data;

  return (
    <>
      <div className="max-w-5xl mx-auto mt-4 ">
        <p className="text-2xl font-semibold">Fetch History</p>
        <div className="mt-8">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Product Code</th>
                <th className="border px-4 py-2">Color Code</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <p className="font-semibold text-yellow-800 text-2xl mt-4 block">
                  No History
                </p>
              )}
              {products.map((product) => {
                return (
                  <tr key={nanoid()}>
                    <td className="border px-4 py-2">{product.brand}</td>
                    <td className="border px-4 py-2">{product.productCode}</td>
                    <td className="border px-4 py-2">{product.colorCode}</td>
                    <td className="border px-4 py-2">{product.createdAt}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() =>
                          handleRowDelete(
                            product.productCode,
                            product.colorCode
                          )
                        }
                        type="button"
                        disabled={isLoading}
                        className="mx-auto block hover:scale-110 duration-200 bg-red-500 text-white px-2 rounded-md border"
                      >
                        {isLoading ? "Deleting" : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default History;
