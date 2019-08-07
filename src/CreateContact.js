import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";

class CreateContact extends Component {
  static propTypes = {
    onCreateContact: PropTypes.func.isRequired
  };
  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    if (this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  };
  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">
          Close
        </Link>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxheight={64}
          />
          <div class="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="handle" placeholder="Handle" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
