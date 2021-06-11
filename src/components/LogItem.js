import React from 'react'
import Button from 'react-bootstrap/Button'
import { Trash } from 'react-bootstrap-icons';

const LogItem = ({ deleteItem, log: { id, date, time } }) => {

    return (
        <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                <Button variant='outline-danger' size='sm' onClick={() => deleteItem(id)}><Trash size={12} /></Button>
            </td>
        </tr>
    )
}

export default LogItem

