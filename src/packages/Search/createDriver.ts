import neo4j from "neo4j-driver";
import { Driver } from "neo4j-driver/types/driver";

export const createDriver = async (): Promise<Driver> =>
    await neo4j.driver(
        process.env.REACT_APP_NEO4J_URL || '',
        neo4j.auth.basic(
            process.env.REACT_APP_NEO4J_USER || '',
            process.env.REACT_APP_NEO4J_PW || ''
        )
    )
