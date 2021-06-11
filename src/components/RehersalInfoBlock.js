import React, { useState } from 'react'
import { Card, Row, Col, Button, Table, FormControl, InputGroup } from 'react-bootstrap'


const RehersalInfo  = ({ rehTable, addRehersal }) => {
    const [rehDate, setRehDate] = useState('')
    const [date, setDate] = useState('')  
    const [startTime, setStartTime] = useState('') 
    const [endTime, setEndTime] = useState('') 


    const nums = {
        '01':'1', '02':'2', '03':'3', '04':'4', '05':'5', '06':'6',
        '07':'7', '08':'8', '09':'9', '10':'10', '11':'11', '12':'12',
        '13':'13', '14':'14', '15':'15', '16':'16', '17':'17', '18':'18',
        '19':'19', '20':'20', '21':'21', '22':'22', '23':'23', '24':'24',
        '25':'25', '26':'26', '27':'27', '28':'28', '29':'29', '30':'30', '31':'31'
        } 

    // var MM = rehDate.split("-")[1]
    // var DD = rehDate.split("-")[2]
    // var grMM = nums[MM]
    // var grDD = nums[DD]
    
    function toAdd() {
        addRehersal({ date, startTime, endTime })

        setStartTime('')
        setEndTime('')
        // makefile()//(JSON.parse(text))
        // console.log('done with the FILE')
    }

    return (
        <Card className='mt-3 mb-1' >
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>Πρόβες</Card.Title>                                    
                            <Card.Body> 
                                <InputGroup className='mt-1 mb-2'>
                                    <Row><FormControl type="date" value={date} onChange={(e) => setDate(e.target.value)}/></Row>
                                    <FormControl type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                                    <FormControl type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={() => toAdd()}>+</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                
                        </Card.Body>
                    </Col>
                    <Col>
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>Ημερομηνία και ώρες</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rehTable}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default RehersalInfo 