import { get } from '../core/get';
import { ResponseData } from './searchResult';

const RESULT_COUNT_PER_SEARCH = 10;
const Base_URL = 'https://hn.algolia.com/api/v1/search?';

const getSearchResult = async <T>(searchTerm: string, mapper: (ResponseData) => T, count?: number) => {
    if (!searchTerm) {
        return [];
    }
    try {
        const respose = await get<ResponseData>(`${Base_URL}query=${searchTerm}&hitsPerPage=${count || RESULT_COUNT_PER_SEARCH}`);
        return mapper(respose);
    }
    catch {
        return [];
    };
}

export { getSearchResult };


