'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_KEY } from '../constant';

const getToken = async (): Promise<string | null> => {
  try {
    const token = cookies().get(AUTH_COOKIE_KEY);
    return token ? token.value : null;
  } catch (error) {
    return null;
  }
};

export default getToken;
