import React, { useState } from 'react'
import {Modal, Button, Table, Form} from 'react-bootstrap/'

const AddNameModal = () => {

    // { deleteName, name: { id, name, amoivi, idiotita, afm } }


    function addName(item) {
		if(item.name === '') {
			showAlert('Eισάγετε όνομα', 'danger')
			return false}
		else if(item.amoivi === '' && item.currency !== 'Αφιλοκερδώς'){
			showAlert('Eισάγετε αμοιβή', 'danger')
			return false
		}
		else {

			function findByProp(o, prop, val, retprop) {
				if(o==null) return false;
				if( o[prop] === val ){
					return (retprop) ? o[retprop] : o;
				}
				var result, p; 
				for (p in o) {
				if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
					result = findByProp(o[p], prop, val);
					if(result){
						return (retprop) ? result[retprop] : result;
					}
				}
				}
				return (retprop) ? result[retprop] : result;
			}
			{findByProp(musicians, "onomaon", `${item.name[0].onomaon}`) ?
			console.log("nai")
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			:setShow(true)}
			
			// ipcRenderer.send('places:add', { 'meros' : item.place[0].meros})
			
			// var PlacementForContract = {
			// 	'meros' : `${item.place[0].meros}`,
			// 	'date' : `${finalDate}`,
			// 	'time' : `${time}`
			// }
			
			// ipcRenderer.send('placesForContract:add', PlacementForContract)
			// ipcRenderer.send('article1:add', PlacementForContract)

				var musician = {
					'onomaait' : `${item.name[0].onomaait}`,
					'afm' : `${item.name[0].afm}`,
					'doy' : `${item.name[0].doy}`,
					'adt' : `${item.name[0].adt}`,
					'organo' : `${item.name[0].organo}`,
					'filo' : `${item.name[0].filo}`,
					'deltio' : `${item.name[0].deltio}`,
					'filo2' : `${item.name[0].filo2}`,
					'idiotita' : `${item.name[0].idiotita}`,
					'name' : `${item.name[0].onomaon}`,
					'currency' : `${item.currency}`,
					'invitations' : `${item.invs}`,
					'amoivi' : `${item.amoivi}`
				}
				ipcRenderer.send('names:add', musician )
		}
	}
    


    return (
        <>
            <Modal.Header>
                <Modal.Title>Εισαγωγή μουσικού</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Πλήρες όνομα</th>
                            <th>Πλήρες όνομα στην αιτιατική</th>
                            <th>φύλο</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{name}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{idiotita}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{amoivi}" onChange={(e) => {}}/>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Μουσική ιδιότητα</th>
                            <th>Μουσική ιδιότητα στην αιτιατική</th>
                            <th>Τύπος δελτίου</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{name}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{idiotita}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{amoivi}" onChange={(e) => {}}/>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>Αριθμός δελτίου</th>
                            <th>ΑΦΜ</th>
                            <th>ΔΟΥ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{name}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{idiotita}" onChange={(e) => {}}/>
                            </td>
                            <td>
                                <Form.Control as='textarea' rows='1' placeholder="{amoivi}" onChange={(e) => {}}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
                

        </>
        
    )
}

export default AddNameModal
