import React, { useState, useRef, useEffect } from 'react'
import Select from "react-select"
import { Rnd } from "react-rnd";
import "./Custom.css"
import * as html2canvas from 'html2canvas';
import saveAs from "file-saver"
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Custom = () => {

    const drawingAreaRef = useRef();
    const shirtDesignRef = useRef();

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [shirt, setShirt] = useState(false);

    const history = useHistory();
    const alert = useAlert();
    var color = [
        { value: 1, label: "white" },
        { value: 2, label: "black" },
        { value: 3, label: "red" },
        { value: 4, label: "blue" },
        { value: 5, label: "yellow" },
        { value: 6, label: "green" },
        { value: 7, label: "orange" },
        { value: 8, label: "gray" },

    ]
    //thsirt colort changer
    const [first, setfirst] = useState(color.label)

    const [second, setSecond] = useState('')

    var changeHandler = e => {
        setfirst(e.label)
        if (e.label === "black") {
            setSecond("3")
        }
    }
    const designHandler = (event) => {
        const getuser = event.target.value
        setSecond(getuser)
    }

    const getPosition = (posX, posY) => {
        // X < 452 not allowed X > 679 
        // Y > 206 not allowed Y > 573
        setX(posX);
        setY(posY);
        console.log(posY);
    }

    // Get width and height of drawing area 
    useEffect(() => {
        getPosition();
    }, []);

    function refresh() {
        window.location.reload();
    }
    const submit = (id) => {
        if (second === '2') { document.getElementById("one").style.border = "none"; }
        else if (second === '3') { document.getElementById("two").style.border = "none"; }
        else if (second === '4') { document.getElementById("three").style.border = "none"; }
        else if (second === '5') { document.getElementById("four").style.border = "none"; }
        else if (second === '6') { document.getElementById("five").style.border = "none"; }


        html2canvas(document.getElementById("tshirt-div")).then(function (canvas) {
            if (x < 452 || x > 595) {
                alert.error('Please fix the position of the design');
            } else if (y < 220 || y > 563) {
                alert.error('Please fix the position of the design');
            } else {
                html2canvas(document.getElementById("tshirt-div")).then(function (canvas) {
                    const image = canvas.toDataURL("image/jpeg");
                    const dataURI = image;
                    saveAs(dataURI, 'Design.png');

                    if (second === '2') { document.getElementById("one").style.border = "1px solid black"; }
                    else if (second === '3') { document.getElementById("two").style.border = "1px solid black"; }
                    else if (second === '4') { document.getElementById("three").style.border = "1px solid black"; }
                    else if (second === '5') { document.getElementById("four").style.border = "1px solid black"; }
                    else if (second === '6') { document.getElementById("five").style.border = "1px solid black"; }
                    if (!shirt) {
                        setShirt(true);
                    } else {
                        history.push('/upload/design');
                    }
                });
            }
        });
    }
    return (
        <div className='containerForCustom'>
            <style>{`#tshirt-div{background-color:${first};}`}</style>
            <div id="tshirt-div">
                <div className={!shirt ? "tshirt-backgroundpicture" : "tshirt-back"}></div>
                <div id="drawingArea" className="drawing-area" ref={drawingAreaRef}>
                    {second === '2' && (<Rnd onDrag={(e) => getPosition(e.x, e.y)} default={{ x: 35, y: 100, width: 220, height: 100, }} id="one" className="one" ref={shirtDesignRef}></Rnd>)}
                    {second === '3' && (<Rnd onDrag={(e) => getPosition(e.x, e.y)} default={{ x: 35, y: 100, width: 220, height: 100, }} id="two" className="two" ref={shirtDesignRef}></Rnd>)}
                    {second === '4' && (<Rnd onDrag={(e) => getPosition(e.x, e.y)} default={{ x: 35, y: 100, width: 220, height: 100, }} id="three" className="three" ref={shirtDesignRef}></Rnd>)}
                    {second === '5' && (<Rnd onDrag={(e) => getPosition(e.x, e.y)} default={{ x: 35, y: 100, width: 220, height: 100, }} id="four" className="four" ref={shirtDesignRef}></Rnd>)}
                    {second === '6' && (<Rnd onDrag={(e) => getPosition(e.x, e.y)} default={{ x: 35, y: 100, width: 220, height: 100, }} id="five" className="five" ref={shirtDesignRef}></Rnd>)}
                </div>
            </div>

            <div className="settings">
                <label htmlFor="tshirt-design">T-Shirt Design:</label>
                <select onChange={(e) => (designHandler(e))} value={second}>
                    <option hidden>Choose a Design</option>
                    <option value="2" disabled={first === "black" ? true : false}>Design 1</option>
                    <option value="3">Design 2</option>
                    <option value="4">Design 3</option>
                    <option value="5">Design 4</option>
                    <option value="6">Design 5</option>
                </select>
                <label htmlFor="tshirt-color">T-Shirt Color:</label>
                <Select options={color} onChange={(e) => (changeHandler(e))}></Select>
                <button className="button" onClick={submit}>Save Custom</button>
                <button className="button" onClick={refresh}>Reset</button>
                <button onClick={() => setShirt(!shirt)} className="back-shirt-btn">{shirt ? 'Design Back' : 'Design Front'}</button>
                <div id='output'></div>
            </div>

        </div >
    )
}

export default Custom