import { Link } from "react-router-dom";

const Gnb = () => (
	<nav className="gnb">
		<ul>
			<li>
				<Link to="/">메인으로</Link>
			</li>			
			<li>
				<Link to="/products">상품 목록</Link>
			</li>
			<li>
				<Link to="/cart">장바구니</Link>
			</li>
			<li>
				<Link to="/admin">관리자</Link>
			</li>
		</ul>
	</nav>
);

export default Gnb;
