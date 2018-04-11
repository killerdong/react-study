import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class extends Component {
    constructor(props) {
        super(props);
        this._submit = this._submit.bind(this);
    }

    _submit(e) {
        const {_title, _color} = this;
        e.preventDefault();
        //alert(`새로운 색: ${_title.value} ${_color.value}`);
        this.props.onNewColor(_title.value, _color.value);
        _title.value = '';
        _color.value = '#000'
        _title.focus();
    }

    render() {
        return (
            <form onSubmit={this._submit}>
                <input type="text" placeholder="색 이름..." required ref="input => this._title = input" />
                <input type="color" required ref="input => this._color = input" />
                <button>추가</button>
            </form>
        );
    }

    static propTypes = {
        onNewColor: PropTypes.func
    }

    static defaultProps = {
        onNewColor: f => f
    }
};
