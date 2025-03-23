import styles from './Library.module.css'
import images from '../../data/images.json'
import Card from '../Card/index.js'
import {useState} from 'react'

const newLibrary = images.map(image => image = {...image, isSelected: false, isPassed: false})

function Library() {
    const[libraryFirst, setLibraryFirst] = useState(newLibrary.sort(() => Math.random() - 0.5))
    const[librarySecond, setLibrarySecond] = useState(newLibrary.sort(() => Math.random() - 0.5))
    const[isPressed, setIsPressed] = useState(null)
    const[count, setCount] = useState(0)

    function timeOut(newImageFirst, newImageSecond, id) {
        const[newImageFirstPassed, newImageSecondPassed] = isPressedVerify(newImageFirst, newImageSecond, id)
        setTimeout(
            () => {
                const newImageFirstPassedSelected = newImageFirstPassed.map(image => {
                    if (image.isPassed === true) {
                        return {...image, isSelected: true}
                    } else {
                        return {...image, isSelected: false}
                    }
                })

                const newImageSecondPassedSelected = newImageSecondPassed.map(image => {
                    if (image.isPassed === true) {
                        return {...image, isSelected: true}
                    } else {
                        return {...image, isSelected: false}
                    }
                })

                setLibraryFirst(newImageFirstPassedSelected)
                setLibrarySecond(newImageSecondPassedSelected)
            }, 200
        )
    }

    function isPressedVerify(newImageFirst, newImageSecond, id) {
        let newImageFirstPassed = newImageFirst.map(image => {
            if (image.isPassed === false) {
                if (image.id === isPressed.id && image.id === id) {
                    return {...image, isPassed: true}
                } else {
                    return {...image, isPassed: false}
                }
            } else {
                return {...image, isPassed: true}
            }
            })

        let newImageSecondPassed = newImageSecond.map(image => {
            if (image.isPassed === false) {
                if (image.id === isPressed.id && image.id === id) {
                    return {...image, isPassed: true}
                } else {
                    return {...image, isPassed: false}
                }
            } else {
                return {...image, isPassed: true}
            }
            })
        setLibraryFirst(newImageFirstPassed)
        setLibrarySecond(newImageSecondPassed)

        return [newImageFirstPassed, newImageSecondPassed]
    }

    function handleOnClickFirst(id) {
        let newImageFirst = libraryFirst.map(image => {
            if (image.isPassed === false) {
                if (image.id === id) {
                    setIsPressed(image)
                    return {...image, isSelected: true}
                } else {
                    return {...image, isSelected: false}
                }
            } else {
                return {...image, isSelected: true}
            }
        })

        let newImageSecond = [...librarySecond]

        if(isPressed) {
            setCount(c => c + 1)
            timeOut(newImageFirst, newImageSecond, id)
            setIsPressed(null)
        } else {
            setLibraryFirst(newImageFirst)
        }
    }

    function handleOnClickSecond(id) {
        let newImageSecond = librarySecond.map(image => {
            if (image.isPassed === false) {
                if (image.id === id) {
                    setIsPressed(image)
                    return {...image, isSelected: true}
                } else {
                    return {...image, isSelected: false}
                }
            } else {
                return {...image, isSelected: true}
            }
        })

        let newImageFirst = [...libraryFirst]

        if(isPressed) {
            setCount(c => c + 1)
            timeOut(newImageFirst, newImageSecond, id)
            setIsPressed(null)
        } else {
            setLibrarySecond(newImageSecond)
        }
    }

    function handleVictory() {
        if (libraryFirst.find(image => image.isPassed === false) === undefined) {
            return (
                <div className={styles.victory}>
                    <h1>You Won!</h1>
                    <h1>You pressed: {count} times</h1>
                </div>
            )
        } else {
            return (
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
            )
        }
    }
    return (
        <>
            {
                handleVictory()
            }
        </>
    )
}

export default Library;