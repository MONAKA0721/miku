import { Button } from '@chakra-ui/react';
import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete';
import { useState } from "react";
import { Elements, Node } from "../@types/App";
import { getElements } from "./getElements";

type Props = {
    persons: Node<any>[] | []
    handleSearchButtonClick: (elements: Elements) => void
}

// export default function Search({ persons }: Props) {
//     const [target, setTarget] = useState<Node<any>>(null)

//     const handleTargetChange = (event: ChangeEvent<{}>, newTarget: Node<any>) => setTarget(newTarget)

//     return <div>
//         <Autocomplete
//             id="target"
//             value={target}
//             onChange={handleTargetChange}
//             options={persons}
//             getOptionLabel={(person: Node<any>) => person?.properties?.id || ''}
//             style={{ width: 300 }}
//             renderInput={(params) => (
//                 <TextField {...params} label="target" variant="outlined"/>
//             )}
//         />
//     </div>
// }

interface NodeItem extends Item {
  node: Node<any>
}

export default function Search({ persons, handleSearchButtonClick }: Props) {
  const [selectedItems, setSelectedItems] = useState<NodeItem[]>([]);

  const handleCreateItem = (item: NodeItem) => {
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: NodeItem[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <div>
      <CUIAutoComplete
        label="Choose preferred work locations"
        placeholder="Type a Country"
        onCreateItem={handleCreateItem}
        items={persons.map(person =>  {
          return {value: person!.properties.name, label: person!.properties.name, node: person}
        })}
        selectedItems={selectedItems}
        disableCreateItem={true}
        onSelectedItemsChange={(changes) =>
          handleSelectedItemsChange(changes.selectedItems)
        }
      />
      <Button onClick={async () => handleSearchButtonClick(await getElements(selectedItems[0].node))} variant={'outlined'}>
          search
      </Button>
    </div>
  );
}
