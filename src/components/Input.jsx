import React from 'react'
import Form from 'react-bootstrap/Form';

function Input({
    Type, Name, Value, Id, Onchange,
    Placeholder,
    AriaDescribedby,
    As, Rows,Label, Classname
}) {
  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>{Label}</Form.Label>
        <Form.Control placeholder={Placeholder}
            aria-describedby={AriaDescribedby}
            as = {As}
            rows = {Rows}
            type={Type} name= {Name} id={Id} onChange={Onchange} value={Value}
            className={`focus-ring focus-ring-light ${Classname}`}
        />
      </Form.Group>
    </div>
  )
}

export default Input