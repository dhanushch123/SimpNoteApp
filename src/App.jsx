import "./App.css";
import Fun from "./assets/Fun.png";
import Lock from "./assets/Lock.svg";
import NewNotes from "./NewNotes";
import { useState,useEffect } from "react";
import Send from './assets/Send.svg'
import Send1 from './assets/Send1.svg'
import Back from './assets/Back.svg'
function App() {
  const [select, setSelect] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("blue");
  const [create, setCreate] = useState(false);
  const [sf, setSf] = useState("");
  const [notes, setNotes] = useState([]);
  const[edit,setEdit] = useState(false);
  const[currentNote,setCurrent] = useState({name : "",color : "",sf : ""});
  const [selectedId, setSelectedId] = useState(null);
  const[text,setText] = useState("");
  const[mobile,setMobile] = useState(false);

  useEffect(()=>{
    if(window.innerWidth <= 440)
    {
      setMobile(true)
      console.log("Hi I am good")
    }
  },[])




  let notesList =  JSON.parse(localStorage.getItem(selectedId))


  const current = new Date();
  const date = current.toLocaleDateString()
  const time = current.toLocaleTimeString()


  return (
    <div className="container">
      {select && (
        <div className="NewNotes" style={{opacity : "1"}}>
          <NewNotes
            name={name}
            setName={setName}
            color={color}
            setColor={setColor}
            create={create}
            setCreate={setCreate}
            setSf={setSf}
            setNotes={setNotes}
            setSelect={setSelect}
          />
        </div>
      )}


      { !mobile || !edit ? (<div
        className="left"
        style={{
          backgroundColor: select ? "#2F2F2FBF" : "white",
          opacity: select ? 0.9 : 1
        }}
      >
        <div className="heading"> Pocket Notes </div>
        <div
          onClick={() => {
            setSelect(true);
            console.log("going to add element")
            
           
          }}
          className="add"
        >
         
          +
        </div>
        <div className="list"  >
          {notes && notes.length > 0
            ? notes.map((item) => {
                let unq = item[0] + item[1];
                return (
                  <div  onClick={()=>{
                    setEdit(true)
                    setCurrent({name : item[0],color : item[1],sf : item[2]})
                    // we will store notes corresponding to their name and color using local Storage
                    //console.log(unq);
                    
                    setSelectedId(unq)
                    console.log(mobile,edit)
                    
                     {/* backgroundColor: select ? "#2F2F2FBF"  #2F2F2FBF */}
                      
                  }} id={unq} key={item[0]} style={{backgroundColor : unq===selectedId?"#2F2F2F2B" : select ? "#2F2F2FBF":"white" ,borderRadius : unq===selectedId?"8px" : "0px",opacity: select ? 0.75 : 1 }}  className="entry">
                    <div className="round" style={{ backgroundColor: item[1] }}>
                
                      {item[2]}
                    </div>

                    <p> {item[0]} </p>
                  </div>
                );
              })
            : ""}
          
        </div>
      </div>) : ""}


      {!edit?  (<div
        className="right"
        style={{
          backgroundColor: select ? "#2F2F2FBF" : "#DAE5F5",
          opacity: select ? 0.9 : 1,
        }}
      >
        <img src={Fun} />
        <p className="head"> Pocket Notes </p>
        <div className="content">
          Send and receive messages without keeping your phone online.
        </div>
        <div className="content">
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </div>

        <p className="end">
       
          <img src={Lock} /> end-to-end encrypted
        </p>
      </div>) : (<div style={{opacity: select ? 0.7 : 1,backgroundColor: select ? "#2F2F2FBF" : "white"}} className="edit"> 


        <div className="top">


          {mobile? (<img onClick={()=>{
            setEdit(false);
            setSelectedId("")
          }} src={Back} />) : ""}

          <div className="round" style={{backgroundColor : currentNote.color,height : "40px",width : "40px"}} > {currentNote.sf} </div>
          <p> {currentNote.name} </p>
          
           </div>
        
        <div className="middle"> 

          {notesList ? notesList.map((item,index)=>{
            return (<div key={index} className="noteItem" > {item.content} 

            <div className="day"> <p> {item.dt} </p> 
            <div className="dot" > </div>
            <p> {item.t} </p>
            
            </div>
            
            </div>)

          }) : ""}
          
          
        </div>
        
        <div className="bottom">

        

        <textarea onChange={(e)=>{
          setText(e.target.value)
        }} value={text}  type="text" rows="5"
        cols="119" placeholder="Enter your text here............"/>
         <img onClick={()=>{
          // store notes in the local storage in arrays
          // we know selected id 

          let updatedEntry;

          if(localStorage.getItem(selectedId))
          {
            let arr = JSON.parse(localStorage.getItem(selectedId))
            updatedEntry = [...arr,{content : text,dt : date,t : time}];
          }
          else
          {
            updatedEntry = [{content : text,dt : date,t : time}];
          }
          localStorage.setItem(selectedId,JSON.stringify(updatedEntry));
          console.log(localStorage.getItem(selectedId))

          
       
          setText("");
         
         }} src={ text.length < 1 ? Send : Send1 }/>
          
        </div>
        
        
         </div>) }
    </div>
  );
}

export default App;                                                                                                                             



