import React, {useState, useRef, useEffect} from 'react';
import { TransitionGroup } from 'react-transition-group';
import Sheet from '../sheet/Sheet.js';
import './EditableBlock.css';

const EditableBlock = (props) => {
    const [html, updateHtml] = useState(props.html);
    const [lastKeyDown, updateLastKeyDown] = useState("First key!");
    const [showSheet, setShowSheet] = useState(false);
    const contentEditableRef = useRef();
    

    const cssClassName = props.type + " Block";
    
    useEffect(() => {
        if(props.focus){
            props.focusBlock({
                id: props.id,
                ref: contentEditableRef
            });
        }        
    }, [props]);
    const contentEditableChangeHandler = (event) => {
        updateHtml(event.target.value);
        props.updateBlock({html: event.target.value, id: props.id});
    }
    const onKeyDownHandler = (event) => {
        if(event.key === "/" && !showSheet){
            event.preventDefault();
            setShowSheet(true);
        }
        if(event.key === "/" && showSheet){
            event.preventDefault();
            setShowSheet(false);
        }
        if(event.key === "Enter" && lastKeyDown !== "Shift"){       
            event.preventDefault();
            var sameBlock = false;
            if(props.tag === "bullet" || props.tag === "numbered"){
                sameBlock = true;
            }
            props.addBlock({
                id: props.id,
                tag: props.tag,
                number: props.number
            }, sameBlock);            
        }
        
        if((event.key === "Backspace" || event.key === "Delete") && !contentEditableRef.current.innerHTML){
            event.preventDefault();
            props.deleteBlock({
                id: props.id,
                ref: contentEditableRef.current
            });
        }
        updateLastKeyDown(event.key);        
    }
    const deleteBlockHandler = (event) => {
        props.deleteBlock({
            id: props.id
        });
    }
    const sheetSelectHandler = (tag) => {
        props.addBlock({
            id: props.id,
            tag: tag,
        }, true);
        setShowSheet(false);
    }
    
    return (
        <div class = "Block-Container">  
            {props.tag === "numbered" && <span ContentEditable="false">{props.number}. </span>}       
            <div 
                onChange = {contentEditableChangeHandler}
                ref = {contentEditableRef}
                className = {cssClassName}
                onKeyDown = {onKeyDownHandler}
                ContentEditable = "true"
                placeholder = "Your text goes here..."
            >
                {props.tag === "bullet" && <li>{html}</li>}
                {(props.tag === "h1" || props.tag === "h2" || props.tag === "h3" || props.tag === "p") && html}    
            </div>

            {showSheet && 
                <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                        <Sheet onSelect = {sheetSelectHandler}/>
                
                </TransitionGroup>
            }
            {/* <button onClick = {deleteBlockHandler}>Del</button> */}
        </div>      
    );

};

export default EditableBlock;