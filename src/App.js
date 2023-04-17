import React, { useEffect, useState } from "react";

const App=()=>{
let getMyData=()=>{
  let myList=localStorage.getItem("listOfItems");
  if(myList){
    return JSON.parse(localStorage.getItem("listOfItems"));
  }else{
    return [];
  }
}

let [inputs,setInputs]=useState("");
let [items,setItems]=useState(getMyData());
let [togglebtn,setTogglebtn]=useState(true);
let [editItem,setEditItem]=useState(null);

 let addItems=()=>{
  if(!inputs){
    alert("Add Something !")
  }else if(inputs && !togglebtn){
     setItems( 
        items.map((elem)=>{
        if(elem.id===editItem){
          return {...elem,name:inputs}
        }
        return elem;
      })
     )
  setTogglebtn(true);
  setInputs("");
  setEditItem(null);
  }else{
    let updatedItems={id:new Date().getTime().toString(), name:inputs}
    setItems([...items,updatedItems]);
    setInputs("");
  }
 }

 let deleteItems=(index)=>{
   let deletation=items.filter((ele)=>{
    return ele.id!==index;
   })
   setItems(deletation);
 }

 let editItems=(id)=>{
  let editation = items.find((elem)=>{
      return id===elem.id;
  })
  setTogglebtn(false);
  setInputs(editation.name);
  setEditItem(id);
 }
 
// set Data in local storage
//--> when items is updated then storing in local storage
//--> it is store in key & value pair but in string format
//-->here, listOfItems is a key and value item is store in string format

useEffect(()=>{
  localStorage.setItem("listOfItems",JSON.stringify(items))
},[items]);

return(
  <>
  <div className="main_div">
    <div className="center_div">
      <h1>To-Do App</h1>
   <input onChange={(e)=>{setInputs(e.target.value)}} value={inputs}/>

   {togglebtn?<button className="addbtn" onClick={addItems}>Add</button>:<button className="donebtn" onClick={addItems}>Done</button>}
    
   {
    items.map((elem)=>{
      return(
        <ol>
        <li key={elem.id}>{elem.name}
        <button className="deletebtn" onClick={()=>deleteItems(elem.id)}>Delete</button>
        <button className="editbtn" onClick={()=>editItems(elem.id)}>Edit</button>
        </li>
        </ol>
      )
    })
   }
   </div>
   </div>
  </>
)
}

export default App;
