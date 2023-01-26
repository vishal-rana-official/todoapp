import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //                                  ==>>>>>>>    function for fetching all notes

    const getNotes = async (title, description) => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {  //fetch function gives a promise which will resolved into a response later that's why we are using await 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json(); //response is entire http response and for extracting the json body content we use the .json() function which returns a promise for that we are using await
        console.log(json);
        setNotes(json);
    }

    //                                   ====>>>>>>>   function for adding a note

    const addNote = async (title, description) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description }) // body data type must match "Content-Type" header
        });
        const note = await response.json();

        setNotes(notes.concat(note));
    }

    //                                               =====>>>>>>>    function for delete a note

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json)

        const newnotes = notes.filter((note) => { return note._id !== id });
        setNotes(newnotes);
        console.log("deleting note with id: " + id)

    }

    //                                    ======>>>>>>>>>       function for edit a note

    const editNote = async (id, title, description) => {
        console.log(id)
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description }) 
        });
        const json = await response.json();
        console.log(json);
        let newnotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newnotes.length; index++) {
            if (id === newnotes[index]._id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                break;
            }
        }
        setNotes(newnotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children};
        </NoteContext.Provider>
    )

}

export default NoteState;