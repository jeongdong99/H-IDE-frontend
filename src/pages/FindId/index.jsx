import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import insun_hidelogo from "../../assets/insun_hidelogo.svg";
import { findIdUser } from "../../store/thunkFunctions";
import JOINUS from "../../assets/JOINUS.svg";
import { sendEmailCode, findUserid } from "../../utils/api"; //api.js 에 작성하신 함수를 여기 import 해주셔야 합니다!

const FindId = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: "onchange" });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      // await dispatch(findIdUser(data)).unwrap(); // api.js에서 정의한 함수 호출
      const response = await findUserid(data);

      console.log("아이디 찾기 성공");
      reset(); // 폼 초기화
      // 회원가입 성공 후 로그인 페이지로 이동
      // window.location.href = '/login'; // 직접 페이지 이동
      // history.push('/login');
    } catch (error) {
      console.error(error.message);
      // 실패 처리 (예: 오류 메시지 표시)
    }
  };

  // 이메일 코드 전송 API 호출
  const handleSendEmailCode = async (e) => {
    e.preventDefault();
    const email = getValues("email");
    try {
      const success = await sendEmailCode(email);
      if (success) {
        // setEmailCodeSent(true);
        console.log("이메일 코드 전송 완료");
      } else {
        console.error("이메일 코드 전송 실패");
      }
    } catch (error) {
      console.error("이메일 코드 전송 중 오류 발생", error);
    }
  };

  const userName = {
    required: "필수 필드입니다",
  };

  const userEmail = {
    required: "필수 필드입니다",
  };

  const userAuth = {
    required: "인증 코드를 입력하세요",
  };

  return (
    <section className="flex flex-col justify-center mt-10 max-w-[550px] m-auto">
      <div className="p-6 bg-[#F6FBF4] rounded-md shadow-lg">
        <h1 className="text-center">
          <img
            src={insun_hidelogo}
            alt="Logo"
            className="w-[300px] h-[100px] m-auto"
          />
        </h1>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#457D61]"
            >
              이름
            </label>

            <div className="flex items-center mt-2">
              <input
                type="name"
                id="name"
                className="px-4 py-1 bg-white border rounded-lg flex-1 border-[#457D61]"
                {...register("name", userName)}
              />
            </div>
            {errors?.name && (
              <div>
                <span className="text-red-500">{errors.name.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#457D61]"
            >
              이메일
            </label>

            <div className="flex items-center mt-2">
              <input
                type="email"
                id="email"
                className="px-4 py-1 bg-white border border-[#457D61] rounded-md flex-1"
                {...register("email", userEmail)}
              />

              <button
                onClick={handleSendEmailCode}
                className="px-4 py-1.5 ml-4 bg-[#457D61] text-white text-sm font-semibold rounded-md hover:bg-[#3E6C55] duration-200"
              >
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
                {...register("auth", userAuth)}
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

          <p>
            <a
              href="/findPw"
              className="hover:underline font-semibold text-[#457D61]"
            >
              비밀번호 찾기
            </a>
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#457D61] text-white px-20 py-3 text-1xl font-semibold rounded-md hover:bg-[#2E5341] duration-200"
            >
              {" "}
              확인{" "}
            </button>
          </div>

          <p className="mt-8 text-md font-light text-center text-gray-700">
            아직 회원이 아닌가요? {""}
            <a
              href="/register"
              className=" hover:underline font-semibold text-[#457D61]"
            >
              {" "}
              회원가입 하러가기
            </a>
          </p>

          <p className="mt-8 text-md font-light text-center text-gray-700">
            이미 계정이 있으신가요? {""}
            <a
              href="/login"
              className=" hover:underline font-semibold text-[#457D61]"
            >
              {" "}
              로그인 하러가기
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default FindId;
