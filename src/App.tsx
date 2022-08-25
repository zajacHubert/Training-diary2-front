import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddTrainingView } from './views/AddTrainingView';
import { EditTrainingView } from './views/EditTrainingView';
import { LoginView } from './views/LoginView';
import { NotFoundView } from './views/NotFoundView';
import { SingupView } from './views/SignupView';
import { SingleTrainingView } from './views/SingleTrainingView';
import { TrainingsListView } from './views/TrainingsListView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/signup" element={<SingupView />} />
      <Route path="/training" element={<TrainingsListView />} />
      <Route path="/training/add-form" element={<AddTrainingView />} />
      <Route path="/training/:title/:date" element={<SingleTrainingView />} />
      <Route path="/training/edit-form/:title/:date" element={<EditTrainingView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}

