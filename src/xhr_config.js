import xhr from 'components/xhr';
import { message } from 'antd';
import auth from 'src/utils/auth';
import { browserHistory } from 'react-router';
import {apiBaseUrl} from 'utils/config';

const apiUrl = apiBaseUrl;

xhr.baseUrl = apiUrl;

xhr.success = (res, options) => {
  if (typeof res !== 'object') {
    message.error( apiUrl + ': response data should be JSON');
    return;
  }
  switch (res.code) {
    case 200:
      options.success && options.success(res);
      break;
    case 401:
      auth.destroy();
      browserHistory.push('/login');
      break;
    default:
      message.error(res.message || 'unknown error')
  }
}