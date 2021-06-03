import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happend today?"
                    className="notes__textarea"
                >
                </textarea>

                <div className="notes__image">
                    <img
                        src="https://i.picsum.photos/id/469/1000/300.jpg?hmac=8R4324LxwdbRljQKnG6Tm1b7358WcZeL6oSjh-hFgKA"
                        alt="imagen"
                    />
                </div>
            </div>
        </div>
    )
}
