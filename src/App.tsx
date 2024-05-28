import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './utils/redux_ulils';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HomePage } from './ui/pages/HomePage/HomePage';
import { Progress } from './ui/components/common/Progress/Progress';
import { Warning } from './ui/components/common/Warning/Warning';
import { setError, setInfo, setStatus } from './store/appSlice';

export const App = () => {
  const [errorWarning, setErrorWarning] = useState(false);
  const [infoWarning, setInfoWarning] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useAppSelector(state => state.app.status);
  const error = useAppSelector(state => state.app.error);
  const info = useAppSelector(state => state.app.info);
  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    error !== null && setErrorWarning(true);
  }, [error]);

  useEffect(() => {
    info !== null && setInfoWarning(true);
  }, [info]);

  // useEffect(() => {
  //   if (!isInitialized) {
  //     navigate('/signin');
  //   }
  // }, [navigate, isInitialized]);

  useEffect(() => {
    dispatch(setError(null));
    dispatch(setInfo(null));
    dispatch(setStatus('success'));
    setErrorWarning(false);
    setInfoWarning(false);
  }, []);
  return (
    <div className='App'>
      {status === 'loading' && <Progress />}
      <Warning text={error} warningVisible={errorWarning} setWarningVisible={setErrorWarning} />
      <Warning text={info} warningVisible={infoWarning} setWarningVisible={setInfoWarning} />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'*'} element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  );
};
