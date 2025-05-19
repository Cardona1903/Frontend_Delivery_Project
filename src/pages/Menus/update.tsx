import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateMenu, getMenuById } from "../../services/MenuService";
import Swal from "sweetalert2";

import { Menu } from '../../models/Menu';
import MenuFormValidator from '../../components/Menus/MenuFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateMenuPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!id) return;
            const data = await getMenuById(parseInt(id));
            setMenu(data);
        };
        fetchMenu();
    }, [id]);

    const handleUpdateMenu = async (theMenu: Menu) => {
        try {
            const updated = await updateMenu(theMenu.id || 0, theMenu);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/menus/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!menu) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Menú" />
            <MenuFormValidator
                handleUpdate={handleUpdateMenu}
                mode={2}
                menu={menu}
            />
        </>
    );
};

export default UpdateMenuPage;