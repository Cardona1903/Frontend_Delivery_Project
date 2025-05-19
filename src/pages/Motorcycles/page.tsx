import ListMotorcycles from "../../components/Motorcycles/ListMotorcycles";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Motorcycles" />
            <ListMotorcycles />
        </>
    );
};
export default List;