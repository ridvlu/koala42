import { useState } from 'react'
import './Table.css'
import _ from 'lodash'
import Row from './Row'

function DataTable(props :any) {
	const [table, setTable] = useState(props.data)

	const getHeaders = (data: any) => {
		return (
			Object.keys(data[0].data).map((item, i) => <th key={i}>{item}</th>)
		)
	}

	// funkce nalezená na internetu
	const findObject = (obj: Object, key: string|number): any => {
		if (_.has(obj, key))
			return obj;

		return _.flatten(_.map(obj, function(v: any) {
			return typeof v == "object" ? findObject(v, key) : [];
		}));
	}

	const getRows = (rows: any) => {
		return rows.map((row: any, i: number) => {

			const res = findObject(row.children, 'records')

			const hasChildren = (res[0]?.records.length > 0)

			return <Row key={i} i={i} data={row.data} children={res[0]?.records} hasChildren={hasChildren} handleDelete={handleDelete} />
		})
	}

	const handleDelete = (e: Event, key: number) => {
		e.stopPropagation();
		setTable((oldTable: any) => oldTable.filter((_: any, i: number) => i !== key))
	}


	if (table.length > 0) return (
		<table>
			<thead>
				<tr>
					<th className='show_more'></th>
					{getHeaders(table)}
					<th>Smazat</th>
				</tr>
			</thead>
			<tbody>
				{getRows(table)}
			</tbody>
		</table>
	  )
	else return <></>
}

export default DataTable
