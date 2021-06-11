import React from 'react'
import Button from 'react-bootstrap/Button'
import { Trash } from 'react-bootstrap-icons';

const OpusItem = ({ deleteOpus, opus: { id, ΣΥΝΘΕΤΗΣ, ΕΡΓΟ } }) => {

    return (
        <tr>
            <td>{ΣΥΝΘΕΤΗΣ}</td>
            <td>{'>'}</td>
            <td>{ΕΡΓΟ}</td>
            <td>
                <Button variant='outline-danger' size='sm' onClick={() => deleteOpus(id)}><Trash size={12} /></Button>
            </td>
        </tr>
    )
}

export default OpusItem

