
import React from "react";
import PostItem from '../common/postItem';
import { SearchResult } from '../../mappers/searchResultMapperType';

interface Props {
    items: SearchResult[],
}

const PostList = React.memo((props: Props) => {

    return (
        <>
            {props.items.map((item, index) => <PostItem  {...item} key={`${item.title?.value} ${index}`} />)}
        </>
    )
})

export default PostList;
PostList.displayName = "PostList";