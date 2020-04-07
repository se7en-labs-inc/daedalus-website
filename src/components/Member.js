import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from '@input-output-hk/front-end-core-components'
// import Img from '@input-output-hk/front-end-core-components/'

const TeamContainer = styled.div`
  position: relative;
  padding-top: ${({ firstItem }) => firstItem ? '0' : '8rem'};

  > div {
    box-sizing: border-box;
    padding-left: 12rem;
    padding-right: 12rem;
    vertical-align: top;
    display: inline-block;
    width: 50%;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }
  }

  &:after {
    content: '';
    border-right: 0.1rem dashed ${({ theme }) => theme.colors.text};
    height: 100%;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    z-index: -1;
    top: 0;
  }

  @media screen and (max-width: 900px) {
    display: block;

    &:after {
      display: none;
    }

    > div {
      width: 100%;
      display: block;
      padding: 0;
    }
  }
`

const ProfileImage = styled.div`
  width: 100%;
  text-align: right;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 10rem;
    display: block;
    right: 0;
  }

  &:before {
    width: 12rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.interactive};
    transform: translateY(-50%);
  }

  &:after {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.text};
    transform: translate(50%, -50%);
  }

  @media screen and (max-width: 1200px) {
    &:before,
    &:after {
      top: 9.4rem;
    }
  }

  @media screen and (max-width: 900px) {
    text-align: center;
    margin-bottom: 4rem;

    &:before,
    &:after {
      display: none;
    }
  }
`

const Profile = styled.div`
  @media screen and (max-width: 900px) {
    text-align: center;
  }
`

const ImageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  box-sizing: border-box;
  border: 0.2rem solid ${({ theme }) => theme.colors.interactive};
  border-radius: 8rem;
  width: 16rem;
  height: 16rem;
  display: inline-block;
  margin-top: 1.9rem;
  overflow: hidden;

  img {
    margin: 0;
  }

  @media screen and (max-width: 1200px) {
    margin-top: 1.3rem;
  }

  @media screen and (max-width: 900px) {
    margin-top: 0;
  }
`

const JobTitle = styled.p`
  margin: 0;

  a {
    margin: 0 0.4rem;
    vertical-align: middle;

    &:first-of-type {
      margin-left: 0.8rem;
    }

    &:last-of-type {
      margin-right: 0;
    }

    svg {
      fill: ${({ theme }) => theme.colors.interactive};
    }

    &:hover svg {
      fill: ${({ theme }) => theme.colors.interactiveHighlight};
    }
  }

  @media screen and (max-width: 1200px) {
    font-size: 90%;
  }
`
const Location = styled.p`
  position: relative;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 2rem;

  &:after {
    content: '';
    border: 0.1rem dotted ${({ theme }) => theme.colors.interactive};
    position: absolute;
    width: calc(100% + 12.2rem);
    left: -12.2rem;
    bottom: -1rem;
  }

  span {
    vertical-align: middle;
    margin-right: 0.8rem;
  }

  @media screen and (max-width: 1200px) {
    font-size: 90%;
  }

  @media screen and (max-width: 900px) {
    &:after {
      display: none;
    }
  }
`
const Description = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
`

const Member = ({ member, twitter, linkedin, github, iohkProfile, location, jobTitle, imagePath, description }) => {
  return (
    <TeamContainer className='browser-testing-member-component'>
      <ProfileImage>
        <ImageContainer>
          <Link href='https://iohk.io'>
            <img src={imagePath} alt={member} />
          </Link>
        </ImageContainer>
      </ProfileImage>
      <Profile>
        <h3>{member}</h3>
        <JobTitle>
          {jobTitle}
          {twitter &&
            <FiTwitter />
          }
          {linkedin &&
            <FiLinkedin />
          }
          {github &&
            <FiGithub />
          }
        </JobTitle>
        <Location>
          <span><FaMapMarkerAlt /></span>{location}
        </Location>
        <Description>
          {description}
        </Description>
      </Profile>
    </TeamContainer>
  )
}

Member.propTypes = {
  member: PropTypes.string,
  twitter: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  iohkProfile: PropTypes.string,
  location: PropTypes.string,
  jobTitle: PropTypes.string,
  imagePath: PropTypes.string,
  description: PropTypes.string
}

export default Member
