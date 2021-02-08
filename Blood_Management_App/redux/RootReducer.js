/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

//? importing all the reducers.
import loginReducer from './login/reducer';
import regReducer from './register/reducer';
import regIndReducer from './registerInd/reducer';
import authReducer from './auth/reducer';
import forgotReducer from './forgotpassword/reducer';
import myDrivesReducer from './myDrives/reducer';
import upcomingDrivesReducer from './upcomingDrives/reducer';
import driveOrganizerReducer from './driveOrganizer/reducer';
import commitmentsReducer from './commitments/reducer';
import inventoryReducer from './inventory/reducer';
import salesReducer from './sales/reducer';
import aboutReducer from './about/reducer';
import profileReducer from './profile/reducer';
<<<<<<< HEAD
import finddonorReducer from './finddonors/reducer'
import buybloodReducer from './buyblood/reducer'
import mypurchasesReducer from './mypurchases/reducer'
import activedonorReducer from './activedonorrequest/reducer'
=======
import finddonorReducer from './finddonors/reducer';
import buybloodReducer from './buyblood/reducer';
import invitesReducer from './invites/reducer';
import mypurchasesReducer from './mypurchases/reducer';
import activedonorReducer from './activedonorrequest/reducer';
import changePasswordReducer from './changePassword/reducer';
>>>>>>> aee30c9390a0913f0c0843131a9a2473041eb8cc

const rootReducer = combineReducers({
  loginFormState: loginReducer,
  regFormState: regReducer,
  regIndFormState: regIndReducer,
  authState: authReducer,
  forgotState: forgotReducer,
  myDrivesState: myDrivesReducer,
  upcomingDrivesState: upcomingDrivesReducer,
  driveOrganizerState: driveOrganizerReducer,
  commitmentsState: commitmentsReducer,
  inventoryState: inventoryReducer,
  salesState: salesReducer,
  aboutState: aboutReducer,
  profileState: profileReducer,
  finddonorFormState: finddonorReducer,
  buybloodFormState: buybloodReducer,
  invitesState: invitesReducer,
  mypurchasesFormState: mypurchasesReducer,
  activedonorFormState: activedonorReducer,
  changePasswordState: changePasswordReducer,
});

export default rootReducer;
