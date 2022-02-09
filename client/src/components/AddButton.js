import React from "react";
import DatabaseContext from "./databaseContext";
import { doc, setDoc } from "firebase/firestore";


class AddButton extends React.Component {
  static contextType = DatabaseContext;

  constructor(props) {
    super(props);

    this.contactListRef = React.createRef();
  }

  componentDidMount() {
      this.contactListRef = doc(this.context.database, this.context.uid, "Luke");
  }

  handleOnAdd = () => {
      setDoc(this.contactListRef, {
          name: "Han Solo",
          profilePic: "address",
          uid: "???"
      });
  }

  render() {
    return (
      <button id="addButton" className="buttons" onClick={this.handleOnAdd}>
        Add
      </button>
    );
  }
}

export default AddButton;
