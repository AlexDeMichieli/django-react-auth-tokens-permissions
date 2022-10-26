import React from 'react';

function PostEntry({handleEntry, createPost}) {
    return (
        <div className="card">
            <div className="card-body">
                <input
                    onChange={(e) => handleEntry(e)}
                    name="title"
                    className="form-control form-control-lg mb-4"
                    type="text"
                    placeholder="enter the title"
                    defaultValue={""}
                />

                <textarea
                    onChange={(e) => handleEntry(e)}
                    name="text"
                    defaultValue={""}
                    className="form-control mb-4"
                    id="exampleFormControlTextarea1"
                    rows="3"
                />
                <input rows="3" className="form-control mb-4"
                    onChange={(e) => handleEntry(e)} 
                    name="date" type="date" id="start"
                    defaultValue={""}
                    min="2018-01-01" max="2050-12-31" />


                <button

                    type="button"
                    onClick={createPost}
                    className="btn btn-info m-2 "
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PostEntry;