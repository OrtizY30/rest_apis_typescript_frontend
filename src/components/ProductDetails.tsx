import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteproduct } from "../services/ProductServices";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteproduct(+params.id);
    return redirect("/");
  }
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailability = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800 capitalize">{product.name}</td>

      <td className="p-3 text-lg text-gray-800 text-center">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800 text-center">
        <fetcher.Form action="" method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailability ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full cursor-pointer border border-black-100 `}
          >
            {isAvailability ? "Disponible" : "Agotado"}
          </button>

        </fetcher.Form>
      </td>

      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 w-full justify-between items-center ">
          <button
            onClick={() => navigate(`productos/${product.id}/editar`)}
            className="bg-indigo-600 text-white rounded-lg w-ful p-2 px-4 uppercase  font-bold text-xs w-full text-center hover:bg-indigo-500 cursor-pointer"
          >
            Editar
          </button>

          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Deseas eliminar este Producto?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value={"Eliminar"}
              className="bg-red-600 w-full text-white rounded-lg  p-2 uppercase font-bold text-xs text-center hover:bg-red-500 cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
