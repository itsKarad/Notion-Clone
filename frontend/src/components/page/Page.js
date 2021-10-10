import React, {useState} from 'react';
import EditableBlock from '../block/EditableBlock';

import styles from './Page.module.css';
const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const fetchType = (tag) => {
    if(tag === "h1"){
        return "H1Block";
    }
    if(tag === "h2"){
        return "H2Block";
    }
    if(tag === "h3"){
        return "H3Block";
    }
    if(tag === "p"){
        return "TextBlock";
    }
    if(tag === "bullet"){
        return "BulletBlock";
    }
    if(tag === "numbered"){
        return "NumberedBlock"
    }
}
const fetchHTML = (tag) => {
    
    return "";
    
}
const DUMMY_BLOCKS = [
    {
      id: uid(),
      type: "H1Block",
      html: "Welcome to Notion-clone",
      tag: "h1",
      focus: false,
    }
];

const Page = (props) => {
    const [blocks, updateBlocks] = useState(DUMMY_BLOCKS);

    const updateBlockHandler = (block) => {

        const newBlocks = blocks.slice();
        for(var i=0; i<newBlocks.length;i++){
            if(newBlocks[i].id === block.id){
                newBlocks[i].html = block.html;
                break;
            }
        }
        updateBlocks(newBlocks);
    }
    const addBlockHandler = (block, sameBlock) => {
        let correctTag = "p";
        if(sameBlock){
            correctTag = block.tag;
        }       
        const blocksCopy = blocks.slice();
        const newBlock = {
            id: uid(),
            type: fetchType(correctTag),
            html: fetchHTML(correctTag),
            tag: correctTag,
            focus: true,
        }
        const index = blocksCopy.map((b) => b.id).indexOf(block.id);
        const newBlocks = [...blocksCopy];
        newBlocks.splice(index+1, 0, newBlock);
        //console.log(newBlocks);
        updateBlocks(newBlocks)
    }

    const deleteBlockHandler = (block) => {
        let newBlocks = blocks.slice();
        newBlocks = newBlocks.filter(b => b.id !==block.id);
        updateBlocks(newBlocks);       
    }

    const focusBlockHandler = (block) => {
        //console.log("Inside focusBlockHandler");
        block.ref.current.focus();
        block.ref.current.selectionStart = 2;
    }
    const pageContent = blocks.map((block) => {
        return <EditableBlock 
                id = {block.id}
                html = {block.html} 
                key = {block.id} 
                tag = {block.tag} 
                type = {block.type}
                focus = {block.focus}
                updateBlock = {updateBlockHandler}
                deleteBlock = {deleteBlockHandler}
                addBlock    = {addBlockHandler}
                focusBlock  = {focusBlockHandler}
            />
    });
    
    return (
        <div className = {styles["page-container"]}>
            {pageContent}
        </div>
    );
};

export default Page;
