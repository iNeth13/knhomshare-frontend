import React from 'react';
import {Form} from 'react-bootstrap'

export default function Feedback({feedbackMessage}) {
    return <Form.Control.Feedback style={{fontSize:'12px',display:'block'}} type='invalid'>
        {feedbackMessage}
    </Form.Control.Feedback>
}
