import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom"
import {getAllCountries} from "../../redux/actions"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons'

const Links = styled.div`
    width: 50px;
    height: 0;
    display: flex;
    justify-content: space-between;
    flex-direction:column;
    position: sticky;
    z-index:100;
    top: 0;
    & svg{
        color:#000;
        padding: 16px;
        margin-top: 10px;
        margin-left: 3px;
        font-size: 1rem;
        background-color: gainsboro;
        border-radius: 50%;
        display: flex;
        align-items: center;
    }`

const Index = () => {

    const dispatch = useDispatch()

    return (
        <>
            <Links>
            <Link to = "/home">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link to = "/create">
            <FontAwesomeIcon icon={faPlus} />
            </Link>
            </Links>
        </>
    );
};

export default Index;