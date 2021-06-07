import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ ...props }) => {

    const dispatch = useDispatch();
    const noteDate = moment(props.date);

    const handleEntryClick = () => {
        dispatch(
            activeNote(props.id, {
                ...props
            })
        );
    }

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeInRight"
            onClick={handleEntryClick}
        >
            {
                (props.url)
                &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${props.url})`
                    }}
                >
                </div>
            }

            <div className="journal__entry-body">
                <p className="journal-entry-title">
                    {props.title}
                </p>
                <p className="journal-entry-content">
                    {props.body}
                </p>
            </div>

            <div className="journal__entry-date-box" >
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('D')}</h4>
            </div>
        </div>
    )
}
