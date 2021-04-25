export interface SearchBox {
    onSearch: (string, Event?) => void;
    placeholder?: string;
    inputValue?: string;
    customClass?: string;
}