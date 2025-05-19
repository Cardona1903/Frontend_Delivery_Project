import ListRestaurants from "../../components/Restaurants/ListRestaurants";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Restaurants" />
            <ListRestaurants />
        </>
    );
};
export default List;