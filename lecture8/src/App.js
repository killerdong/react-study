import React, {Component} from 'react';
import AddColorForm from './AddColorForm_func';
import ColorList from './ColorList';
import {v4} from 'uuid';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: []
        };

        this._addColor = this._addColor.bind(this);
        this._onRate = this._onRate.bind(this);
        this._onRemove = this._onRemove.bind(this);
    }

    _addColor(title, color) {

        this.setState({
            colors: [
                ...this.state.colors,
                {
                    id: v4(),
                    title,
                    color,
                    rating: 0
                }
            ]
        });
    }

    _onRate(id, rating) {
        const colors = this.state.colors.map(color => color.id === id ? { ...color, rating } : color);
        this.setState({colors});
    }

    _onRemove(id) {
        const colors = this.state.colors.filter(color => color.id !== id);
        this.setState({colors});
    }
    

    render() {
        const { colors } = this.state;

        return (
            <div className="app">
                <AddColorForm onNewColor={this._addColor} />
                <ColorList colors={colors} onRate={this._onRate} onRemove={this._onRemove} />
            </div>
        );
    }

}