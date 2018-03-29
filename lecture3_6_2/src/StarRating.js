import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

export default class extends Component{

    constructor(props) {
        super(props);
        this.state = {
            startsSelected: props.startsSelected || 0
        };
        this._change = this._change.bind(this);
    }

    static propTypes = {
        totalStars: PropTypes.number
    }

    static defaultProps = {
        totalStars: 5
    }

    _change(startsSelected) {
        this.setState({startsSelected});
    }

    render() {
        const { totalStars } = this.props;
        const { startsSelected } = this.state;

        return (
            <div className="star-rating">
                {[...Array(totalStars)].map((n, i) => <Star key={i} selected={i < startsSelected} onClick={() => this._change(i+1)} />)}
                <p>별점: {startsSelected} / {totalStars}</p>
            </div>
        )
    }
};
