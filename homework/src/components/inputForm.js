import React from "react";

export default props => {
    return ( 
        <form onSubmit={(e) => {
                e.preventDefault();
                const {name, phone, email} = this;
                props.addUser(name.value, phone.value, email.value);
            }}>
            <input placeholder="이름을 입력하세요." ref={input => this.name = input } />
            <input placeholder="전화번호를 입력하세요." ref={input => this.phone = input } />
            <input placeholder="이메일을 입력하세요." ref={input => this.email = input } />
            <button>입력</button>
        </form>);
}