import React from 'react';
import Color from './Color';

export default ({colors, onRemove=f=>f, onRate=f=>f}) => 
    <div className="color-list">
        {colors.length === 0 ? <p>색이 없습니다.(색을 추가해주세요)</p> 
            : colors.map(color => <Color key={color.id} {...color} onRemove={() => onRemove(color.id)} onRate={rating => onRate(color.id, rating)}/>)}
    </div>
;