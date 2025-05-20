import React from 'react';
import { Menu } from '../../models/Menu';
import MenuFormValidator from '../../components/Menus/MenuFormValidator';

import Swal from 'sweetalert2';
import { createMenu } from "../../services/MenuService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateMenu = async (menu: Menu) => {
        try {
            const createdMenu = await createMenu(menu);
            if (createdMenu) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListMenus");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div>
            <h2>Create Menu</h2>
            <Breadcrumb pageName="Crear Menú" />
            <MenuFormValidator
                handleCreate={handleCreateMenu}
                mode={1}
            />
        </div>
    );
};

export default App;