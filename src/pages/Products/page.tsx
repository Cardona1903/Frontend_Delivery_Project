import ListProducts from "../../components/Products/ListProducts";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Products" />
            <ListProducts />
        </>
    );
};
export default List;