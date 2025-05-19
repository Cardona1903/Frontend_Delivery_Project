import ListOrders from "../../components/Orders/ListOrders";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Orders" />
            <ListOrders />
        </>
    );
};
export default List;