import React from "react";
import styles from './searchBox.module.scss';
import { SearchBox as Props} from './searchBoxTypes';
import SearchIcon from '../../../svgs/searchIcon';

const SearchBox = (props: Props) => {

    const onChangeHandler = (event) => {
        const searchTerm = event.target.value;
        props.onSearch(searchTerm, event);
    }

    return (
        <div className={`${styles.searchBox} ${props.customClass}`}>
            <span className={styles.searchIcon}>
                <SearchIcon className={styles.searchIconStyle} height="20" width="20"/>
            </span>
            <input type="search" placeholder={props.placeholder} onChange={onChangeHandler} className={styles.searchInput} value={props.inputValue} />
        </div>
    )
};

export { SearchBox };
export default React.memo(SearchBox);