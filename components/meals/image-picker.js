'use client'
import React, { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
  const imageInput = useRef();

  const [pickImage, setPickImage] = useState()

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    // if (!file) return;


    // const fileReader = new FileReader();

    // fileReader.onload = () => {
    //   setPickImage(fileReader.result);
    // };

    // fileReader.readAsDataURL(file);
    if (file) {
      setPickImage(URL.createObjectURL(file));
    } else {
      setPickImage(null);
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickImage && <p>No image picked yet.</p>}
          {pickImage && (
            <Image src={pickImage} alt="picked image" fill />
          )}
        </div>

        <input
          className={classes.input}
          type="file"
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type='button' onClick={handlePickClick}>Pick and Image</button>
      </div>
    </div>
  )
}

export default ImagePicker
