import styles from  './Divider.module.css';

function Divider({height, width, vertical}) {

    if (vertical) return  (
        <div class={styles.vertical} style={{"padding-inline": `${width}px`, height: `${height}px`, 'width': `${width}px`}}>
            <div class={styles.divider}></div>
        </div>
    );

    return (
        <div class={styles.container} style={{"padding-inline": `${width}px`, height: `${height}px`}}>
            <div class={styles.divider}></div>
        </div>
    );
}

export default Divider;
