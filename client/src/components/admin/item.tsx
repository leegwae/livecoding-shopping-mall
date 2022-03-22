import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { SyntheticEvent } from "react";
import { Product, UPDATE_PRODUCT } from "../../graphql/products";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import { MutableProduct } from "../../graphql/products";
import arrToObj from "../../utils/arrToObj";

const AdminItem = ({
	id,
	imageUrl,
	price,
	title,
	description,
	createdAt,
	isEditing,
	startEdit,
	doneEdit
}: Product & {
	isEditing: boolean;
	startEdit: () => void;
	doneEdit: () => void;
}) => {
	const queryClient = getClient()
  const { mutate: updateProduct } = useMutation(
    ({ title, imageUrl, price, description }: MutableProduct) =>
      graphqlFetcher(UPDATE_PRODUCT, { id, title, imageUrl, price, description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
        doneEdit();
      },
    },
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    updateProduct(formData as MutableProduct)
  };

  if (isEditing)
    return (
      <li className="product-item">
        <form onSubmit={handleSubmit}>
          <label>
            상품명: <input name="title" type="text" required defaultValue={title} />
          </label>
          <label>
            이미지URL: <input name="imageUrl" type="text" required defaultValue={imageUrl} />
          </label>
          <label>
            상품가격: <input name="price" type="number" required min="1000" defaultValue={price} />
          </label>
          <label>
            상세: <textarea name="description" defaultValue={description} />
          </label>
          <button type="submit">저장</button>
        </form>
      </li>
    );

	return (
		<li className="product-item">
			<Link to={`/products/${id}`}>
				<p className="product-item__ti tle">{title}</p>
				<img className="product-item__image" src={imageUrl} />
				<span className="product-item__price">₩{price}</span>
			</Link>
			{!createdAt && <span>삭제된 상품입니다</span>}
			<button
				className="product-item__edit"
				onClick={startEdit}
			>수정</button>
 		</li>		
	);
}

export default AdminItem;
