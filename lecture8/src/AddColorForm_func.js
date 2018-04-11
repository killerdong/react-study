import React from 'react';
import PropTypes from 'prop-types';

const AddColorForm = ({onNewColor = f => f}) => {
    let title, color;
    
    const submit = e => {
        e.preventDefault();
        onNewColor(title.value, color.value);
        title.value = '';
        color.value = '#000'
        title.focus();
    };

    return (
        <form onSubmit={submit}>
            <input type="text" placeholder="색 이름..." required ref={input => title = input} />
            <input type="color" required ref={input => color = input} />
            <button>추가</button>
        </form>
    );

};


AddColorForm.propTypes = {
    onNewColor: PropTypes.func
};


export default AddColorForm;


