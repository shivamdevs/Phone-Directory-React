import { useState } from 'react';
import list from './list.json';

function App() {
  const [home, homeState] = useState(true);
  const addContact = () => {
    homeState(false);
  };
  const closeContact = () => {
    homeState(true);
  };
  return (
    <>
      {home && <Home contact={addContact} />}
      {!home && <Adder contact={closeContact} />}
    </>
  );
}

function Home(props) {
  return (
    <div className="section">
      <header className="header">
        <h2>Phone Directory</h2>
        <button className="adder" onClick={props.contact}>Add</button>
      </header>
      <div className="list">
        <div className="item item-head">
          <div className="item-col name">Name</div>
          <span className="col-line"></span>
          <div className="item-col phone">Phone</div>
          <span className="col-line"></span>
          <div className="item-col email">Email</div>
          <span className="col-line"></span>
          <div className="item-col address">Address</div>
          <span className="col-line"></span>
          <div className="item-col action">Action</div>
        </div>
        {
          list.map(function (item, i) {
            return (
              <div key={(i + 1)} className="item">
                <div className="item-col name">{item.name}</div>
                <span className="col-line"></span>
                <div className="item-col phone">{item.phone}</div>
                <span className="col-line"></span>
                <div className="item-col email">{item.email}</div>
                <span className="col-line"></span>
                <div className="item-col address">{item.address}</div>
                <span className="col-line"></span>
                <div className="item-col action">
                  <button className="delete" type="button">Delete</button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
function Adder(props) {
  const [nameErr, nameErrorState] = useState(false);
  const [phoneErr, phoneErrorState] = useState(false);
  const submitHandle = (event) => {
    event.preventDefault();
    const name = event.target[0];
    const phone = event.target[1];
    const email = event.target[2];
    const address = event.target[3];
    const button = event.target[4];
    button.disabled = true;
    button.innerHTML = 'Adding...';
  };
  return (
    <div className="section">
      <header className="header">
        <h2>Add Subscriber</h2>
        <button className="delete" onClick={props.contact}>Cancel</button>
      </header>
      <form action="" method="post" onSubmit={submitHandle} className="addform">
        <div className="formgroup">
          <label htmlFor="" className="label">Name</label>
          <input type="text" placeholder="John Doe" className="input" />
          {nameErr && <span className="error">Something went wrong here!</span>}
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Phone</label>
          <input type="number" placeholder="9876543210" className="input" />
          {phoneErr && <span className="error">Something went wrong here!</span>}
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Email</label>
          <input type="email" placeholder="john@doe.com" className="input" />
          {phoneErr && <span className="error">Something went wrong here!</span>}
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Address</label>
          <textarea name="" className="input" placeholder='123 Main'></textarea>
          {phoneErr && <span className="error">Something went wrong here!</span>}
        </div>
        <div className="formsubmit">
          <button type="submit" className="adder">Add Contact</button>
        </div>
      </form>
    </div>
  );
}

export default App;