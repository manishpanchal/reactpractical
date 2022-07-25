import './App.css';
import React from 'react';

function TableList(props) {
  const lists = props.listItems;
  const listItems = lists.map((list,i) =>
    <tr key={'key'+list.id}>
      <td>{list.name}</td>
      <td>{list.color}</td>
      <td>
        <button className='btn-edit mr-10' onClick={() => props.handleActionButtons(i, "update")}>Edit</button>
        <button className='btn-delete mr-10' onClick={() => props.handleActionButtons(i, "delete")}>Delete</button>
      </td>
    </tr>
  );
  return (
    listItems
  );
}
function Circle(props) {
  //console.log({props});
  return ( 
      <div className="col-25">
          <div className={props.cname}> {props.counter} </div>
      </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '',
      counter: 1,
      tableList: [],
      counterRed: 0,
      counterGreen: 0,
      counterBlue: 0,
      update: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let new_lists;
    //console.log('Your Name is: ' + this.state.name);
    //console.log('Your favorite color is: ' + this.state.color);

    event.preventDefault();
    if (this.state.name.trim() === "" || this.state.color.trim() === "") {
      alert("ALL fields are required");
      return false;
    }

    //this.setState();
    if (this.state.update === false) {
      let listExistCheck = this.state.tableList.find((row) => row.name === this.state.name.trim());
      if (listExistCheck) {
        alert('Row data is exist, please try again');
        return false;
      }
      let list = {
        id: this.state.counter,
        name: this.state.name.trim(),
        color: this.state.color.trim()
      };

      //console.log(list);
      new_lists = [...this.state.tableList, list];

    } else {
      new_lists = [...this.state.tableList];

      new_lists[this.state.update] = {
        name: this.state.name.trim(),
        color: this.state.color.trim(),
      };
    }
    let colors = this.getColors(new_lists);
    //console.log(colors);
    this.setState({
      name: '',
      color: '',
      tableList: new_lists,
      counter: this.state.counter + 1,
      counterRed: colors.red,
      counterGreen: colors.green,
      counterBlue: colors.blue,
      update: false,
    });

    //console.log(this.state.tableList);
  }


  // handleDelete(event) {
  //   console.log(event);
  // }

  getColors = (listData) => {
    let colors = {};

    let colors_red = listData.filter((row) => row.color === 'red');
    colors['red'] = colors_red.length;
    let colors_green = listData.filter((row) => row.color === 'green');
    colors['green'] = colors_green.length;
    let colors_blue = listData.filter((row) => row.color === 'blue');
    colors['blue'] = colors_blue.length;

    return colors;
  };

  handleActionButtons = (index, action) => {
    if (action === "delete") {
      if(window.confirm("Are you sure wan`t to delete this record")){
        let { tableList } = this.state;
        tableList.splice(index, 1);
        let colors = this.getColors(tableList);
        this.setState({ 
          tableList, 
          counterRed: colors.red,
          counterGreen: colors.green,
          counterBlue: colors.blue
        });
      }else{
        return false;
      }
      
    } else if (action === "update") {
      let { tableList } = this.state;
      let { name, color } = tableList[index];
      this.setState({
        name,
        color,
        update: index,
      });
    }
  };

  resetFormData = () => {
    this.setState({ name: "", color: "", update: false });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-50">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-25">
                  <label>First Name</label>
                </div>
                <div className="col-75">
                  <input type="text" id="name" name="name" placeholder="Your name.." value={this.state.name} onChange={this.handleInputChange}></input>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Color</label>
                </div>
                <div className="col-75">
                  <select id="color" name="color" value={this.state.color} onChange={this.handleInputChange}>
                    <option value="">select an option</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                </div>
                <div className="col-50">
                  <input type="submit" value={this.state.update === false ? "Save" : "Update"} ></input>
                  &nbsp;
                  <input type="reset" value="Clear" onClick={this.resetFormData}></input>
                </div>
              </div>
            </form>
          </div>
          <div className="col-50 padding-10">
            <Circle cname="circleRed" counter={this.state.counterRed} />
            <Circle cname="circleGreen" counter={this.state.counterGreen} />
            <Circle cname="circleBlue" counter={this.state.counterBlue} />
          </div>
        </div>
        <div className="row">
          <div className="col-50">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TableList listItems={this.state.tableList} handleActionButtons={this.handleActionButtons} />
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
  }
}

export default App;
