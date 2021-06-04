import React from 'react';
import {Container} from 'react-bootstrap';
import styled from 'styled-components';

export const Layout = (props) =>(
    <Container>
        {props.children}
    </Container>
)