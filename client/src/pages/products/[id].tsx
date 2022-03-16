import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import ProductDetail from '../../components/product/detail';
import { Product, GET_PRODUCT } from '../../graphql/products';

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery<{ product: Product }>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id }),
  );

  if (!data) return null;

  return (
    <div>
      <h2>상품 상세</h2>
      <ProductDetail item={data.product} />
    </div>
  );
};

export default ProductDetailPage;
