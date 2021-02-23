import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import styled from 'styled-components';
import Movie from '../components/Movie';

const languageObject = [
    { id: 'en', language: 'English' },
    { id: 'cn', language: 'Cantonese' },
    { id: 'cs', language: 'Czech' },
    { id: 'es', language: 'Spanish' },
    { id: 'et', language: 'Estonian' },
    { id: 'fr', language: 'French' },
    { id: 'hi', language: 'Hindi' }, 
    { id: 'it', language: 'Italian' },
    { id: 'ta', language: 'Tamil' },
    { id: 'ja', language: 'Japanese' },
    { id: 'ko', language: 'Korean' },
    { id: 'sv', language: 'Swedish' },
    { id: 'zh', language: 'Chinese' },
]

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            large_cover_image
            language
            rating
            description_full
            isLiked @client
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const InfoBlock = styled.div`
    display: flex;
    background-color:rgba(0,0,0,0.4);
    margin: 5%;
    height: 80%;
    border-radius: 15px;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    width: 100%;
    margin: 50px 50px 15px;
    font-size: 65px;
`;

const Subtitle = styled.h4`
    margin: 0 50px 10px;
    font-size: 35px;
`;

const Description = styled.p`
    margin: 0 50px 10px;
    font-size: 28px;
`;

const Poster = styled.div`
    justify-content: flex-end;
    margin: 50px 0 0 200px;
    width: 25%;
    height: 70%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

const Suggestions = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 35px;
    width: 70%;
    position: relative;
    top: -150px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const params = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: +params.id }
    });

    // console.log(`This call is made from Detail.js`)
    // console.log(`id: ${+params.id}`)
    // console.log(JSON.stringify(data))
    let result = languageObject.find(({id}) => id === data?.movie?.language);
    // console.log(`result: ${result.language}`);
    // if (!loading)
    //     console.log(`data.movie.isLiked(${typeof data.movie.isLiked}): ${data.movie.isLiked}`)

    return (
        <Container>
            <InfoBlock>
                <Column>
                    <Title>
                        {
                            loading 
                                ? "Loading..."
                                : `${data.movie.title} ${data.movie.isLiked ? "💗" : "🖤"}`
                        }
                    </Title>
                    <Subtitle>{result ? result.language : (!data?.movie?.language) ? 'Unknown' : data?.movie?.language } • {data?.movie?.rating}</Subtitle>
                    <Description>{data?.movie?.description_full}</Description>
                </Column>
                <Poster bg={data?.movie?.large_cover_image}></Poster>
            </InfoBlock>
            <Suggestions>
                {data?.suggestions?.map(movie => (
                    <Movie 
                        key={movie.id} 
                        id={movie.id} 
                        bg={movie.medium_cover_image} />
                ))}
            </Suggestions>
        </Container>
    )
};
