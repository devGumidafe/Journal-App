import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startNewNote = () => {
    return async (dispatch, getState) => {

        // Obtenemos el uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(docRef.id, newNote));
        
        dispatch(addNewNote(docRef.id, newNote));
    }
}

export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addNewNote = (id, note) => {
    return {
        type: types.notesAddNew,
        payload: {
            id, ...note
        }
    }
}

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    notesSnap.forEach(note => {
        notes.push({
            id: note.id,
            ...note.data()
        })
    });

    return notes;
}

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, note));

        Swal.fire('Save', note.title, 'success');
    }
}

export const refreshNote = (id, note) => {
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note
        }
    }
}

export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/gumi-cloud/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }

}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout = () => {
    return {
        type: types.notesLogoutCleaning
    }
}