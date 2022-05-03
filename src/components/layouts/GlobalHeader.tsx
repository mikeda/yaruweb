import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';

import { UserMenu } from './UserMenu';

import { pagesPath } from '@/lib';

interface Props {
  children: React.ReactNode;
}

export const GlobalHeader: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Inner>
        <Content>
          <div>
            <Link href={pagesPath.$url()} passHref>
              <Logo>
                <FontAwesomeIcon icon={faFistRaised} />
                {' 鉄拳やろうよ.com'}
              </Logo>
            </Link>

            <LogoShoulder>格闘ゲーム 鉄拳7を楽しむためのサイト</LogoShoulder>
          </div>

          <UserMenu />
        </Content>

        {children}
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled('header')(() => ({
  backgroundColor: 'white',
  borderBottom: '1px solid #ddd',
}));

const Inner = styled('div')(() => ({
  boxSizing: 'border-box',
  maxWidth: '730px',
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
}));

const Content = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '16px 0',
}));

const Logo = styled('a')(({ theme }) => ({
  display: 'inline-block',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  lineHeight: '2rem',
  color: theme.palette.text.primary,
  textAlign: 'center',
  textDecoration: 'none',

  '& svg': {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
  },
}));

const LogoShoulder = styled('div')(() => ({
  marginTop: '4px',
  fontSize: '0.75rem',
}));
