// φιλοξενία edit

// Τίτλος συναυλίας πέρασμα input
// Χωρίς επισήμανση έργου πέρασμα input

// Accordion.toggle με ματάκι
// μονιμη αλλαγή άρθρων με edit
// setup checks για τα άρθρα

// Oi προσκλήσεις γινονται edit από το όνομα και φαίνονται μονο αν ειναι τσεκ το κουμπι προσκλήσεων
// Οι προσκλήσεις έχουν default που ρυθμίζεται στις ρυθμίσεις
// στις προβες να μπει action drop down για να προσθέτεις σχόλιο.
// To edit μουσικών μπορει να έχει dropdown gia πλήρη επεξεργασία στοιχείων (προσοχή, θα θέλει επιβεβαίωση και επαναφορά στο αρχικό)

// 1η, 2η και γίνεται επιλογή του η/α => grDD[-1].
// Να προσθέσω edit στα πάντα
// Menu για προσθήκη μουσικού
// προσθηκη ημερομηνιας υποτιθεται συμβολαιου
// επιλογη του ποιος υπογραφει

// backup δεδομένων
// εξαγωγή και εισαγωγή δεδομένων
// modal με επεξεργασία και διαγραφή δεδομένων



        



import React, { useState, useContext, useRef } from 'react'
import { Card, Modal, Dropdown, DropdownButton, Form, Row, Col, Button, ButtonToolbar, InputGroup, FormControl, Table, Accordion, AccordionContext, useAccordionToggle, ButtonGroup, ToggleButton, Fragment }from 'react-bootstrap'
import { ConeStriped } from 'react-bootstrap-icons';
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { GrFormViewHide, GrView } from "react-icons/gr"
import { FiRefreshCw, FiSettings } from "react-icons/fi"
const db = require('electron-db')
const fs = require('fs');
const path = require('path')



const BasicInfo  = ({ previewRefresh, article1Preview, places, addPlacesForContract, nameTable, opusTable, addName, addOpus, musicians, opusesData }) => {

    const refPlace = useRef()
    const refName = useRef()
    const refOpus = useRef()
    
    const [tipos, setTipos] = useState('Τύπος Συμβολαίου')
    const [amoivi, setAmoivi] = useState('')
    const [currency, setCurrency] = useState('€')
    const [name, setName] = useState('')
    const [place, setPlace] = useState('')
    const [conDate, setConDate] = useState('')
    
    const [opusStyle, setOpusStyle] = useState('Τίτλος συναυλίας')
    const [opuses, setOpuses] = useState('')
    const [invitationNum, setInvitationNum] = useState('3')

    const [checked, setChecked] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const [checked4, setChecked4] = useState(false)
    const [checked5, setChecked5] = useState(false)    

    const invitations = {
        "1" : "μία (1) πρόσκληση",
        "2" : "δύο (2) προσκλήσεις",
        "3" : "τρεις (3) προσκλήσεις",
        "4" : "τέσσερις (4) προσκλήσεις",
        "5" : "πέντε (5) προσκλήσεις",
        "6" : "έξι (6) προσκλήσεις",
        "7" : "επτά (7) προσκλήσεις",
        "8" : "οχτώ (8) προσκλήσεις",
        "9" : "εννιά (9) προσκλήσεις",
        "10" : "δέκα (10) προσκλήσεις"
    }    

    function toName() {
        var invs = invitations[invitationNum]
        addName({name, amoivi, currency, invs})
        setName('')
    }

    function toOpus() {        
        addOpus({opuses, opusStyle})
        setOpuses('')
    }

    function toPlaceForContract() {
        addPlacesForContract({place, conDate})
        setPlace('')
        setConDate('')
    }
   
    const onSubmit = (e) => {
        e.preventDefault()
        
    }

    function setZeroAmoivi() {
        setAmoivi('')
    }

    return (
        <Card className='mt-5'> 
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col>
                            <Card.Title>Βασικές Πληροφορίες</Card.Title>                      
                            <DropdownButton
                                className='mt-1 mb-2'
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title = {tipos}
                                >
                                <Dropdown.Item  title='Σύμβαση έργου έκτακτου μουσικού' onClick={(e) => setTipos(e.target.title)}>Σύμβαση έργου έκτακτου μουσικού</Dropdown.Item>
                                <Dropdown.Item title='Σύμβαση' onClick={(e) => setTipos(e.target.title)}>Σύμβαση</Dropdown.Item>
                                <Dropdown.Item title='Σύμβαση Διευθυντή Ορχήστρας' onClick={(e) => setTipos(e.target.title)}>Σύμβαση Διευθυντή Ορχήστρας</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item title='Σύμβαση στα Αγγλικά' onClick={(e) => setTipos(e.target.title)}>Σύμβαση στα Αγγλικά</Dropdown.Item>
                            </DropdownButton>
                            <InputGroup className="mt-1 mb-2">
                                <FormControl value={amoivi} placeholder="Αμοιβή" disabled={currency === 'Αφιλοκερδώς'? true : false} onChange={(e) => setAmoivi(e.target.value)}/>
                                {!(currency === 'Αφιλοκερδώς') && <InputGroup.Text>,00</InputGroup.Text>}
                                <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title={currency}>
                                    <Dropdown.Item title='€' onClick={(e) => setCurrency(e.target.title)}>€</Dropdown.Item>
                                    <Dropdown.Item title='Αφιλοκερδώς' onClick={(e) => {setCurrency(e.target.title), setZeroAmoivi()}}>Αφιλοκερδώς</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                            <InputGroup className='mt-1 mb-2'>
                            <Typeahead
                                allowNew
                                newSelectionPrefix="Προσθέστε νέο μουσικό: "
                                id="name"
                                placeholder="Όνομα"
                                labelKey="onomaon"
                                // labelKey={option => `${option.onomaon} - ${option.idiotita}`}
                                onInputChange={(text, e) => { setName(text, e) }}
                                onChange={(selected, e) => { setName(selected, e) }}
                                options={musicians}
                                ref={refName}
                                renderMenuItemChildren={(option) => (
                                    <div>
                                      {option.onomaon}
                                      <div>
                                        <small>{option.idiotita}</small>
                                      </div>
                                    </div>
                                  )}
                                />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={() => {toName(), refName.current.clear()}}>+</Button>
                                    </InputGroup.Append>
                            </InputGroup>
                            <FormControl className='mt-1 mb-2' type="datetime-local" value={conDate} onChange={(e) => setConDate(e.target.value)}/>
                            <InputGroup className='mt-1 mb-2'>
                                <Typeahead
                                    allowNew
                                    newSelectionPrefix="Προσθέστε νέα τοποθεσία: "
                                    id="place"
                                    placeholder="Τοποθεσία" 
                                    labelKey="meros"
                                    onInputChange={(text, e) => { setPlace(text, e) }}
                                    onChange={(selected, e) => { setPlace(selected, e) }}
                                    options={places}
                                    ref={refPlace}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => {toPlaceForContract(), refPlace.current.clear()}}>+</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <InputGroup className='mt-1 mb-2'>
                                {opusStyle == 'Συνθέτης και έργο' ?
                                    <InputGroup className='mt-1 mb-2'>
                                        <Typeahead
                                            filterBy={['ΣΥΝΘΕΤΗΣ', 'ΕΡΓΟ']}
                                            newSelectionPrefix="Προσθέστε νέο μουσικό: "
                                            id="name"
                                            placeholder="Έργο"
                                            labelKey="ΣΥΝΘΕΤΗΣ"
                                            onInputChange={(text, e) => { setOpuses(text, e) }}
                                            onChange={(selected, e) => { setOpuses(selected, e) }}
                                            options={opusesData}
                                            ref={refOpus}
                                            renderMenuItemChildren={(option) => (
                                                <div>
                                                {option.ΣΥΝΘΕΤΗΣ}
                                                <div>
                                                    <small>{option.ΕΡΓΟ}</small>
                                                </div>
                                                </div>
                                            )}
                                            />
                                        <InputGroup.Append>
                                        <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title=''>
                                            <Dropdown.Item title='Τίτλος συναυλίας' onClick={(e) => setOpusStyle(e.target.title)}>Τίτλος συναυλίας</Dropdown.Item>
                                            <Dropdown.Item title='Συνθέτης και έργο' onClick={(e) => setOpusStyle(e.target.title)}>Συνθέτης και έργο</Dropdown.Item>
                                            {/* <Dropdown.Item title='Χωρίς επισήμανση έργου' onClick={(e) => setOpusStyle(e.target.title)}>Χωρίς επισήμανση έργου</Dropdown.Item> */}
                                        </DropdownButton>
                                            <Button variant="outline-secondary" onClick={() => {toOpus(), refOpus.current.clear()}}>+</Button>
                                        </InputGroup.Append>
                                    </InputGroup> :
                                    opusStyle == 'Τίτλος συναυλίας' ?
                                    <InputGroup className='mt-1 mb-2'>
                                    <FormControl as='textarea' value={opuses} rows='3' placeholder="Τίτλος συναυλίας" onChange={(e) => {setOpuses(e.target.value)}}/>
                                    <InputGroup.Append>
                                            <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title=''>
                                                <Dropdown.Item title='Τίτλος συναυλίας' onClick={(e) => setOpusStyle(e.target.title)}>Τίτλος συναυλίας</Dropdown.Item>
                                                <Dropdown.Item title='Συνθέτης και έργο' onClick={(e) => setOpusStyle(e.target.title)}>Συνθέτης και έργο</Dropdown.Item>
                                                {/* <Dropdown.Item title='Χωρίς επισήμανση έργου' onClick={(e) => setOpusStyle(e.target.title)}>Χωρίς επισήμανση έργου</Dropdown.Item> */}
                                            </DropdownButton>
                                                <Button variant="outline-secondary" onClick={() => {toOpus(), setOpuses('')}}>+</Button>
                                            </InputGroup.Append>
                                    </InputGroup> :
                                    <InputGroup className='mt-1 mb-2'>
                                    <Form.Control as='textarea' rows='3' disabled={true} placeholder="Χωρίς επισήμανση έργου" />
                                    <InputGroup.Append>
                                    <DropdownButton as={InputGroup.Prepend} variant="outline-secondary" title=''>
                                                <Dropdown.Item title='Τίτλος συναυλίας' onClick={(e) => setOpusStyle(e.target.title)}>Τίτλος συναυλίας</Dropdown.Item>
                                                <Dropdown.Item title='Συνθέτης και έργο' onClick={(e) => setOpusStyle(e.target.title)}>Συνθέτης και έργο</Dropdown.Item>
                                                {/* <Dropdown.Item title='Χωρίς επισήμανση έργου' onClick={(e) => setOpusStyle(e.target.title)}>Χωρίς επισήμανση έργου</Dropdown.Item> */}
                                            </DropdownButton>
                                </InputGroup.Append>
                                </InputGroup>
                                }
                                
                            </InputGroup>

                            <Card className="bt-1 mb-5" style={{ height: '3rem' }}>
                            <InputGroup>
                            
                            <Card.Body style={{ height: '3rem' }}>
                            Αριθμός προσκλήσεων
                            </Card.Body>
                            
                            <DropdownButton

                                className='mt-1 mb-2'
                                as={InputGroup.Prepend}
                                variant="outline-secondary"
                                title={invitationNum}
                                >
                                    <Dropdown.Item title='Καμία' onClick={(e) => setInvitationNum(e.target.title)}>Καμία</Dropdown.Item>
                                    <Dropdown.Item title='1' onClick={(e) => setInvitationNum(e.target.title)}>1</Dropdown.Item>
                                    <Dropdown.Item title='2' onClick={(e) => setInvitationNum(e.target.title)}>2</Dropdown.Item>
                                    <Dropdown.Item title='3' onClick={(e) => setInvitationNum(e.target.title)}>3</Dropdown.Item>
                                    <Dropdown.Item title='4' onClick={(e) => setInvitationNum(e.target.title)}>4</Dropdown.Item>
                                    <Dropdown.Item title='5' onClick={(e) => setInvitationNum(e.target.title)}>5</Dropdown.Item>
                                    <Dropdown.Item title='6' onClick={(e) => setInvitationNum(e.target.title)}>6</Dropdown.Item>
                                    <Dropdown.Item title='7' onClick={(e) => setInvitationNum(e.target.title)}>7</Dropdown.Item>
                                    <Dropdown.Item title='8' onClick={(e) => setInvitationNum(e.target.title)}>8</Dropdown.Item>
                                    <Dropdown.Item title='9' onClick={(e) => setInvitationNum(e.target.title)}>9</Dropdown.Item>
                                    <Dropdown.Item title='10' onClick={(e) => setInvitationNum(e.target.title)}>10</Dropdown.Item>
                            </DropdownButton>
                            </InputGroup>
                            </Card>
                            
                        </Col>                        
                        <Col>
                        
                            <Row>
                                <Card.Title><FiRefreshCw as={Button} variant="primary" onClick={() => previewRefresh()} />     Προεπισκόπηση άρθρου 1</Card.Title>
                                <Card>
                                <Card.Body>
                                {article1Preview}
                                <Table className="table mt-2">
                                    
                                    <tbody>
                                        {opusTable}
                                    </tbody>
                                </Table>
                                </Card.Body>
                                </Card>
                            </Row>
                           
                            <Row>
                                <Table className="table mt-2">
                                    <thead>
                                    <tr>
                                        <th>Όνομα</th>
                                        <th>Ιδιότητα</th>
                                        <th>Αμοιβη</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {nameTable}
                                    </tbody>
                                </Table>
                            </Row>
                        </Col>
                    </Row>
                    <Row> 
                        <Col>
                            <Card>
                            
                                <ToggleButton
                                    type="checkbox"
                                    variant="ouline-secondary"
                                    checked={checked}
                                    value="1"
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                    > Άρθρο για φιλοξενία και έξοδα
                                    
                                </ToggleButton>

                                <Accordion defaultActiveKey="1">
                                    <Row>
                                    
                                        <Accordion.Toggle as={Button} variant="link-secondary" eventKey="0" >
                                        <GrView className="float-start" /> <FiSettings className="float-end"/>
                                        {/* {refA.current.hidden.bs.collapse ? <GrView/> : <GrView/>}  */}
                                        </Accordion.Toggle>
                                        </Row>
                                        
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                        Η Ορχήστρα θα οργανώσει την φιλοξενία του καλλιτέχνη από τις 18/04 έως τις 20/04 (αναχώρηση 21/04) και θα αναλάβει τα έξοδα των διανυκτερεύσεων (χρέωση δικλίνου δωματίου με πρωινό).
                                        Η Ορχήστρα θα καλύψει τα ναύλα του καλλιτέχνη για την συμμετοχή του στην παραγωγή (ένα αεροπορικό εισιτήριο οικονομικής θέσης Παρίσι – Αθήνα μετ’επιστροφής).
                                        Η Ορχήστρα θα αναλάβει την μεταφορά του καλλιτέχνη από το αεροδρόμιο στο ξενοδοχείο και αντιστρόφως, όπως επίσης από και προς το ξενοδοχείο για τις δοκιμές και την συναυλία.
                                        </Card.Body> 
                                        </Accordion.Collapse>
                                    
                                </Accordion>   
                                                                
                            </Card> 
                                                     
                            </Col>
                            <Col>
                            <Card>
                            <ButtonGroup toggle className="bt-5 mb-1">
                                <ToggleButton
                                    type="checkbox"
                                    variant="ouline-secondary"
                                    checked={checked2}
                                    value="1"
                                    onChange={(e) => setChecked2(e.currentTarget.checked)}
                                    > Άρθρο για ηχογράφηση
                                </ToggleButton>
                                </ButtonGroup>
                                <Accordion defaultActiveKey="1">
                                    
                                        <Accordion.Toggle as={Button} variant="link-secondary" eventKey="0">
                                        <GrView/>
                                        </Accordion.Toggle>
                                        
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                        Ο καλλιτέχνης συναινεί στην ηχογράφηση ή/και μαγνητοσκόπηση της συναυλίας για αρχειακούς και εκπαιδευτικούς
                                        σκοπούς της Ορχήστρας και του Μεγάρου Μουσικής Αθηνών. Ο καλλιτέχνης παραχωρεί επίσης άδεια χρήσης ηχητικών
                                        ή/και οπτικοακουστικών αποσπασμάτων από τις δοκιμές και την συναυλία διάρκειας έως τριών λεπτών για την
                                        προβολή της Ορχήστρας. Ρητά συμφωνείται ότι η αμοιβή του καλλιτέχνη όπως αναφέρεται στο άρθρο 2
                                        συμπεριλαμβάνει το τίμημα για τις άδειες που ο καλλιτέχνης παραχωρεί στο παρόν άρθρο της σύμβασης.                                         </Card.Body> 
                                        </Accordion.Collapse>
                                    
                                </Accordion>   
                                </Card>                       
                            </Col>
                            <Col>
                            <Card>
                            <ButtonGroup toggle className="bt-5 mb-1">
                                <ToggleButton
                                    type="checkbox"
                                    variant="ouline-secondary"
                                    checked={checked3}
                                    value="1"
                                    onChange={(e) => setChecked3(e.currentTarget.checked)}
                                    > Άρθρο για δημοσιότητα
                                </ToggleButton>
                                </ButtonGroup>
                                <Accordion defaultActiveKey="1">
                                    
                                        <Accordion.Toggle as={Button} variant="link-secondary" eventKey="0">
                                        <GrView/>
                                        </Accordion.Toggle>
                                        
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                        Ο καλλιτέχνης θα αποστείλει στην Ορχήστρα μία πρόσφατη φωτογραφία του σε υψηλή ανάλυση και ένα σύντομο βιογραφικό σημείωμα (έως 250 λέξεις) για δημοσίευση στο έντυπο πρόγραμμα και ανάρτηση στην ιστοσελίδα της Ορχήστρας.
                                         </Card.Body> 
                                        </Accordion.Collapse>
                                    
                                </Accordion>   
                                </Card>                       
                            </Col>
                            <Col>
                        
                            <Card>
                            
                                <ToggleButton
                                    type="checkbox"
                                    variant="ouline-secondary"
                                    checked={checked4}
                                    value="1"
                                    onChange={(e) => setChecked4(e.currentTarget.checked)}
                                    > Άρθρο για αποκλειστικότητα
                                </ToggleButton>

                                <Accordion defaultActiveKey="1">
                                    
                                        <Accordion.Toggle as={Button} variant="link-secondary" eventKey="0">
                                        <GrView/>
                                        </Accordion.Toggle>
                                        
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                        Απαγορεύεται κάθε είδους επαγγελματική εμφάνιση του καλλιτέχνη από δύο μήνες πριν έως έναν μήνα μετά την ημερομηνία της ως άνω συναυλίας, σε ακτίνα εκατό χιλιομέτρων από τον χώρο της συναυλίας, χωρίς προηγούμενη άδεια της Διεύθυνσης της Ορχήστρας.
                                         </Card.Body> 
                                        </Accordion.Collapse>                                  
                                </Accordion> 
                                                                
                                </Card> 
                                                     
                            </Col>
                            <Col>
                            <Card>
                            <ButtonGroup toggle className="bt-5 mb-1">
                                <ToggleButton
                                    type="checkbox"
                                    variant="ouline-secondary"
                                    checked={checked5}
                                    value="1"
                                    onChange={(e) => setChecked5(e.currentTarget.checked)}
                                    > Άρθρο για Απευθείας μετάδοση
                                </ToggleButton>
                                </ButtonGroup>
                                <Accordion defaultActiveKey="1">
                                    
                                        <Accordion.Toggle as={Button} variant="link-secondary" eventKey="0">
                                        <GrView/>
                                        </Accordion.Toggle>
                                        
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                        Ο καλλιτέχνης συναινεί στην ενδεχόμενη απευθείας μετάδοση της συναυλίας από το ραδιόφωνο
                                        ή το διαδίκτυο. Ρητά συμφωνείται ότι η αμοιβή του καλλιτέχνη όπως αναφέρεται στο άρθρο 2
                                        συμπεριλαμβάνει το τίμημα για την εν λόγω μετάδοση. Περαιτέρω, ο καλλιτέχνης δηλώνει ότι,
                                        ως μέλος του συνόλου που θα συμμετάσχει στην άνω συναυλία, κατά την έννοια της διάταξης
                                        του άρθρου 46 παρ. 4 του Ν. 2121/1993, συναινεί και συμφωνεί ρητά και ανεπιφύλακτα με την
                                        εκπροσώπησή του από την ορισθείσα εκπρόσωπο του εν λόγω συνόλου.
                                        </Card.Body> 
                                        </Accordion.Collapse>
                                    
                                </Accordion>   
                                </Card>                       
                            </Col>
                    </Row>
                </Form>
                </Card.Body>     
            </Card>        
    )
}

export default BasicInfo