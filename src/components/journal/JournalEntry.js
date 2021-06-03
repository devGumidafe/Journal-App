import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://i.picsum.photos/id/901/200/300.jpg?hmac=hkPEpuBNrCAj1u5K7KgiXGa6ToLCG2iG5C99wLLEdKo)'
                }}
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal-entry-title">
                    Un nuevo día
                </p>
                <p className="journal-entry-content">
                    lorem ipsum dolor sit amet, consectet
                </p>
            </div>

            <div className="journal__entry-date-box" >
            <span>Monday</span>
            <h4>28</h4>
            </div>

        </div>
    )
}
