import ListDrivers from "../../components/Drivers/ListDrivers";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Drivers" />
            <ListDrivers />
        </>
    );
};
export default List;