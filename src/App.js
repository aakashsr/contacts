import React, { Component } from "react";
import ListContacts from "./ListContacts"; // Importing our component
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount = () => {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({ contacts }));
    });
  };

  // The method below actually splits the operation into two. It first calls setState to remove the contact from the UI
  // and then it calls "ContactsAPI.remove" to remove the contact from the DB.

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c => {
        return c.id !== contact.id;
      })
    }));
    ContactsAPI.remove(contact);
  };

  createContact = contact => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(prevContacts => ({
        contacts: prevContacts.contacts.concat(contact)
      }));
    });
  };

  // removeContact = contact => {
  //   ContactsAPI.remove(contact)
  //     .then(contact => {
  //       this.setState(prevState => ({
  //         contacts: prevState.contacts.filter(c => c.id !== contact.id)
  //       }));
  //     })
  //     .catch(error => console.log("DB error"));
  // };

  // Here in the above method , we remove the item from state ONLY IF the DB item is removed successfully. Otherwise , we handle the error with a catch statement.

  render() {
    return (
      <div>
        <Route
          path
          exact="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
