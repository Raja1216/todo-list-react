import React, { useEffect, useState } from 'react'
import "./style.css"
//Get Data From localStorage

const getLocalStorageData = () =>{
     const localList = localStorage.getItem('todoList'); 
     if (localList) {
        return JSON.parse(localList); 
     }
     else
     return [];    
};
   const TodoList = () => {
    const [addData, setAddData] = useState("");
    const [items, setItems] = useState(getLocalStorageData());
    const [isEditItem, setisEditItem] = useState("");
    const [togolBtn, setTogolBtn] = useState(false);

    //Add item function 
    const addItem = () =>{
        if (!addData) {
            alert("Please select a data item");
        }
        else if (addData && togolBtn){
            setItems(
                items.map( (curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: addData}
                    }
                    else
                    return curElem;
                })
            )
          setAddData([]);
          setisEditItem();
          setTogolBtn(false);
        }
        else{
            const newAddData = {
                id: new Date().getTime().toString(),
                name:addData,    
            };
            setItems([...items, newAddData]);  
            setAddData("");
        }
    };

     //Edit item function
     const editItem = (edId) =>{
        const editItemData = items.find( (cItem) => {
            return cItem.id === edId;
          });
          setAddData(editItemData.name);
          setisEditItem(edId);
          setTogolBtn(true);
    };

    //Delete item function
    const deleteItem = (dltId) =>{
        const updatedItems = items.filter( (cItem) => {
          return cItem.id !== dltId;
        });
        setItems(updatedItems); 
    };

    //Remove All function
    const removeAll = () => {
        setItems([]); 
    }

    //Add Data in localStorage [when items value will be updated then useefect will run]
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(items))
    }, [items]);


  return (
    <>
    <div className='main-div'>
        <div className="child-div">
            <figure>
                <img src="images/todo.svg" alt="todologo" />
                <figcaption>Add Your List Here ✌</figcaption>
            </figure>
            <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={ addData}
              onChange={(e) =>setAddData(e.target.value)}
            />
            {togolBtn ?<i className="far fa-edit" onClick={addItem}></i>:  <i className="fa fa-plus" onClick={addItem}></i>}
           
           </div>
           {/* Show added item */}
           <div className="showItems">
            {
                items.map( (curElem) =>{
                    return(
              <div className="eachItem" key={curElem.id}>  
              <h3>{curElem.name}</h3>
              <div className="todo-btn">
              <i className="far fa-edit" onClick={() => editItem(curElem.id)}></i>
              <i className="far fa-trash-alt" onClick={() => deleteItem(curElem.id)}></i>
              </div>  
            </div>
                    )
                })
            }
           </div>
           {/* Buttons */}
           <div className="showItems">
           <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
            <span>Check List</span>
           </button>
           </div> 
        </div>
        </div>
    </>
  )
}

export default TodoList