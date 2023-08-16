import { useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';

export default (error: any) => {
  const toast = useToast();

  useEffect(() => {
    const message = error?.response?.data?.message;

    error &&
      console.log('error message ', error.response, error?.response?.data);

    error &&
      toast.show(
        (message && (typeof message === 'string' ? message : message[0])) ||
          'Application encountered an error, please try again',
        {
          type: 'danger',
          placement: 'top',
        },
      );
  }, [toast, error]);

  return error;
};
