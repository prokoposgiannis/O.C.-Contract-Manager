import React, { useState, useEffect } from 'react'
import { Container, Row, Alert, Col, Modal, Button, Table, Form, FormControl } from 'react-bootstrap'
import { ipcRenderer } from 'electron'

const db = require('electron-db')
const fs = require('fs');
const path = require('path')

import BasicInfo from './BasicInfoBlock'
import NameItem from './NameItem' 
import RehersalInfo from './RehersalInfoBlock'
import LogItem from './LogItem' 
import OpusItem from './OpusItem' 

const App = () => {
	const [musicians, setMusicians] = useState([])
	const [opusesData, setOpusesData] = useState([])
	const [opuses, setOpuses] = useState([])
	const [article1, setArticle1] = useState([])
	const [article1Preview, setArticle1Preview] = useState([])
	const [logs, setLogs] = useState([])
	const [places, setPlaces] = useState([])
	const [placesForContract, setPlacesForContract] = useState('')
	const [names, setNames] = useState([])
	const [alert, setAlert] = useState([])

	const [onomaonADD, setOnomaonADD] = useState('')
    const [onomaaitADD, setOnomaaitADD] = useState('')
	const [filoADD, setFiloADD] = useState('Άντρας')
    const [afmADD, setAfmADD] = useState('')
    const [doyADD, setDoyADD] = useState('')
    const [deltioADD, setDeltioADD] = useState('ΑΔΤ')
	const [arithmosADD, setArithmosADD] = useState('')
    const [idiotitaADD, setIdiotitaADD] = useState('')
    const [idiotitaaitADD, setIdiotitaaitADD] = useState('')

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

	useEffect(() => {
		ipcRenderer.send('logs:load')
		ipcRenderer.send('names:load')
		ipcRenderer.send('musicians:load')
		ipcRenderer.send('places:load')
		ipcRenderer.send('opuses:load')
		ipcRenderer.send('opusesData:load')
		ipcRenderer.send('placesForContract:load')
		ipcRenderer.send('article1:load')
		ipcRenderer.send('article1Preview:load')
		

		ipcRenderer.on('logs:get', (e, logs) => {
			setLogs(logs)
		})

		ipcRenderer.on('opuses:get', (e, opuses) => {
			setOpuses(opuses)
		})

		ipcRenderer.on('article1:get', (e, article1) => {
			setArticle1(article1)
		})

		ipcRenderer.on('article1Preview:get', (e, article1Preview) => {
			setArticle1Preview(article1Preview)
		})

		ipcRenderer.on('names:get', (e, names) => {
			setNames(names)
		})
		ipcRenderer.on('musicians:get', (e, musicians) => {
			setMusicians(musicians)
		})
		ipcRenderer.on('opusesData:get', (e, opusesData) => {
			setOpusesData(opusesData)
		})
		ipcRenderer.on('places:get', (e, places) => {
			setPlaces(places)
		})

		ipcRenderer.on('placesForContract:get', (e, places) => {
			setPlacesForContract(places)
		})

		ipcRenderer.on('logs:clear', () => {
			setLogs([])
			showAlert('Διαγράφτηκαν')
		})
		ipcRenderer.on('names:clear', () => {
			setNames([])
			showAlert('Διαγράφτηκαν')
		})
	}, [])
		

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

			if (findByProp(musicians, "onomaon", `${item.name[0].onomaon}`)) {
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

				ipcRenderer.send('names:add', musician)
			} else {
				handleShow()
			}
		}
	}
	

	function addOpus(item) {


		// 'Τίτλος συναυλίας' 
        // 'Συνθέτης και έργο' 
        // 'Χωρίς επισήμανση έργου' opusStyle
		if(item.opusStyle == 'Συνθέτης και έργο') {

			var opus = {
				'ΣΥΝΘΕΤΗΣ' : `${item.opuses[0].ΣΥΝΘΕΤΗΣ}`,
				'id' : `${item.opuses[0].id}`,
				'ΕΡΓΟ' : `${item.opuses[0].ΕΡΓΟ}`}

			ipcRenderer.send('opuses:add', opus )

		} else  {
			// console.log(item.opuses)
			db.count('article1', (path.join(process.cwd(), './config/datasets/')), (succ, data) => {

			if (succ) {
				if (data < 0 ) {}
				else {

					db.getAll('article1', (path.join(process.cwd(), './config/datasets/')), (succ, data) => {

						let where = {
							"A1OpusType": `${data[0].A1OpusType}`
						}
						let set = {
							"A1OpusType": `, ${item.opuses}`
						}
						
						ipcRenderer.send('article1:update', where, set)	
					})				
				}

			} else { console.log(succ, '-- error Article1 updater --')}
		})

	}
}


	function addPlacesForContract(item) {
		if (item.conDate === '' || item.place === '') {
			showAlert('Eπιλέξτε ημερομηνία και τοποθεσία', 'danger')
			return false }
		else {

			db.count('article1', (path.join(process.cwd(), './config/datasets/')), (succ, data) => {
				if (succ) {
					if (data > 0 ) {}
					else {

						db.getAll('article1ForData', (path.join(process.cwd(), './config/datasets/')), (succ, data) => {

							var item = {
								"A1Intro": `${data[0].A1Intro}`, 
								"A1Type": `${data[0].A1Type}`, 
								"A1Date": `${data[0].A1Date}`, 
								"A1Idiotita": `${data[0].A1Idiotita}`, 
								"A1OpusType": `${data[0].A1OpusType}`
							}
		
							ipcRenderer.send('article1:add', item)
						})
					}

				} else { console.log(succ, '-- error Article1 count --')}
			})

			const months = {
				'01':' Ιανουαρίου ', '02':' Φεβρουαρίου ', '03':' Μαρτίου ',
				'04':' Απριλίου ', '05':' Μαΐου ', '06':' Iουνίου ',
				'07':' Ιουλίου ', '08':' Aυγούστου ', '09':' Σεπτεμβρίου ',
				'10':' Οκτωβρίου ', '11':' Νοεμβρίου ', '12':' Δεκεμβρίου '
				}
			
			const days = {
				'01':'την 1η', '02':'τη 2η', '03':'την 3η', '04':'την 4η', '05':'την 5η', '06η':'την 6η',
				'07':'την 7η', '08':'την 8η', '09':'την 9η', '10':'τη 10η', '11':'την 11η', '12η':'τη 12η',
				'13':'τη 13η', '14':'τη 14η', '15':'τη 15η', '16':'τη 16η', '17':'τη 17', '18η':'τη 18η',
				'19':'τη 19η', '20':'την 20η', '21':'την 21η', '22':'την 22η', '23':'την 23η', '24η':'την 24η',
				'25':'την 25η', '26':'την 26η', '27':'την 27η', '28':'την 28η', '29':'την 29η', '30η':'την 30η', '31η':'την 31η'
				} 
			
			var Day0 = item.conDate.split("T")[0].split("-")[2]
			var Day = days[Day0]
			var Month0 = item.conDate.split("-")[1]
			var Month = months[Month0]
			var Year = item.conDate.split("-")[0]
			var finalDate = Day + Month + Year


			var time = item.conDate.split("T")[1]


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
			findByProp(places, "meros", `${item.place[0].meros}`) ?
			{}:ipcRenderer.send('places:add', { 'meros' : item.place[0].meros})

			var PlacementForContract = {
				'meros' : `${item.place[0].meros}`,
				'date' : `${finalDate}`,
				'time' : `${time}`
			}

			ipcRenderer.send('placesForContract:add', PlacementForContract)
			ipcRenderer.send('article1:add', PlacementForContract)
		}
	}


	
	function addRehersal(item) {
		if(item.date === '' || item.startTime === '' || item.endTime === '') {
			showAlert('Eπιλέξτε ημερομηνία και ώρα', 'danger')
			return false}
		else {
			var Month = item.date.split("-")[1]
			var Day = item.date.split("-")[2]
			var finalDate = Day + '/' + Month
			
			if (logs.length > 0 && finalDate == logs[logs.length - 1].date) {
					var finalTime = item.startTime + ' - ' + item.endTime
					let where = {
						"id": Number(`${logs[logs.length - 1].id}`)
					}
					let set = {
						"time": `${logs[logs.length - 1].time} και ${finalTime}`
					}
					ipcRenderer.send('logs:update', where, set)	
			} else {
				var finalTime = item.startTime + ' - ' + item.endTime
				item.date = finalDate
				item.time = finalTime
				ipcRenderer.send('logs:add', item)
				
			} 
		}	
	}
		
	
	const nameTable = names.map((name) => (
		<NameItem key={name.id} name={name} deleteName={deleteName} />
	))

	
	const rehTable = logs.map((log) => (
		<LogItem key={log.id} log={log} deleteItem={deleteItem} />
	))

	const opusTable = opuses.map((opus) => (
		<OpusItem key={opus.id} opus={opus} deleteOpus={deleteOpus} />
	))
	

	function showAlert(message, variant = 'success', seconds = 2000) {
		setAlert({
			show: true,
			message,
			variant
		})

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success'
			})
		}, seconds)
	}

	
	function deleteName(id) {
		ipcRenderer.send('name:delete', id)
	}

	function deleteOpus(id) {
		ipcRenderer.send('opus:delete', id)
	}

	function deletePlaceForContract(id) {
		ipcRenderer.send('placeForContract:delete', id)
	}

	function deleteItem(id) {
		ipcRenderer.send('logs:delete', id)
	}

	
    function previewRefresh() {		
		db.getAll('article1', (path.join(process.cwd(), './config/datasets/')), (succ, data) => {

			if (data[1]){

				if (data.length < 3) {
					ipcRenderer.send('article1Preview:delete')
					var item = data[0].A1Intro + data[0].A1Type + data[1].date + " " + data[1].meros +
					data[0].A1Date + data[1].time + data[0].A1Idiotita + "-μουσική ιδιότητα-" + data[0].A1OpusType
					ipcRenderer.send('article1Preview:add', item)
				} else {
					ipcRenderer.send('article1Preview:delete')
					var item = data[0].A1Intro + data[0].A1Type + data[1].date + " " + data[1].meros +
					data[0].A1Date + data[1].time + " καθώς και " +
					data[2].date + " " + data[2].meros + " " +
					data[0].A1Date + data[2].time +
					data[0].A1Idiotita + "-μουσική ιδιότητα-" + data[0].A1OpusType
					ipcRenderer.send('article1Preview:add', item)
				}
			} else {
				try {
					ipcRenderer.send('article1Preview:delete')
				} finally { return false }
			}
    	})
	}

	function tocon () {

		if (onomaonADD === '' || onomaaitADD === '' || filoADD === '' || afmADD === '' || doyADD === '' || deltioADD === '' || arithmosADD === '' || idiotitaADD === '' || idiotitaaitADD === '') {
			showAlert('Όλα τα πεδία είναι υποχρεωτικά', 'danger')
			return false }
		
		else {

			var filo1
			var filo2

			filoADD == 'Άντρας' ?
			filo1 = "του" : filo1 = "της"

			filoADD == 'Άντρας' ?
			filo2 = "ο οποίος" : filo2 = "η οποία"

			var musician = {
				'onomaon' : `${onomaonADD}`,
				'onomaait' : `${onomaaitADD.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`,
				'afm' : `${afmADD}`,
				'doy' : `${doyADD}`,
				'adt' : `${arithmosADD.toUpperCase()}`,
				'organo' : `${idiotitaADD}`,
				'filo' : `${filo1}`,
				'deltio' : `${deltioADD}`,
				'filo2' : `${filo2}`,
				'idiotita' : `${idiotitaaitADD}`
				
			}
			
			ipcRenderer.send('musicians:add', musician)

			setOnomaonADD('')
			setOnomaaitADD('')
			setFiloADD('')
			setAfmADD('')
			setDoyADD('')
			setDeltioADD('')
			setArithmosADD('')
			setIdiotitaADD('')
			setIdiotitaaitADD('')

			handleClose()
		}

	}

	return (
		<Container>
			<Modal show={show} size="lg" onHide={handleClose}>
			<Modal.Header>
                <Modal.Title>Εισαγωγή νέου μουσικού</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <FormControl value={onomaonADD} placeholder="Πλήρες όνομα" onChange={(e) => {setOnomaonADD(e.target.value)}}/>
                            </td>
                            <td>
								<FormControl value={onomaaitADD} placeholder="Όνομα στην αιτιατική" onChange={(e) => {setOnomaaitADD(e.target.value)}}/>
                            </td>
                            <td>
								<Form.Control as="select" value={filoADD} placeholder="Φύλο" onChange={(e) => {setFiloADD(e.target.value)}}>
								<option>Άντρας</option>
      							<option>Γυναίκα</option>
								  </Form.Control >
                            </td>
                        </tr>
                        <tr>
							<td>
                                <FormControl value={idiotitaADD} placeholder="Μουσική ιδιότητα" onChange={(e) => {setIdiotitaADD(e.target.value)}}/>
                            </td>
                            <td>
								<FormControl value={idiotitaaitADD} placeholder="Ιδιότητα στην αιτιατική" onChange={(e) => {setIdiotitaaitADD(e.target.value)}}/>
                            </td>
							<td>
								<Form.Control as="select" value={deltioADD} placeholder="Τύπος δελτίου" onChange={(e) => {setDeltioADD(e.target.value)}}>
									<option>ΑΔΤ</option>
									<option>Αριθμό Διαβατηρίου</option>
									<option>Αριθμό Αστυνομικής Ταυτότητας</option>
								</Form.Control >
                            </td>
                        </tr>                    
						<tr>
							<td>
                                <FormControl value={arithmosADD} placeholder="Αριθμός δελτίου" onChange={(e) => {setArithmosADD(e.target.value)}}/>
                            </td>
                            <td>
								<FormControl value={afmADD} placeholder="ΑΦΜ" onChange={(e) => {setAfmADD(e.target.value)}}/>
                            </td>
                            <td>
								<FormControl value={doyADD} placeholder="ΔΟΥ" onChange={(e) => {setDoyADD(e.target.value)}}/>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
				<Modal.Footer>
				{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={() => tocon()}>
                    Save Changes 
                    </Button>
                </Modal.Footer>
			</Modal>
			<Row>
				<Col>
					<BasicInfo previewRefresh={previewRefresh} article1Preview={article1Preview} musicians={musicians} opusesData={opusesData} places={places} addPlacesForContract={addPlacesForContract} nameTable={nameTable} opusTable={opusTable} addOpus={addOpus} addName={addName}/>
				</Col>
			</Row>
			<Row>
				<Col>
					<RehersalInfo rehTable={rehTable} addRehersal={addRehersal}/>
				</Col>
			</Row>
		</Container>
	)
}

export default App

