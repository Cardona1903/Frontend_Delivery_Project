import ListIssues from "../../components/Issues/ListIssues";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Issues" />
            <ListIssues />
        </>
    );
};
export default List;