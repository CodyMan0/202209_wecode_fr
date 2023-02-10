import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MultipleSingle from '../../components/ManagerQuestions/MultipleSingle';
import ShortDescription from '../../components/ManagerQuestions/ShortDescription';
import LongDescription from '../../components/ManagerQuestions/LongDescription';
import EmptyContainer from '../../components/ManagerQuestions/EmptyContainer';
import MultipleMultiple from '../../components/ManagerQuestions/MultipleMultiple';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { formListState, formNumState } from '../../store/store';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../../components/ManagerQuestions/ImageUpload';
import PhoneInput from '../../components/ManagerQuestions/PhoneInput';
import PrivacyConsent from '../../components/ManagerQuestions/PrivacyConsent';
import axios from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import { MdInfo } from 'react-icons/md';

const SurveyEditor = ({ setOpenEditorModal, id }) => {
  const [formList, setFormList] = useRecoilState(formListState);
  const setFormId = useSetRecoilState(formNumState);
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  useEffect(() => {
    axios.get(`/data/${id}data.json`).then(res => {
      setFormList(res.data);
      const lastNumber = res?.data?.formData.length;
      const lastFormId = res?.data?.formData[lastNumber - 1].id;
      setFormId(lastFormId);
    });
  }, [id]);

  const onRemove = id => {
    setFormList(prev => ({
      ...prev,
      formData: formList.formData.filter(form => form.id !== id),
    }));
  };

  const onClickHandler = props => {
    if (Object.keys(props).length === 0) {
      setOpenEditorModal(true);
    } else {
      console.log('error');
    }
  };

  return (
    <SurveyContainer>
      <SurveyPage>
        <DataBox>
          <TitleInput
            placeholder="제목을 입력하세요"
            {...register('surveyName', {
              shouldSelect: true,
              required: {
                value: 'title',
                message: `제목은 필수!`,
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="surveyName"
            render={({ message }) => (
              <ErrorM>
                <Icon>
                  <MdInfo />
                </Icon>
                {message}
              </ErrorM>
            )}
          />
        </DataBox>
        <InputContainer>
          <DateP>시작 날짜</DateP>
          <DataBox>
            <DateInput
              placeholder="ex)2022-09-19"
              {...register('startDate', {
                pattern: {
                  value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                  message: '날짜 형식을 일치시켜주세요!',
                },
                required: {
                  value: '복수',
                  message: `필수 항목입니다!`,
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="startDate"
              render={({ message }) => (
                <ErrorMOne>
                  <Icon>
                    <MdInfo />
                  </Icon>
                  {message}
                </ErrorMOne>
              )}
            />
          </DataBox>

          <DateP>종료 날짜</DateP>
          <DataBox>
            <DateInput
              placeholder="ex)2022-10-19"
              {...register('endDate', {
                pattern: {
                  value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                  message: '날짜 형식을 일치시켜주세요!',
                },
                required: {
                  value: '복수',
                  message: `필수 항목입니다!`,
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="endDate"
              render={({ message }) => (
                <ErrorMOne>
                  <Icon>
                    <MdInfo />
                  </Icon>
                  {message}
                </ErrorMOne>
              )}
            />
          </DataBox>
        </InputContainer>

        {formList?.formData?.length > 0 ? (
          formList.formData.map((form, idx) => (
            <div key={idx}>
              {
                QUESTION_ARRAY(
                  idx + 1,
                  form.id,
                  form.question,
                  form.options,
                  onRemove
                )[form.type]
              }
            </div>
          ))
        ) : (
          <EmptyContainer />
        )}

        <NextContainer>
          <Button type="button">
            <Link to="/">이전</Link>
          </Button>
          <Button
            type="button"
            onClick={() => {
              const result = trigger(['surveyName', 'startDate', 'endDate']);

              if (result) {
                onClickHandler(errors);
              }
            }}
          >
            다음
          </Button>
        </NextContainer>
      </SurveyPage>
    </SurveyContainer>
  );
};

export default SurveyEditor;

const Button = styled.button`
  margin-left: ${children => children.children === '...' || '30px'};
  padding: ${children =>
    children.children === '이전으로 가기' || '다음으로 가기' ? '5Px 10px' : 0};
  color: #ffffff;
  border-color: ${props => props.theme.style.mainBlue};
  background-color: ${props => props.theme.style.mainBlue};
  border-radius: 5.5px;
  height: 50px;
  position: ${children => children.children === '...' && 'absolute'};
  opacity: 0.86;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 20px;
  position: absolute;
  left: -25px;
  top: -5px;
`;
const DataBox = styled.div`
  position: relative;
`;

const ErrorMOne = styled.span`
  position: absolute;
  left: 0;
  top: -20px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.style.red};
`;
const ErrorM = styled.span`
  position: absolute;
  left: 300px;
  top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.theme.style.red};
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DateP = styled.p`
  margin-right: 5px;
  display: flex;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const DateInput = styled.input`
  font-size: ${props => props.theme.style.smallFont};
  text-align: left;
  border: 0.3px solid grey;
  outline: none;
  font-size: 13px;
  line-height: 23px;
  margin-left: 10px;
  margin-right: 30px;
  margin-bottom: 6px;
  word-break: break-all;
  word-break: break-word;
  word-wrap: break-word;
`;

const SurveyContainer = styled.div`
  z-index: 1;
  padding: 5px 10px;
`;

const SurveyPage = styled.div`
  position: relative;
  width: 770px;
  margin: 99px auto 95px;
  padding-top: 1px;
  border-radius: 25px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 5px;
  backdrop-filter: blur(30px);
  background-color: rgb(255, 255, 255);
`;

const TitleInput = styled.input`
  position: relative;
  font-size: ${props => props.theme.style.middleFont};
  font-family: 600;
  width: 100%;
  padding: 15px 29px 8px;
  margin: 15px 0px 22px 0;
  text-align: center;
  border: none;
  border-radius: 25px;
  outline: none;
`;

const NextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 49px 30px;
`;
export const QUESTION_ARRAY_TYPE = {
  multipleSingle: 1,
  multipleMultiple: 2,
  shortDescription: 3,
  longDescription: 4,
  imageUpload: 5,
  phoneInput: 6,
  privacyConsent: 7,
};

export const QUESTION_ARRAY = (sortIndex, formId, ...args) => {
  return {
    1: (
      <MultipleSingle
        sortIndex={sortIndex}
        question={args[0]}
        option={args[1]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    2: (
      <MultipleMultiple
        sortIndex={sortIndex}
        question={args[0]}
        option={args[1]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    3: (
      <ShortDescription
        sortIndex={sortIndex}
        question={args[0]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    4: (
      <LongDescription
        sortIndex={sortIndex}
        question={args[0]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    5: (
      <ImageUpload
        sortIndex={sortIndex}
        question={args[0]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    6: (
      <PhoneInput
        sortIndex={sortIndex}
        label="imageUpload"
        question={args[0]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
    7: (
      <PrivacyConsent
        sortIndex={sortIndex}
        question={args[0]}
        onRemove={args[2]}
        formId={formId}
      />
    ),
  };
};
