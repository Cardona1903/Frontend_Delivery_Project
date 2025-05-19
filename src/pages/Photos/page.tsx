import ListPhotos from "../../components/Photos/ListPhotos";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Photos" />
            <ListPhotos />
        </>
    );
};
export default List;