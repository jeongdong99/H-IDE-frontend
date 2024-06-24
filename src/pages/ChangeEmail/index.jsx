import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import insun_hidelogo from '../../assets/insun_hidelogo.svg';
import { sendEmailCode } from '../../utils/api'; //api.js 에 작성하신 함수를 여기 import 해주셔야 합니다!
import { updateEmail } from '../../utils/axios'

const ChangeEmail = ()=> {

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({ mode: 'onchange' }); //getValues 추가했습니다
    const dispatch = useDispatch();
    // const history = useHistory(); // useHistory 훅 사용
  
      const onSubmit = async (data) => {
        try {
            // API 호출하여 닉네임 업데이트
            const response = await updateEmail(data);
            console.log(response)
            window.location.href = '/mypage'; 
        } catch (error) {
            console.error('이메일 변경 오류:', error.message);
        }
    };

    // 이메일 코드 전송 API 호출
    const handleSendEmailCode = async (e) => {
        e.preventDefault();
        const email = getValues('email');
        try {
            const success = await sendEmailCode(email);
            if (success) {
            // setEmailCodeSent(true);
            console.log('이메일 코드 전송 완료');
            } else {
            console.error('이메일 코드 전송 실패');
            }
        } catch (error) {
            console.error('이메일 코드 전송 중 오류 발생', error);
        }
        };
     
    const userEmail = {
      required: "필수 필드입니다"
    };
  
    const userAuth = {
      required: "인증코드를 입력하세요"
    };
  
    return (
      <section className='flex flex-col justify-center mt-10 max-w-[550px] m-auto'>
        <div className='p-6 bg-[#F6FBF4] rounded-md shadow-lg'>
          <h1 className='flex justify-center'>
            <img src={insun_hidelogo} alt="Logo" className="w-[300px] h-[100px]" />
          </h1>
          <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
    
            <div className="mb-2 w-full max-w-md">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#457D61]"
              >
                새로 변경할 이메일
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="email"
                  id="email"
                  className="px-4 py-1 bg-white border border-[#457D61] rounded-md flex-1"
                  {...register('email', userEmail)}
                />
                <button onClick={handleSendEmailCode} className="px-4 py-1.5 ml-4 bg-[#457D61] text-white text-sm font-semibold rounded-md hover:bg-[#3E6C55] duration-200">
                  인증코드 전송
                </button>
              </div>
              {errors?.email && (
                <div>
                  <span className="text-red-500">{errors.email.message}</span>
                </div>
              )}
            </div>
  
            <div className="mb-2 w-full max-w-md">
              <label
                htmlFor="auth"
                className="text-sm font-semibold text-[#457D61]"
              >
                인증코드 입력
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="auth"
                  className="w-full px-4 py-1 mt-2 bg-white border border-[#457D61] rounded-md"
                  {...register('auth', userAuth)}
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#457D61]">
                  {/* 인증코드 타이머 */}
                </div>
              </div>
              {errors?.auth && (
                <div>
                  <span className="text-red-500">{errors.auth.message}</span>
                </div>
              )}
            </div>
  
            <div className="mt-6">
              <button
                type="submit"
                className="bg-[#457D61] text-white px-20 py-2 text-md font-semibold rounded-md hover:bg-[#3E6C55] duration-200"
              >
                이메일 변경 완료
              </button>
            </div>
  
          </form>
        </div>
      </section>
    );

}

export default ChangeEmail