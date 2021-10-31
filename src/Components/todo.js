import React, { useState, useEffect } from "react";
import "./style.css";

const localStorageDataHandler = () => {
  const lists = localStorage.getItem("ToDoList");

  if (lists) return JSON.parse(lists);
  else return [];
};

export default function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setitems] = useState(localStorageDataHandler());
  const [editItem, seteditItem] = useState();
  const [toggleButton, settoggleButton] = useState(false);

  const addItems = () => {
    if (!inputData) alert("Enter any data!!!");
    else if (inputData && toggleButton) {
      setitems(
        items.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      seteditItem(null);
      settoggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setitems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItems = (index) => {
    const toEdit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(toEdit.name);
    seteditItem(index);
    settoggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setitems(updatedItems);
  };

  const removeAll = () => {
    return setitems([]);
  };

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="container">
          <figure>
            <figcaption>
              <h1>Add Your List Below</h1>
            </figcaption>
            <img
              src="https://sdtimes.com/wp-content/uploads/2014/09/todo-manager-icon.png"
              width="100"
              height="100"
              alt="Todo"
            />
          </figure>
          <div className="form">
            {/* Input  */}
            <div className="input">
              <input
                className="input-field"
                placeholder="Add Item"
                type="text"
                value={inputData}
                onChange={(event) => {
                  setInputData(event.target.value);
                }}
              ></input>
              {toggleButton ? (
                <i className="fa fa-edit icon" onClick={addItems}></i>
              ) : (
                <i className="fa fa-plus icon" onClick={addItems}></i>
              )}
            </div>

            {/* Show Items */}
            <div className="list">
              {items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="listButton">
                      <i
                        className="fa fa-edit icon1"
                        onClick={() => editItems(curElem.id)}
                      ></i>
                      <i
                        className="fa fa-trash-alt icon1"
                        onClick={() => deleteItem(curElem.id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Remove Button */}
            <div className="btndiv">
              <button className="btn-border" onClick={removeAll}>
                Remove All
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
