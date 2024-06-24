// // axios-instance.js

// import axios from 'axios';

// // 기본 설정
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080', // 백엔드 API URL
//   withCredentials: true, // 쿠키를 전송하기 위한 옵션
// });

// // 요청 인터셉터 설정
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (accessToken) {
//       config.headers['access'] = accessToken; // accessToken을 헤더에 추가
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 설정
// axiosInstance.interceptors.response.use(
//   (response) => {
//     const { headers } = response;

//     // refreshToken을 쿠키로 저장
//     const setCookieHeader = headers['set-cookie'];
//     if (setCookieHeader) {
//       const refreshToken = parseRefreshTokenFromHeader(setCookieHeader); // 쿠키에서 refreshToken 추출
//       setRefreshTokenCookie(refreshToken); // refreshToken을 쿠키로 저장
//     }

//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // refreshToken을 쿠키에 저장하는 함수
// const setRefreshTokenCookie = (refreshToken) => {
//   document.cookie = `refresh=${refreshToken}; path=/; max-age=86400; HttpOnly`; // 쿠키에 refreshToken 저장 (예: 1일 유지)
// };

// // 헤더에서 refreshToken 추출하는 함수 (실제 사용 환경에 맞게 구현 필요)
// const parseRefreshTokenFromHeader = (setCookieHeader) => {
//   // 예시로 간단히 처리, 실제 적용 시에는 쿠키 파싱 또는 정규식을 이용하여 추출
//   return setCookieHeader.split(';')[0].split('=')[1];
// };

// // 토큰 삭제 함수
// const deleteTokens = () => {
//   localStorage.removeItem('accessToken'); // localStorage에서 accessToken 삭제
//   document.cookie = 'refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // 쿠키에서 refreshToken 삭제
// };

// // 토큰 갱신 함수
// const refreshTokens = async () => {
//   try {
//     const response = await axiosInstance.post('/reissue');
//     const newAccessToken = response.headers.access;

//     // 기존 토큰 삭제
//     deleteTokens();

//     // 새로운 토큰 저장
//     localStorage.setItem('accessToken', newAccessToken);
//     const setCookieHeader = response.headers['set-cookie'];
//     if (setCookieHeader) {
//       const newRefreshToken = parseRefreshTokenFromHeader(setCookieHeader);
//       setRefreshTokenCookie(newRefreshToken);
//     }

//     console.log('토큰 갱신 완료');
//   } catch (error) {
//     console.error('토큰 갱신 실패:', error.message);
//     // 갱신 실패 시 토큰 삭제
//     deleteTokens();
//   }
// };

// // 10분마다 토큰 갱신 요청 (예: setInterval 사용)
// setInterval(refreshTokens, 600000); // 10분(600000ms)마다 실행

// export default axiosInstance;
