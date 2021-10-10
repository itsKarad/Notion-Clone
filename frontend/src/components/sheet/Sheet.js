import React, {useState} from 'react';
import './Sheet.css';
import SheetItem from './SheetItem';


const allowedTags = [
    {
        id:"page-title",
        tag: "h1",
        label: "Page Title",
        thumbnail: "https://www.notion.so/images/blocks/header.57a7576a.png",
        description: "Large header."
    },
    {
        id:"heading",
        tag: "h2",
        label: "Heading",
        thumbnail: "https://www.notion.so/images/blocks/subheader.9aab4769.png",
        description: "Medium header."
    },
    {
        id:"subheading",
        tag: "h3",
        label: "Subheading",
        thumbnail: "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
        description: "Small header."
    },
    {
        id:"paragraph",
        tag: "p",
        label: "Paragraph",
        thumbnail: "https://www.notion.so/images/blocks/text.9fdb530b.png",
        description: "Start writing with plain text."
    },
    {
        id:"bullet",
        tag: "bullet",
        label: "Bullet Point",
        thumbnail: "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
        description: "Create a simple bullet point."
    },
];

const Sheet = (props) => {
    const [selectedItem, setSelectedItem] = useState(0);
    const onKeyDownHandler = (event) => {
        console.log(event.key);
    }
    const onSelectHandler = (tag) => {
        props.onSelect(tag);
    }
    const onMouseOverHandler = (id) => {
        const index = allowedTags.map(item => item.id).indexOf(id);
        setSelectedItem(index);
    }
    const checkerFunction = () => {
        console.log("WORKING!!");
    }
    const sheetContent = allowedTags.map((item) => {
        return (
            <SheetItem onMouseOver = {onMouseOverHandler} key = {item.id} item = {item} onSelect = {onSelectHandler} selected = {allowedTags[selectedItem].id === item.id}></SheetItem>
        );
    });
    return (
        <div className = "option-sheet" onKeyPress = {onKeyDownHandler}>
            <div className = "option-items">
                {sheetContent}
            </div>
        </div>
    
    )
};

export default Sheet;