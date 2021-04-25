import React from "react";
import PipedItems from '../pipedItems';
import styles from './postItem.module.scss';
import parse from 'html-react-parser';
import { SearchResult } from '../../../mappers/searchResultMapperType';

const PostItem = (props: SearchResult) => {

    const renderTitle = React.useMemo(() => {
        if (!props?.title?.value) {
            return null;
        }
        if (props.title.hasMatch) {
            return parse(props.title.value);
        }
        return props.title.value;
    }, [props.title]);

    const subTitles = React.useMemo(() => {
        if (!props.subtitle) {
            return null;
        }
        if (props.subtitle.hasMatch) {
            return props.subtitle.subtitles.map(item => parse(item));
        }
        return props.subtitle.subtitles;
    }, [props.subtitle]);

    const renderUrl = React.useMemo(() => {
        if (!props?.url?.value) {
            return null
        }
        if (props.url.hasMatch) {
            return parse(props.url.value);
        }
        return props.url.value;
    }, [props.url?.value]);

    const renderDetails = React.useMemo(() => {
        if (!props?.details?.value) {
            return null;
        }
        if (props.details?.hasMatch) {
            return parse(props.details.value);
        }
        return props.details?.value;
    }, [props.details?.value]);

    if (!renderTitle) {
        return null;
    }

    return (
        <div className={styles.container} >
            <div>
                <span>
                    {renderTitle}
                </span>
                {renderUrl && <span className={styles.urlInfo}>
                    ({renderUrl})
                </span>}
            </div>
            <div className={renderDetails ? styles.subtitle : null}>
                {<PipedItems items={subTitles} />}
            </div>
            {renderDetails && <div className={styles.description}>
                {renderDetails}
            </div>}
        </div>
    )
}

PostItem.displayName = "PostItem";
export default React.memo(PostItem);