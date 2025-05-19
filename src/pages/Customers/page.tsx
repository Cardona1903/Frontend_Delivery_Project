import ListCustomers from "../../components/Customers/ListCustomers";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Customers" />
            <ListCustomers />
        </>
    );
};
export default List;