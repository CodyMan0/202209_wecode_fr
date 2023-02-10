import React from 'react';
import { useLocation } from 'react-router';
import OptionBox from '../../components/OptionBox';
import SurveyEditor from './SurveyEditor';
import { API } from '../../config';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { formNumState, linkState, openState } from '../../store/store';
import { FormProvider, useForm } from 'react-hook-form';
import EditorModal from '../../components/EditorModal/EditorModal';
import {
  MdAddCircleOutline,
  MdCheckCircleOutline,
  MdSort,
  MdSelectAll,
  MdSecurityUpdateGood,
  MdEditNote,
  MdPersonPin,
} from 'react-icons/md';
import styled from 'styled-components';

const Editor = () => {
  const methods = useForm({
    shouldUnregister: true,
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const [formNum, setFormNum] = useRecoilState(formNumState);

  const setLinkData = useSetRecoilState(linkState);
  const [openEditorModal, setOpenEditorModal] = useRecoilState(openState);
  const adminToken = localStorage.getItem('token');
  const location = useLocation();
  const id = location.state.name;

  const menuArr = [
    { id: 1, title: '객관식 단일 선택', emo: <MdAddCircleOutline /> },
    { id: 2, title: '객관식 복수 선택', emo: <MdCheckCircleOutline /> },
    { id: 3, title: '주관식 짧은 답변 선택', emo: <MdSort /> },
    { id: 4, title: '주관식 긴 답변 선택', emo: <MdEditNote /> },
    { id: 5, title: '이미지 업로드 선택', emo: <MdSelectAll /> },
    { id: 6, title: '핸드폰 번호 입력 선택', emo: <MdSecurityUpdateGood /> },
    { id: 7, title: '개인 정보 동의 여부 선택', emo: <MdPersonPin /> },
  ];

  const onSubmit = data => {
    fetch(`${API.EDITOR}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: adminToken,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => setLinkData(result));
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <SelectOption>
          <OptionContainer>
            <OptionBox
              title="선택 질문 항목"
              options={menuArr}
              setFormNum={setFormNum}
              formNum={formNum}
            />
          </OptionContainer>
        </SelectOption>
        <MakeSurvey onSubmit={methods.handleSubmit(onSubmit)}>
          <SurveyEditor setOpenEditorModal={setOpenEditorModal} id={id} />
          {openEditorModal === true && (
            <EditorModal register={register} errors={errors} />
          )}
        </MakeSurvey>
      </FormProvider>
    </Container>
  );
};

export default Editor;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  margin: 0 auto;
  background-color: aliceblue;
`;

const SelectOption = styled.div`
  position: relative;
  flex: 1;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 5px;
  backdrop-filter: blur(30px);
  min-height: 100vh;
  position: relative;
`;

const MakeSurvey = styled.form`
  flex: 2.5;
`;

const OptionContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 10px;
`;
