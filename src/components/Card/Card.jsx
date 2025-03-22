import styles from './Card.module.css';

function Card({image, onClick}) {
    let CSSSelectedStyle = image.isSelected && styles.selected

    return (
        <>
            <img
                className={`${styles.image} ${CSSSelectedStyle}`}
                key={image.key}
                alt={image.title}
                src={image.isSelected ? image.url : 'src/assets/question.svg'}
                onClick={onClick}
            />
        </>
    )
}

export default Card;