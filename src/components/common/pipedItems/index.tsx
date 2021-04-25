import React from "react";
import styles from './pipedItems.module.scss';
import { Props } from './pipedItems';

const PipedItems = (props: Props) => {
    const renderItems = (item) => (<span key={item}>{item}</span>);
    return (
        <div className={styles.container}>
            {props.items.map(renderItems)}
        </div>
    )
};

export { PipedItems };
export default React.memo(PipedItems);