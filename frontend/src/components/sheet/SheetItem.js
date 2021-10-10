import React from 'react';
import './SheetItem.css'
const SheetItem = (props) => {
    const item = props.item;
    const onSelectHandler = (event) => {
        event.preventDefault();
        props.onSelect(item.tag);
    }
    let cssClassName = "sheet-item";
    if(props.selected){
        cssClassName += " Selected";
    }
    return (        
        <div onMouseOver = {() => props.onMouseOver(item.id)} className = {cssClassName} key = {item.id} onClick = {onSelectHandler}>
            <div className = "item-content">
                <div className = "item-content-image">
                    <img src = {item.thumbnail}></img>
                </div>                  
                <div className = "item-content-text">
                    <h4>{item.label}</h4>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>        
    );
};

export default SheetItem;