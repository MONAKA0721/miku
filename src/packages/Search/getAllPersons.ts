import { QueryResult } from "neo4j-driver";
import { Node } from "../@types/App";
import { createDriver } from "./createDriver";

export const getAllPersons = async (): Promise<Node<any>[]> => {
    const driver = await createDriver()
    const session = await driver.session()

    const result: QueryResult | void = await session
        .run('MATCH (n:Person) SET n.id = ID(n) RETURN n')
        .catch((error) => {
            console.log(error)
        })

    session.close()
    await driver.close()

    return result ? result.records?.map((record) => record.get('n')) : []
}
