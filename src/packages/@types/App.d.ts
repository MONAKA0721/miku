import { Node as Neo4jNode } from 'neo4j-driver'

export type Node<T> =
  | (Neo4jNode<T> & {
      properties: { id: string; name: string; label: string; color: string }
    })
  | null

export type Edge = {
  data: { source: string; target: string; relationship: string }
}

export type Elements = {
  nodes: { data: Node['properties'] }[]
  edges: Edge[]
}
