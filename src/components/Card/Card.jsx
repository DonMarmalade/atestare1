import styles from './Card.module.css';

function Card({image, onClick}) {
    let CSSSelectedStyle = image.isSelected && styles.selected
    let CSSPassedStyle = image.isPassed && styles.passed


    return (
        <>
            <img
                className={`${styles.image} ${CSSSelectedStyle} ${CSSPassedStyle}`}
                key={image.key}
                alt={image.title}
                src={image.isSelected ? image.url : 'src/assets/question.svg'}
                onClick={onClick}
            />
        </>
    )
}

export default Card;