export interface Title {
    hasMatch: boolean;
    value: string;
}

export interface Url {
    hasMatch: boolean;
    value: string;
}

export interface Details {
    hasMatch: boolean;
    value: string;
}

export interface Subtitle {
    hasMatch: boolean;
    subtitles: string[];
}

export interface SearchResult {
    title: Title;
    url: Url;
    subtitle: Subtitle;
    details?: Details;
}


