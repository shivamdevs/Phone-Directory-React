import { useState } from 'react';
import './index.css';

function App() {
  const [home, homeState] = useState(true);
  const addContact = () => {
    homeState(false);
  };
  const closeContact = () => {
    homeState(true);
  };
  const [items, setItems] = useState([]);
  const addContent = (content) => {
    setItems(oldItem => [...oldItem, content]);
  };
  const removeContent = (index) => {
    let clone = [...items];
    clone.splice(index, 1);
    setItems(clone);
  };
  return (
    <>
      {home && <Home list={items} remover={removeContent} contact={addContact} />}
      {!home && <Adder adder={addContent} contact={closeContact} />}
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
          <div className="item-col nummber">Sr.</div>
          <span className="col-line"></span>
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
        <div className="viewer">
          {
            props.list.map(function (item, i) {
              return (
                <ListItem data={item} key={i} id={i} handler={props.remover}></ListItem>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
function ListItem(props) {
  return (
    <div key={(props.data.id)} className="item">
      <div className="item-col number">{props.id + 1}</div>
      <span className="col-line"></span>
      <div className="item-col name">{props.data.name}</div>
      <span className="col-line"></span>
      <div className="item-col phone">{props.data.phone}</div>
      <span className="col-line"></span>
      <div className="item-col email">{props.data.email}</div>
      <span className="col-line"></span>
      <div className="item-col address">{props.data.address}</div>
      <span className="col-line"></span>
      <div className="item-col action">
        <button className="delete" type="button" onClick={() => { props.handler(props.id) }}>Delete</button>
      </div>
    </div>
  );
}
function Adder(props) {
  const submitHandle = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const phone = event.target[1].value;
    const email = event.target[2].value;
    const address = event.target[3].value;
    const button = event.target[4];
    button.disabled = true;
    button.innerHTML = 'Adding...';
    props.adder({
      "name": name,
      "address": address,
      "phone": phone,
      "email": email,
    });
    props.contact();
    button.disabled = false;
    button.innerHTML = 'Add Contact';
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
          <input required type="text" placeholder="John Doe" className="input" />
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Phone</label>
          <input required type="number" placeholder="9876543210" className="input" />
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Email</label>
          <input required type="email" placeholder="john@doe.com" className="input" />
        </div>
        <div className="formgroup">
          <label htmlFor="" className="label">Address</label>
          <textarea required name="" className="input" placeholder='123 Main'></textarea>
        </div>
        <div className="formsubmit">
          <button type="submit" className="adder">Add Contact</button>
        </div>
      </form>
    </div>
  );
}

export default App;