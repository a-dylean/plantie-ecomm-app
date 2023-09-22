// import { useEffect } from 'react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { securelyGetAccessToken } from '../helpers/refreshToken';
// import { createNewUser } from '../features/auth/useRegister';
// import { api } from '../helpers/axios';

// export const createNewSession = async (sessionQuery: any) => {
//   const result = await sessionQuery.unwrap();
//   localStorage.setItem('accessToken', result.accessToken);
// };

// export const useRetrieveSession = () => {
//   const createNewUser = useMutation({
//     mutationFn: async () => {
//       const res = await api.post('session/start');
//       return res.data;
//     },
//     onSuccess(data) {
//       localStorage.setItem('accessToken', data.accessToken);
//     },
//   });

//   const { data } = useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       const token = await securelyGetAccessToken();
//       api
//         .get('me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => res.data);
//     },
//   });
//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       createNewUser.mutate();
//     }
//   }, [data]);
// };
export {}