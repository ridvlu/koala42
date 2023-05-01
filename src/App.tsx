import json from './assets/data.json'
import DataTable from './table/DataTable'

function App() {

  return (
    <>
		<DataTable data={json} />
    </>
  )
}

export default App
