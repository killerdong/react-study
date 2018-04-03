import React, {Component} from 'react';
import Member from './Member';
import {getFakeMembers} from './MemberService';

const MemberList = class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            loading: false, 
            error: null
        }
    }

    async componentWillMount() {
        this.setState({loading: true});

        try {
            const members = await getFakeMembers(this.props.count);
            this.setState({members, loading: false});
        } catch (ex) {
            this.setState({error: ex, loading: false});
        }
    }

    componentWillUpdate() {
        console.log('갱신 생애주기');
    }

    componentWillUnmount() {
        console.log('삭제');
    }
        
    render() {
        const {members, loading, error} = this.state;

        return (
            <div className="member-list">
                {loading ? 
                    <span>맴버 로딩 중</span> 
                    : members.length ? 
                        members.map((user, i) => <Member key={i} {...user}  />)
                        : <span>0 맴버 로딩됨...</span>
                }
                {error ? <p>맴버 로딩 오류: {error.message}</p> : ''}
            </div>
        );
    }
}


export default MemberList;