import { PathSegment, QueryResult } from 'neo4j-driver';
import { Edge, Elements, Node } from "../@types/App";
import { createDriver } from "./createDriver";


export const getElements = async (target: Node<any>): Promise<Elements> => {
    const driver = await createDriver()

    const session = await driver.session()

    const elements: Elements = {
        nodes: [],
        edges: [],
    }

    const result: QueryResult | void = await session
        .run(
            target
                ? `MATCH p=(s)-[:FOLLOW *]->(e {id:$target}) RETURN p, s, e, ID(s) as sid, ID(e) as eid UNION MATCH p=(s {id:$target})-[:FOLLOW *]->(e) RETURN p, s, e, ID(s) as sid, ID(e) as eid`
                : `MATCH p=(s)-[:FOLLOW]->(e) RETURN p, s, e, ID(s) as sid, ID(e) as eid`,
            { target: target?.properties?.id }
        )
        .catch((error) => {
            console.log(error)
        })

    console.log(result);
    if (!result) {
        session.close()
        await driver.close()
        return elements
    }

    result.records.forEach((record) => {
        const path = record.get('p')
        const e = record.get('e')
        const isTargetEnd = target?.properties?.id === e.properties.id

        path.segments.forEach((segment: PathSegment<any>) => {
            const start: Node<any> | any = segment.start
            const startId = start.identity.toString()
            const startProperties = start.properties
            const end: Node<any> | any = segment.end
            const endId = end.identity.toString()
            const endProperties = end.properties

            const duplicate = elements.edges.find(
                (edge: Edge) =>
                    edge.data.source === startId && edge.data.target === endId
            )
            if (duplicate) {
                return
            }

            const color = (nodeId: string): string => {
                if (nodeId === target?.identity?.toString()) {
                    return '#ea4b4b'
                }
                if (!isTargetEnd) {
                    return '#95e76c'
                }
                return '#718ef8'
            }

            elements.nodes.push({
                data: {
                    id: startId,
                    name: startProperties?.name,
                    label: start.labels[0],
                    color: color(startId),
                },
            })
            elements.nodes.push({
                data: {
                    id: endId,
                    name: endProperties?.name,
                    label: end.labels[0],
                    color: color(endId),
                },
            })
            elements.edges.push({
                data: {
                    source: startId,
                    target: endId,
                    relationship: path.segments[0].relationship.type,
                },
            })
        })
    })

    session.close()
    await driver.close()

    return elements
}
