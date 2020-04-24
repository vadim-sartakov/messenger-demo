export const UPDATE_MEDIA_DEVICES_REQUESTED = 'UPDATE_MEDIA_DEVICES_REQUESTED';
export const UPDATE_MEDIA_DEVICES_SUCCEEDED = 'UPDATE_MEDIA_DEVICES_SUCCEEDED';

export const INITIATE_CALL = 'INITIATE_CALL';
export const OUTGOING_CALL_REQUESTED = 'OUTGOING_CALL_REQUESTED';
export const OUTGOING_CALL_SUCCEEDED = 'OUTGOING_CALL_SUCCEEDED';

export const GET_LOCAL_STREAM_REQUESTED = 'GET_LOCAL_STREAM_REQUESTED';
export const GET_LOCAL_STREAM_SUCCEEDED = 'GET_LOCAL_STREAM_SUCCEEDED';
export const GET_LOCAL_STREAM_FAILED = 'GET_LOCAL_STREAM_FAILED';

export const ADD_PEER_CONNECTION = 'ADD_PEER_CONNECTION';
export const CALL_ANSWER_RECEIVED = 'CALL_ANSWER_RECEIVED';
export const CALL_OFFER_RECEIVED = 'CALL_OFFER_RECEIVED';
export const ICE_CANDIDATE = 'ICE_CANDIDATE';

export const SWITCH_CAMERA = 'SWITCH_CAMERA';
export const END_CALL_REQUESTED = 'END_CALL_REQUESTED';
export const END_CALL_SUCCEEDED = 'END_CALL_SUCCEEDED';

export function updateMediaDevices() {
  return { type: UPDATE_MEDIA_DEVICES_REQUESTED };
}

export function initiateCall(chatId, { audio, video }) {
  return { type: INITIATE_CALL, chatId, audio, video };
}

export function startCall(chatId) {
  return { type: OUTGOING_CALL_REQUESTED, chatId };
}

export function getLocalStream(kind, deviceId) {
  return { type: GET_LOCAL_STREAM_REQUESTED, kind, deviceId };
}

export function switchCamera() {
  return { type: SWITCH_CAMERA };
}

export function endCall() {
  return { type: END_CALL_REQUESTED };
}