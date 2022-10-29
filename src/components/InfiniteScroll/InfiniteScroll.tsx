import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import throttle from "../../utils/throttle";

type InfiniteScrollProps = {
    onBottomHit: () => void;
    isLoading: boolean;
    hasMoreData: boolean;
    loadOnMount: boolean;
    children: JSX.Element | JSX.Element[];
}


const Container = styled.div`
    max-height: 400px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #b9b9d4;;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #63639e;
        border-radius: 20px;
    }
    /* min-height: 600px; */
`;

function isBottom(ref: React.RefObject<HTMLDivElement>) {
    if(!ref.current) return false;
    return ref.current.scrollHeight - ref.current.scrollTop  === ref.current.clientHeight;
}

export const InfitieScroll: React.FC<InfiniteScrollProps> = ({onBottomHit, isLoading, hasMoreData, loadOnMount, children}) => {
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const contentRef = useRef<HTMLDivElement>(null);
    //Load after mounted
    useEffect( () => {
        if(loadOnMount && initialLoad) {
            onBottomHit();
            setInitialLoad(false);
        }
    }, [onBottomHit, loadOnMount, initialLoad])

    useEffect( () => {

        const onScroll = () => {
            if(!isLoading && hasMoreData && isBottom(contentRef)) {
                onBottomHit();
            }
        }
        contentRef.current?.addEventListener('scroll', throttle(onScroll, 350));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => contentRef.current?.removeEventListener('scroll', onScroll);
    }, [onBottomHit, isLoading, hasMoreData])

    return <Container ref={contentRef}>{children}</Container>
}