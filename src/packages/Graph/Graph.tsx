import React, { useEffect } from "react";
import { Elements } from "../@types/App";
import { renderGraph } from "./renderGraph";

type Props = {
    elements: Elements
}

export default function Graph({ elements }: Props) {
    const ELEMENT_ID_FOR_GRAPH = 'graph'

    useEffect(() => {
        renderGraph(ELEMENT_ID_FOR_GRAPH, elements)
    }, [elements])

    const cyStyle = {
        height: '80vh',
        width: '98vw',
    }

    return <div id={ELEMENT_ID_FOR_GRAPH} style={cyStyle}/>
}
