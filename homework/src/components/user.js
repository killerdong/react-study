import React from "react";

export default ({name, phone, email}) => {
    return ( 
        <tr>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
        </tr>
    );
}