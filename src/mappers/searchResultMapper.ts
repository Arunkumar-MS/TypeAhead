import { ResponseData, Hit } from '../service/search/searchResult';
import { timeDifference } from '../helpers/timeDifference';
import { SearchResult } from './searchResultMapperType';

const mapSubtitle = (hit: Hit) => {
    const author = `Author: ${hit?._highlightResult?.author?.value}`;
    const numComments = hit.num_comments > 0 ? `${hit.num_comments} comments` : null;
    const createdAt = timeDifference(new Date(hit.created_at));
    return {
        hasMatch: hit?._highlightResult?.author?.matchLevel && hit?._highlightResult?.author?.matchLevel !== 'none',
        subtitles: [author, numComments, createdAt].filter((i) => i),
    };
}

const getTitle = (hit: Hit) => {
    if (hit?._highlightResult?.title?.matchLevel && hit?._highlightResult?.title?.matchLevel !== 'none') {
        return {
            hasMatch: true,
            value: hit?._highlightResult?.title?.value,
        };
    }
    if (hit?._highlightResult?.story_title?.matchLevel && hit?._highlightResult?.story_title?.matchLevel !== 'none') {
        return {
            hasMatch: true,
            value: hit?._highlightResult?.story_title?.value,
        };
    }

    return {
        hasMatch: false,
        value: hit?.story_title,
    };

}
const getUrl = (hit: Hit) => {
    if (hit?._highlightResult?.url?.matchLevel && hit?._highlightResult?.url?.matchLevel !== 'none') {
        return {
            hasMatch: hit?._highlightResult?.url?.matchLevel !== 'none',
            value: hit?._highlightResult?.url?.value,
        };
    }

    if (hit?._highlightResult?.story_url?.matchLevel && hit?._highlightResult?.story_url?.matchLevel !== 'none') {
        return {
            hasMatch: hit?._highlightResult?.story_url?.matchLevel !== 'none',
            value: hit?._highlightResult?.story_url?.value,
        };
    }

    return {
        hasMatch: false,
        value: hit?.story_url || hit?.url,
    };
}
const getDetails = (hit: Hit) => {
    if (hit?._highlightResult?.story_text?.value) {
        return {
            hasMatch: true,
            value: hit?._highlightResult?.story_text?.value,
        };
    }
    if (hit?._highlightResult?.comment_text?.value) {
        return {
            hasMatch: true,
            value: hit?._highlightResult?.comment_text?.value,
        };
    }

    if (!hit?.comment_text) {
        return undefined;
    }

    return {
        hasMatch: true,
        value: hit?.comment_text,
    };
}

const mapSearchResult = (response: ResponseData): SearchResult[] => {
    if (response?.hits) {
        const orderedHits = response?.hits.sort((a, b) => (b.relevancy_score || 0) - (a.relevancy_score || 0));
        const data = orderedHits.map((hit) => ({
            title: getTitle(hit),
            url: getUrl(hit),
            subtitle: mapSubtitle(hit),
            details: getDetails(hit),
        }));
        return data;
    }
    else {
        return [];
    }
};

export { mapSearchResult }