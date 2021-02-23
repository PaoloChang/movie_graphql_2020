import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client'
import Movie from '../components/Movie';

const GET_MOVIES = gql`
    {
        movies {
            id
            title
            medium_cover_image
            large_cover_image
            isLiked @client
        }
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 35vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
    position: relative;
    top: -50px;
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Subtitle = styled.h3`
    position: relative;
    top: -50px;
    font-size: 35px;
`;

const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 35px;
    width: 70%;
    position: relative;
    top: -80px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const { loading, data } = useQuery(GET_MOVIES);
    return (
        <Container>
            <Header>
                <Title>Apollo MovieQL</Title>
                <Subtitle>Built with React, Apollo and GraphQL. Data feeds by yts.mx/api</Subtitle>
            </Header>
            { loading && <Loading>Loading...</Loading>}

            <Movies>
                {data?.movies?.map(movie => (
                    <Movie 
                        key={movie.id} 
                        id={movie.id} 
                        isLiked={movie.isLiked}
                        bg={movie.large_cover_image} />
                ))}
            </Movies> 
        </Container>
    )
};