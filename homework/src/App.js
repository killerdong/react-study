import React, { Component } from 'react';
import InputForm from './components/inputForm';
import SearchFrom from './components/searchForm';
import UserList from './components/userlist';

class App extends Component {

  constructor(props) {
    super(props);
    this.users = props.users;
    this.state = {users : this.users};
  }

  searchUser(name) {
    const users = this.users.filter(user => user.name.includes(name));
    this.setState({users});
  }

  componentWillUnmount() {
    console.log('unMount');
  }

  addUser(name, phone, email) {
    const id = this.users.reduce((max, user) => user.id <= max ? user.id + 1 : max, 0);
    
    this.users = [
        ...this.users,
        {id, name, phone, email}
    ];

    this.setState({users: this.users});
  }

  render() {
    return (
      <div className="App">
          <SearchFrom searchUser={this.searchUser.bind(this)}/>
          <InputForm addUser={this.addUser.bind(this)} />
          <UserList users={this.state.users} />
      </div>
    );
  }
}

export default App;
