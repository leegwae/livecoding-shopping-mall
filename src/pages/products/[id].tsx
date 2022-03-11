import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Product } from '../../type';
import { restFetcher, QueryKeys } from '../../queryClient';
import ProductDetail from '../../components/product/detail';

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    restFetcher({
      method: 'GET',
      path: `/products/${id}`,
    }),
  );

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail item={data} />
    </div>
  );
};

export default ProductDetailPage;
