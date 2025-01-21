import React from 'react'
import styles from './assets/styles/NewNotes.module.css'


let hexcodes = {
  c1 : "#B38BFA",
  c2 : "#FF79F2",
  c3 : "#43E6FC",
  c4 : "#F19576",
  c5 : "#0047FF",
  c6 : "#6691FF"
}

function short(name)
  {
    if (name.trim().length === 0) {
      return ""; // Handle empty or all-whitespace strings
      }
    let res = name[0];
    
    for(let i = name.length-1;i>=0;i--)
    {
      if(name[i] === " " &&  name[i + 1])
      {
        res = res + name[i+1];
        break;
      }
    }
    
    return res.toUpperCase();
  }

function NewNotes(props) {
  
  return (
    <div className={styles.container} >

        <p> Create New Group </p>
        <div className={styles.color} >
            <p> Group Name</p>
            <form>
            <input name='Notename' onChange={(e)=>{
              props.setName(e.target.value);
              props.setSf(short(e.target.value))
            }} type="text" placeholder="Enter Group Name"/>
            </form>
        </div>
        <div className={styles.options}> 
            <p> Choose Color </p>
            <div className={styles.colors}  >
                <div onClick={()=>{
                  props.setColor(hexcodes.c1);
                  
                  
                  
                }} className={styles.c1} style={{border : props.color===hexcodes.c1? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box"  }} ></div>
                
                <div onClick={()=>{
                  props.setColor(hexcodes.c2);
                  
                }} className={styles.c2} style={{border : props.color===hexcodes.c2? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box"  }}></div>
                
                <div onClick={()=>{
                  props.setColor(hexcodes.c3);
                 
                }} className={styles.c3} style={{border : props.color===hexcodes.c3? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box"  }}></div>
                <div onClick={()=>{
                  props.setColor(hexcodes.c4);
                  
                }} className={styles.c4} style={{border : props.color===hexcodes.c4? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box"  }}></div>
                <div onClick={()=>{
                  props.setColor(hexcodes.c5);
                  
                }} className={styles.c5} style={{border : props.color===hexcodes.c5? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box"  }}></div>
                <div onClick={()=>{
                  props.setColor(hexcodes.c6);
                 
                }} className={styles.c6} style={{border : props.color===hexcodes.c6? "2.5px solid rgb(9, 233, 9)" : "none",boxSizing:"border-box" }}></div>
            </div>
        </div>

        <button onClick={()=>{
          props.setColor(true);
          props.setNotes((prev)=>{
            let n = props.name
            let color = props.color
            let sf = short(n);

            props.setNotes([...prev,[n,color,sf]])
            
            
            
          })
          props.setCreate(false);
          props.setSelect(false);
          console.log("notes created")
          
        }} > Create</button>
         
    </div>
  )
}

export default NewNotes