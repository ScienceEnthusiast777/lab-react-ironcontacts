import logo from "./logo.svg";
import "./App.css";
import contacts from "./contacts.json";
import React from "react";

const data = contacts.slice(0, 5);

class App extends React.Component {
  state = {
    contactsToDisplay: data,
  };

  addContact = () => {
    var ranIndex = Math.floor(Math.random() * contacts.length);
    var contactToAdd = contacts[ranIndex];
    this.setState((state) => ({
      contactsToDisplay: [contactToAdd, ...state.contactsToDisplay],
    }));
  };

  sortAlphabetically = () => {
    const dataCopy = JSON.parse(
      JSON.stringify(this.state.contactsToDisplay)
    ).sort((a, b) => a.name.localeCompare(b.name));
    this.setState((state) => ({
      contactsToDisplay: [...dataCopy],
    }));
  };

  sortPopularity = () => {
    const dataCopy = JSON.parse(JSON.stringify(this.state.contactsToDisplay))
      // console.log(sortedData)
      .sort((a, b) => b.popularity - a.popularity);
    this.setState((state) => ({
      contactsToDisplay: [...dataCopy],
    }));
  };

  deleteContact = (props) => {

    const dataCopy = JSON.parse(JSON.stringify(this.state.contactsToDisplay));
    for (let i = 0; i < dataCopy.length; i++) {
      if (dataCopy[i].id === props) {
        dataCopy.splice(i, 1);
      }
      this.setState((state) => ({
        contactsToDisplay: [...dataCopy],
      }));
    }

  };

  render() {
    const dataList = this.state.contactsToDisplay.map((contact) => (
      <div key={contact.id}>
        <tr>
          <td>
            <img src={contact.pictureUrl} alt="pic" />
          </td>
          <td>{contact.name}</td>
          <td>{contact.popularity}</td>
        </tr>
        <button
          onClick={() => this.deleteContact(contact.id)}
          targetcontact={contact.id}
        >
          DELETE
        </button>
      </div>
    ));

    return (
      <div className="App">
        <h1>Contacts</h1>
        <table>
          <tr>
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
          </tr>
          {dataList}
        </table>
        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortAlphabetically}>Sort by Name</button>
        <button onClick={this.sortPopularity}>Sort by Popularity</button>
      </div>
    );
  }
}

export default App;
