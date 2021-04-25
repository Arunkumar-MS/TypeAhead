import React, { useCallback } from 'react';
import PostList from '../../post/postList';
import SearchBox from '../../common/searchBox';
import throttle from 'lodash.throttle';
import { getSearchResult } from '../../../service/search/getSearchResult';
import { mapSearchResult  } from '../../../mappers/searchResultMapper';
import { SearchResult } from '../../../mappers/searchResultMapperType';
import styles from './typeAheadSearch.module.scss';

const THROTTLE_LIMIT = 100;

const SearchContiner = () => {
    const [result, setResult] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState(null);

    const fetchNews = useCallback(throttle( async (query) => {
        const data = await getSearchResult<SearchResult[]>(query, mapSearchResult);
        setResult(data);
    }, THROTTLE_LIMIT), []);

    const onChangeHandler = (query) => {
        setSearchTerm(query);
        fetchNews(query);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Search Hacker News</div>
            <SearchBox onSearch={onChangeHandler} placeholder="Type here to start searching"  customClass={styles.searchBox}/>
            {searchTerm && <PostList items={result} />}
        </div>
    )
};

export { SearchContiner };
export default React.memo(SearchContiner);