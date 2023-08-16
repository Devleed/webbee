import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';

export default (opts?: { reset?: boolean }) => {
  const navigation = useNavigation();

  if (opts?.reset) {
    return useMemo(() => {
      return <ParamsType = any>(routeName: string, params?: ParamsType) => {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: routeName, params: params || {} }],
        });
      };
    }, [navigation]);
  }

  return useMemo(() => {
    return <ParamsType = any>(routeName: string, params?: ParamsType) => {
      // @ts-ignore
      navigation.navigate(routeName, params || {});
    };
  }, [navigation]);
};
