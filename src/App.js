import "./App.css";
import React from "react";

// // images
// import preloader from "./assets/preloader.gif"
// import searchIcon from "./assets/img/"

class App extends React.Component {
  dataRows = document.querySelector("data-rows");

  constructor(props) {
    super(props);
    this.state = {
      FetchedData: [],
      details: {
        userName: "userName",
        description: "description",
        address: "address",
        state: "state",
        city: "city",
        zip: "zip",
      },
      selectedRowId: 10,
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleStatusChange(event) {
    var id = event.target.id;
    console.log(this.state.FetchedData[id]);
    this.setState({
      selectedRowId: id,
      details: {
        userName: `${this.state.FetchedData[id].firstName} ${this.state.FetchedData[id].lastName}`,
        description: `${this.state.FetchedData[id].description}`,
        address: `${this.state.FetchedData[id].address.streetAddress}`,
        state: `${this.state.FetchedData[id].address.state}`,
        city: `${this.state.FetchedData[id].address.city}`,
        zip: `${this.state.FetchedData[id].address.zip}`,
      },
    });
  }

  rowComponent = (id, firstName, lastName, email, phone, selectedRowId) => {
    var decideClassName = "data-row";
    if (selectedRowId === id) decideClassName = "data-row active";

    return (
      <div
        className={decideClassName}
        onClick={(e) => this.handleStatusChange(e)}
      >
        <td className="column1" id={id}>
          {id}
        </td>
        <td className="column2" id={id}>
          {firstName}
        </td>
        <td className="column3" id={id}>
          {lastName}
        </td>
        <td className="column4" id={id}>
          {email}
        </td>
        <td className="column5" id={id}>
          {phone}
        </td>
      </div>
    );
  };

  componentDidMount() {
    console.log("componentDidMount()");
    var url =
      "http://www.filltext.com/?rows=50&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("doingSomething()");
        var UpdatedList = {};
        data.forEach(
          ({ id, firstName, lastName, email, phone, description, address }) => {
            UpdatedList[id] = {
              firstName,
              lastName,
              email,
              phone,
              description,
              address,
            };
          }
        );
        this.setState({
          FetchedData: UpdatedList,
        });
      });

    console.log("componentDidMount() end");
  }

  render() {
    return (
      <div className="App">
        <div id="overlay">
          <img src="/assets/img/preloader.gif" alt="Preloader icon" />
        </div>

        <main>
          <div id="table-section">
            <form action="/">
              <img src="/assets/img/search-icon.svg" alt="Search Icon" />
              <input
                type="text"
                placeholder="Enter something"
                name="search-box"
                id="search-box"
                value=""
              />
            </form>

            <div id="table-wrapper">
              <div id="table-headers">
                <table>
                  <thead>
                    <tr>
                      <th className="column1">Id</th>
                      <th className="column2">FirstName</th>
                      <th className="column3">LastName</th>
                      <th className="column4">Email</th>
                      <th className="column5">Phone</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div id="table-data">
                <table>
                  <tbody>
                    {
                      Object.keys(this.state.FetchedData).map((id) => {
                        return this.rowComponent(
                          id,
                          this.state.FetchedData[id].firstName,
                          this.state.FetchedData[id].lastName,
                          this.state.FetchedData[id].email,
                          this.state.FetchedData[id].phone,
                          this.state.selectedRowId
                        );
                      })
                      // this.state.FetchedData.forEach(
                      //   (index, value) => {
                      //     console.log("id:", index);
                      //     return <div>{"index"}</div>;
                      //   }
                      // ({ id, firstName, lastName, email, phone },value) => {
                      //   this.rowComponent(
                      //     id,
                      //     firstName,
                      //     lastName,
                      //     email,
                      //     phone
                      //   );
                      // }
                      // )
                      // this.state.FetchedData.map((element)=>{
                      //   return <div>
                      //     element
                      //   </div>
                      // })
                    }
                  </tbody>
                </table>
                <script
                  language="JavaScript"
                  type="text/javascript"
                  src="./script.js"
                ></script>
              </div>
            </div>
          </div>

          <div id="info-wrapper">
            <h1>Details</h1>
            <p>Click on a table item to get detailed information</p>
            <div id="info-content">
              <div>
                <b>User selected:</b> {this.state.details.userName}
              </div>
              <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readOnly>
                  {this.state.details.description}
                </textarea>
              </div>
              <div>
                <b>Address:</b> {this.state.details.address}
              </div>
              <div>
                <b>City:</b> {this.state.details.city}
              </div>
              <div>
                <b>State:</b> {this.state.details.state}
              </div>
              <div>
                <b>Zip:</b> {this.state.details.zip}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
