import { useState } from 'react'
import './Table.css'
import arrow from '../assets/arrow.svg'
import DataTable from './DataTable'

function Row(props: any) {
	const [open, setOpen] = useState(false)

	const setOpenRow = () => setOpen(!open)

  return (
    <>
		<tr onClick={setOpenRow} className='content_row'>
			<td className='show_more'>
				{props.hasChildren &&
					<img src={arrow} className={'arrow ' + (open ? 'open' : '')}/>
				}
			</td>
			{Object.entries(props.data).map(([i, value]: Array<any>) => 
				<td key={i}>
					{value}
				</td>
			)}
			<td> <span className='delete' onClick={event => props.handleDelete(event, props.i)}>X</span> </td>
		</tr>

		{props.hasChildren && open &&
			<tr>
				<td colSpan={Object.keys(props.data).length}>
					<DataTable data={props.children} />
				</td>
			</tr>
		}
	</>
  )
}

export default Row
