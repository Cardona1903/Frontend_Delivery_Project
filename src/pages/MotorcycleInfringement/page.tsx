import ListInMotorcycleInfringements from "../../components/MotorcycleInfringement/ListMotorcycleInfringement";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="InMotorcycleInfringements" />
            <ListInMotorcycleInfringements />
        </>
    );
};
export default List;