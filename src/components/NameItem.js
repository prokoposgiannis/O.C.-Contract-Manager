import React, { useState } from 'react'
import {Modal, Button, Table, Form} from 'react-bootstrap/'
import { Trash, Pencil } from 'react-bootstrap-icons';
import { ipcRenderer } from 'electron'

const NameItem = ({ deleteName, name: { id, name, amoivi, idiotita, afm } }) => {
    const [show, setShow] = useState(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [editedName, setEditedName] = useState({name})
    // const [editedIdiotita, setEditedIdiotita] = useState({idiotita})
    const [editedAmoivi, setEditedAmoivi] = useState({amoivi})


    function nameUpdater() {

        if (name != editedName){
            let where = {
                id
            }
            let set = {
                'name' : `${editedName}`
            }
            
            // ipcRenderer.send('nameEdit:update', where, set)
        // } else if (idiotita != editedIdiotita){
        //     let where = {
        //         id
        //     }
        //     let set = {
        //         'idiotita' : editedIdiotita
        //     }
        //     ipcRenderer.send('nameEdit:update', where, set)
        // } else if (amoivi != editedAmoivi){
        //     let where = {
        //         id
        //     }
        //     let set = {
        //         'amoivi' : editedAmoivi
        //     }
            ipcRenderer.send('nameEdit:update', where, set)
        } else { }
        
        // handleClose()
    }



    return (
        <>
        <tr>
            <td>{name}</td>
            <td>{idiotita}</td>
            <td>{amoivi}</td>
            {/* <td>{idiotita}</td> */}
            {/* <td>{amoivi}</td> */}
            <td>
                <Button variant='outline-primary' size='sm' onClick={() => setShow(true)}><Pencil size={12} /></Button>
                <Button variant='outline-danger' size='sm' onClick={() => deleteName(id)}><Trash size={12} /></Button>
            </td>
        </tr>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Επεξεργασία στοιχείων</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <Table>
            <thead>
            <tr>
                <th>Όνομα</th>
                <th>Ιδιότητα</th>
                <th>Αμοιβη</th>
                {/* {alert.show && <th>Προσκλήσεις</th>} */}
                <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <Form.Control as='textarea' placeholder={name} onChange={(e) => setEditedName(e.target.value)}/>
            </td>
            
            <td>
                <Form.Control as='textarea' placeholder={idiotita} onChange={(e) => setEditedIdiotita(e.target.value)}/>
            </td>
            <td>
                <Form.Control as='textarea' placeholder={amoivi} onChange={(e) => setEditedAmoivi(e.target.value)}/>
            </td>
        </tr>
       </tbody>
        </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes 
            </Button>
          </Modal.Footer>
        </Modal>
        </>
        
    )
}

export default NameItem
