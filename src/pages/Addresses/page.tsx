import ListAddresses from "../../components/Addresses/ListAddresses";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Addresses" />
            <ListAddresses />
        </>
    );
};
export default List;