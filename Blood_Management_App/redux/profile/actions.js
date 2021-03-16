/* eslint-disable prettier/prettier */
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import {
  PROFILE_REQ,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  USER_SUCCESS,
  DONOR_STATUS_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  SET_DATA_SAVED,
  REMOVE_PHONE,
  SET_AVATAR,
  UPLOAD_PROGRESS,
  UPLOADING,
} from './actionTypes';

export const profileReq = () => ({ type: PROFILE_REQ });

export const profileSuccess = (profileData) => ({
  type: PROFILE_SUCCESS,
  profileData,
});

export const userSuccess = (userData) => ({
  type: USER_SUCCESS,
  userData,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  error,
});

export const donorStatusSuccess = (newDonorStatus) => ({
  type: DONOR_STATUS_SUCCESS,
  newDonorStatus,
});

export const profileUpdateSuccess = (newProfileData) => ({
  type: PROFILE_UPDATE_SUCCESS,
  newProfileData,
});

export const setDataSaved = () => ({
  type: SET_DATA_SAVED,
});

export const setAvatar = (image) => ({
  type: SET_AVATAR,
  image,
});

export const uploadProgress = (percentage) => ({
  type: UPLOAD_PROGRESS,
  percentage,
});

export const setUploading = () => ({
  type: UPLOADING,
});

//? ASYNCHRONOUS ACTION CREATORS.
////////////////////////////////////////////////////////////////////////////////////////////////

export const getUserData = (userToken) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's minimial ");
      dispatch(profileReq());
      const response = await axios.get(
        'http://10.0.2.2:8080/profile/fetchuserprofile',
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');

        dispatch(userSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile get request: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const getProfileData = (userToken) => {
  return async (dispatch) => {
    try {
      console.log("Fetching user's profile data.");
      dispatch(profileReq());
      const response = await axios.get(
        'http://10.0.2.2:8080/profile/fetchuserdata',
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('Data', response.data);
        console.log('response is success!');
        dispatch(profileSuccess(response.data));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile data fetch: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const changeDetails = (userToken, userType, newDetails) => {
  return async (dispatch) => {
    try {
      console.log('Updating user details.');
      dispatch(profileReq());
      let response = {};

      if (userType === 1) {
        response = await axios.put(
          'http://10.0.2.2:8080/profile/updateindprofile',
          newDetails,
          {
            headers: { Authorization: 'Bearer ' + userToken },
          },
        );
      } else if (userType === 2) {
        response = await axios.put(
          'http://10.0.2.2:8080/profile/updatehosprofile',
          newDetails,
          {
            headers: { Authorization: 'Bearer ' + userToken },
          },
        );
      } else {
        response = await axios.put(
          'http://10.0.2.2:8080/profile/updatebbprofile',
          newDetails,
          {
            headers: { Authorization: 'Bearer ' + userToken },
          },
        );
      }

      if (response.headers.success) {
        console.log('response is success!');
        dispatch(profileUpdateSuccess(newDetails));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on profile data change: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const setDonorStatus = (userToken, newDonorStatus) => {
  return async (dispatch) => {
    try {
      console.log('Toggling donor.');
      // dispatch(profileReq());
      const response = await axios.put(
        'http://10.0.2.2:8080/profile/donorstatus',
        { donorStatus: newDonorStatus },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        },
      );

      if (response.headers.success) {
        console.log('response is success!');
        console.log(newDonorStatus);

        dispatch(donorStatusSuccess(response.data.donorStatus));
      } else if (response.headers.error) {
        console.log('response is error!');
        dispatch(profileFailure(response.headers.error));
      } else {
        console.log('outlandish error!');
        dispatch(
          profileFailure(
            "Something's not right! please try again after some time.",
          ),
        );
      }
    } catch (err) {
      console.log('caught error on toggle donor status: ', err);
      dispatch(profileFailure(err.message));
    }
  };
};

///////////////////////////////////////////////////////////////////////////////////
//* WE ARE NOT DELETING THE USER'S OLD PICTURE FROM THE DB.
//* THIS IS DONE SO THAT IN THE FUTURE WE CAN INCLUDE AN OPTION TO MAKE GALLERY FOR PICTURES.

export const updateAvatar = (userToken, userId, image) => {
  return async (dispatch) => {
    dispatch(uploadProgress(0));

    //? SAVE THE IMAGE IN CLOUD AND GET IT'S DOWNLOAD URL, THEN SAVE THAT URL IN THE DB,
    //? IF RETURN IS SUCCESS, DISPATCH AVATAR CHANGE ACTION.
    try {
      const uploadUri =
        Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path;

      const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      dispatch(setUploading());

      //? TRACKING THE UPLOAD PROGRESS.
      const task = storage().ref(filename).putFile(uploadUri);

      task.on('state_changed', (taskSnapshot) => {
        dispatch(
          uploadProgress(
            Math.round(
              taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
            ) * 100,
          ),
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      // //? UPLOAD COMPLETED SUCCESSFULLY
      task.then(() => {
        console.log('Image uploaded to the bucket!');

        //? RETRIEVE THE DOWNLOAD URI HERE AND SAVE IT TO THE DB HERE IF THE UPLOAD WAS SUCCESS

        storage()
          .ref(filename)
          .getDownloadURL()
          .then((downloadURL) => {
            console.log(downloadURL);

            axios
              .put(
                'http://10.0.2.2:8080/profile/setavatar',
                { avatar: downloadURL },
                {
                  headers: { Authorization: 'Bearer ' + userToken },
                },
              )
              .then((response) => {
                if (response.headers.success) {
                  //? SETTING IT IN STATE ON SUCCESSFUL DATABASE SAVE.
                  dispatch(setAvatar(downloadURL));
                } else if (response.headers.error) {
                  dispatch(profileFailure(response.headers.error));
                } else {
                  dispatch(
                    profileFailure(
                      'Something went wrong, please try again later.',
                    ),
                  );
                }
              })
              .catch((err) => dispatch(profileFailure(err.message)));
          });

        // uploadComplete(dispatch, userToken, filename);
      });
    } catch (err) {
      dispatch(profileFailure(err.message));
      console.log(err.message);
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const removeAvatar = (userToken, avatar) => {
  return (dispatch) => {
    let filename = avatar.substring(avatar.lastIndexOf('/') + 1);
    filename = filename.substring(0, filename.indexOf('?'));
    console.log(filename);

    storage()
      .ref(filename)
      .delete()
      .then(() => {
        console.log(
          `${filename}has been deleted successfully from the bucket.`,
        );

        axios
          .put(
            'http://10.0.2.2:8080/profile/setavatar',
            { avatar: '' },
            {
              headers: { Authorization: 'Bearer ' + userToken },
            },
          )
          .then((response) => {
            if (response.headers.success) {
              //? SETTING IT IN STATE ON SUCCESSFUL DATABASE SAVE.
              dispatch(setAvatar(''));
            } else if (response.headers.error) {
              dispatch(profileFailure(response.headers.error));
            } else {
              dispatch(
                profileFailure('Something went wrong, please try again later.'),
              );
            }
          })
          .catch((err) => dispatch(profileFailure(err.message)));
      })
      .catch((err2) => dispatch(profileFailure(err2.message)));
  };
};

//? HELPER FUNCTIONS.
////////////////////////////////////////////////////////////////////////////////////////////////////////

// const uploadComplete = async (dispatch, userToken, filename) => {
//   //? SAVING IT TO THE DB.

//   const downloadURL = await storage().ref(filename).getDownloadURL();

//   const response = await axios.put(
//     'http://10.0.2.2:8080/profile/setavatar',
//     {avatar: downloadURL},
//     {
//       headers: {Authorization: 'Bearer ' + userToken},
//     },
//   );

//   if (response.headers.success) {
//     //? SETTING IT IN STATE ON SUCCESSFUL DATABASE SAVE.
//     dispatch(setAvatar(downloadURL));
//   } else if (response.headers.error) {
//     dispatch(profileFailure(response.headers.error));
//   } else {
//     dispatch(profileFailure('Something went wrong, please try again later.'));
//   }
// };
