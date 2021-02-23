import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

const LIKE_MOVIE = gql`
    mutation toggleLike($id: Int!, $isLiked: Boolean!) {
        toggleLike(id: $id, isLiked: $isLiked) @client
    }
`;

const Container = styled.div``;

const Frame = styled.div`
    height: 300px; //600px;
    width: 100%;
    /* min-height: 240px; */
    max-height: 600px;
    min-width: 200px;
    max-width: 420px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
    /* overflow: hidden; */
    border-radius: 7px;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

const Button = styled.button`
    position: relative;
    float: right;
    bottom: -10px;
    font-size: 14px;
`;

const Movie = ({ id, bg, isLiked }) => {
    // console.log(`This call is made from <Movie>`);
    // console.log(`id(${typeof id}): ${id}`);
    // console.log(`bg: ${bg}`);
    const [toggleLike] = useMutation(LIKE_MOVIE, { 
        variables: { id: parseInt(id), isLiked } 
    });

    // console.log(`isLiked: ${isLiked}`);
    return (
        <Container>
            <Frame>
                <Link to={`/${id}`}>
                    <Poster bg={bg} />
                </Link>
            </Frame>
            <Button onClick={toggleLike}>{isLiked ? "Unlike" : "Like"}</Button>
        </Container>
    );
};

export default Movie;