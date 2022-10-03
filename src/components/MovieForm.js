import React, { useRef, useState } from 'react'

const MovieForm = () => {
    const titleRef = useRef();
    const textRef = useRef();
    const dateRef = useRef();

    function submitHandler(e) {
        e.preventDefault();
        console.log('dd');
        const NewMovieObj = {
            title: titleRef.current.value,
            text: textRef.current.value,
            date: new Date(dateRef.current.value)
        }
        console.log(NewMovieObj);

        titleRef.current.value = '';
        textRef.current.value = '';
        dateRef.current.value = '';



    }



    return (
        <section >
            <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', margin: '10px' }}>
                <label>Title</label>
                <input type='text' ref={titleRef} />



                <label>Opening text</label>
                <input type='text' ref={textRef} />
                <label>Release Date</label>
                <input type='text' ref={dateRef} />
                <button type='submit'> Add</button>
            </form>


        </section>
    )
}

export default MovieForm