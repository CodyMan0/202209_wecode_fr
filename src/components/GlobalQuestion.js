import React from 'react';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { formListState } from '../store/store';

const GlobalQuestion = ({ register, children, sortIndex }) => {
  const [formList, setFormList] = useRecoilState(formListState);

  const onRemove = sortIndex => {
    setFormList(formList.formData.filter(form => form.id !== sortIndex));
  };

  return (
    <Container>
      <QuesTionContainer>
        <QuestionTitleInput>
          <QuestionNum>{sortIndex}</QuestionNum>
          <QuestionContent
            placeholder={`${sortIndex}번 질문을 입력하세요`}
            {...register(`formData[${sortIndex - 1}].question`)}
          />
        </QuestionTitleInput>
        <Icon onClick={() => onRemove(sortIndex)}>
          <MdDelete className="uil uil-trash-alt" />
        </Icon>
      </QuesTionContainer>
      {children}
    </Container>
  );
};

export default GlobalQuestion;

const Container = styled.div`
  padding: 25px 29px;
  margin-bottom: 30px;

  &:hover {
    cursor: pointer;
    background-color: rgba(33, 33, 33, 0.05);
  }
`;

const QuestionContent = styled.input`
  padding-left: 15px;
  font-size: ${props => props.theme.style.smallFont};
  text-align: left;
  border: none;
  outline: none;

  ${Container}:hover & {
    background-color: rgba(33, 33, 33, 0.01);
    cursor: pointer;
  }
`;

const QuesTionContainer = styled.div`
  position: relative;
`;
const QuestionTitleInput = styled.div`
  padding-left: 50px;
`;

const QuestionNum = styled.span`
  position: absolute;
  font-weight: 400;
  font-size: 20px;
  top: 2px;
  left: 30px;
  color: rgba(33, 33, 33, 0.5);
`;

const Icon = styled.div`
  position: absolute;
  right: 0;
  top: 5px;

  &:hover {
    color: red;
  }
`;
