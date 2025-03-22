import styles from './Library.module.css'
import images from '../../data/images.json'
import Card from '../Card/index.js'
import {useState} from 'react'

const imagesNewField = images.map(image => image = {...image, isSelected: false, isPassed: false})

function Library() {
    const[libraryFirst, setLibraryFirst] = useState(imagesNewField)
    const[librarySecond, setLibrarySecond] = useState(imagesNewField)
    const[isSelectedFirst, setSelectedFirst] = useState(images[0])
    const[isSelectedSecond, setSelectedSecond] = useState(images[1])

    function checkPass() {
        if(isSelectedFirst.id === isSelectedSecond.id) {
            console.log("1")
            const newFirstImage = libraryFirst.map(image => {
                if(isSelectedFirst.id === image.id || isSelectedSecond.id === image.id) {
                    return {...image, isSelected: true, isPassed: true}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            })

            const newSecondImage = librarySecond.map(image => {
                if(isSelectedSecond.id === image.id || isSelectedFirst.id === image.id) {
                    return {...image, isSelected: true, isPassed: true}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            })

            setLibraryFirst(newFirstImage)
            setLibrarySecond(newSecondImage)
        } else {
            console.log("2")
            const newFirstImage = libraryFirst.map(image => {
                if(isSelectedFirst.id === image.id || isSelectedSecond.id === image.id) {
                    return {...image, isSelected: true, isPassed: false}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            })

            const newSecondImage = librarySecond.map(image => {
                if(isSelectedSecond.id === image.id || isSelectedFirst.id === image.id) {
                    return {...image, isSelected: true, isPassed: true}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            })

            setLibraryFirst(newFirstImage)
            setLibrarySecond(newSecondImage)
        }
    }

    function handleOnClickFirst(id) {
        const newImages = libraryFirst.map(image => {
            if(image.isPassed === false) {
                if(image.id === id) {
                    setSelectedFirst(image)
                    return {...image, isSelected: true, isPassed: false}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            } else {
                return {...image, isSelected: true, isPassed: true}
            }
        })

        setLibraryFirst(newImages)
        checkPass()
    }

    function handleOnClickSecond(id) {
        const newImages = librarySecond.map(image => {
            if(image.isPassed === false) {
                if(image.id === id) {
                    setSelectedSecond(image)
                    return {...image, isSelected: true, isPassed: false}
                } else {
                    return {...image, isSelected: false, isPassed: false}
                }
            } else {
                return {...image, isSelected: true, isPassed: true}
            }
        })

        setLibrarySecond(newImages)
        checkPass()
    }

    return (
        <>
            <div className={styles.library}>
                {
                    libraryFirst.map(image =>
                        <Card key={image.id} image={image} onClick={() => handleOnClickFirst(image.id)} />
                    )
                }
                {
                    librarySecond.map(image =>
                        <Card key={image.id} image={image} onClick={() => handleOnClickSecond(image.id)} />
                    )
                }
            </div>
        </>
    )
}

export default Library;