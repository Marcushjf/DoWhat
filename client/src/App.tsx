import React, { Fragment} from 'react';
import Room from './room/Room';

const App: React.FC = () => {
  // const [items, setItems] = useState<Item[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/items')
  //     .then((res) => res.json())
  //     .then((data:Item[]) => {
  //       setItems(data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // function renderItems() {
  //   return items.map((item: Item, i: number) => (
  //     <div key={i}>
  //       <h3>{item.name}</h3>
  //       <h3>{item.age}</h3>
  //     </div>
  //   ));
  // }

  return(
    <Fragment>
      <div className='h-100, w-100'>
        <Room/>
      </div>
    </Fragment>
  )
};

export default App;
