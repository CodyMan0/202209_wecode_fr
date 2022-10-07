import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { formListState } from '../store/store';

const OptionBox = ({ title, options, formNum, setFormNum }) => {
  const setFormList = useSetRecoilState(formListState);

  const clickOption = idx => {
    setFormNum(formNum + 1);
    setFormList(prev => ({
      surveyName: '',
      formData: [
        ...prev.formData,
        {
          id: formNum + 1,
          type: idx,
          question: '',
          options: [],
        },
      ],
    }));
  };

  return (
    <Options>
      <OptionTitle>{title}</OptionTitle>
      {options.map((option, idx) => (
        <Option onClick={() => clickOption(idx + 1)} key={idx}>
          <OptionEmoji>{option.emo}</OptionEmoji>
          {option.title}
        </Option>
      ))}
    </Options>
  );
};

export default OptionBox;

const OptionEmoji = styled.span`
  font-size: 20px;
  text-align: center;
  margin-right: 5px;
`;
const OptionTitle = styled.div`
  position: relative;
  margin-left: 30px;
  margin-top: 10px;
  padding: 10px 10px;
  font-size: 13px;
  color: #999;
  background-color: #fff;
`;

const Options = styled.div`
  text-align: center;
  padding-top: 20px;
  font-size: ${props => props.theme.style.middleFont};
  font-weight: 500;
  height: 100%;
`;

const Option = styled.button`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  font-size: 13px;
  margin-left: 30px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.style.mainLine};
  }
`;
