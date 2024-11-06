export enum EErrorMessage {
  INVALID_USER_ID = 'Invalid user ID.',
  USER_NOT_FOUND = 'User not found',
  USER_EXISTS = 'User with this login already exists',
  PASSWORD_NOT_MATCH = "Password doesn't match",
  TRACK_NOT_FOUND = 'Track with current id not found ',
  MISSING_FIELDS = 'Body does not contain required fields',
  INVALID_REQUEST_BODY = 'Invalid request body. Please check the JSON format and required fields.',
  INVALID_BODY = 'Invalid JSON format in request body',
  INTERNAL_ERROR = 'Something went wrong.',
  NOT_FOUND = 'Not found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error. Please try again later.',
}
