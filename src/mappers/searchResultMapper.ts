import { ResponseData, Hit } from '../service/search/searchResult';
import { timeDifference } from '../helpers/timeDifference';
import { SearchResult } from './searchResultMapperType';

const mapSubtitle = (hit: Hit) => {
    const author = `Author: ${hit?._highlightResult?.author?.value}`;
    const numComments = hit.num_comments > 0 ? `${hit.num_comments} comments` : null;
    const createdAt = timeDifference(new Date(hit.created_at));
    return {
        hasMatch: hit?._highlightResult?.author?.matchLevel !== 'none',
        subtitles: [author, numComments, createdAt].filter((i)=>i),
    };
}

const mapSearchResult = (response: ResponseData): SearchResult[] => {
    if (response?.hits) {
        const data = response.hits.map((hit) => ({

            title: {
                hasMatch: hit?._highlightResult?.title?.matchLevel !== 'none',
                value: hit?._highlightResult?.title?.value
            },
            url: {
                hasMatch: hit?._highlightResult?.url?.matchLevel !== 'none',
                value: hit?._highlightResult?.url?.value,
            },
            subtitle: mapSubtitle(hit),
            details: hit?._highlightResult?.story_text?.value ? { hasMatch: hit?._highlightResult?.story_text?.matchLevel !== 'none', value: hit?._highlightResult?.story_text?.value } : undefined,
        }));
        return data;
    }
    else {
        return [];
    }
};

export { mapSearchResult }