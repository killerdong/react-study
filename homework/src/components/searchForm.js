import React from "react";

export default ({searchUser}) => {
    return ( 
        <form onSubmit={e => {
            e.preventDefault();
            searchUser(this.name.value);
            }}>
            <input placeholder="이름을 입력하세요." ref={input => this.name = input} />
            <button>검색</button>
        </form>);
}