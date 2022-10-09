import React from 'react';
import * as S from './LinkStyle';
import { Outlet, useLocation } from 'react-router-dom';

const Link = () => {
  // 메인에서 Link to 로 넘긴 surveyLink, name 사용
  const location = useLocation();
  const surveyLink = location.state.surveyLink;
  const name = location.state.name;

  // 서베이 주소 복사 기능
  const handleCopyClipBoard = async surveyLink => {
    try {
      await navigator.clipboard.writeText(surveyLink);
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  return (
    <>
      <Outlet />
      <S.Layout>
        <S.DiscriptionBox>
          <S.Title>{name}</S.Title>
        </S.DiscriptionBox>
        <S.LinkBox>
          <S.LinkBoxDetail>
            <S.LinkGuide>아래 URL 링크를 배포하세요</S.LinkGuide>
            <S.LinkInput value={surveyLink} readOnly />
            <S.CopyButton onClick={() => handleCopyClipBoard(surveyLink)}>
              복사하기
            </S.CopyButton>
          </S.LinkBoxDetail>
        </S.LinkBox>
      </S.Layout>
    </>
  );
};

export default Link;
