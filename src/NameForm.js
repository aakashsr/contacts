import React, { Component } from "react";

class NameForm extends Component {
  state = { email: "" }
  handleChange= (event) => {
      this.setState({email:event.target.value})
  }

  render() {
    return (
    
    <form>
        <input type='text' value={this.state.email} />
        onChange={this.handleChange} />
    </form>

    )
  }
}

export default NameForm;
