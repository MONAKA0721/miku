import { useEffect, useState } from 'react';
import { Elements, Node } from "./packages/@types/App";
import Graph from './packages/Graph/Graph';
import { getAllPersons } from "./packages/Search/getAllPersons";
import Search from "./packages/Search/Search";

function App() {
  const [elements, setElements] = useState<Elements>({ nodes: [], edges: [] })
  const [persons, setPersons] = useState<Node<any>[] | []>([])

    useEffect(() => {
      (async () => setPersons(await getAllPersons()))()
    }, [])

    return (
      <div>
        <Search persons={persons} handleSearchButtonClick={(elements) => setElements(elements)}/>
       
        <Graph elements={elements}/>
      </div>
    )
}

export default App;
