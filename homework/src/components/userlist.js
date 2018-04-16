import React from "react";
import User from './user';

export default ({users}) => {
    
    return ( 
        <table>
            <thead>
            <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>이메일</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                { users.map(user => <User key={user.id} {...user} />) }
            </tbody>
        </table>);
}