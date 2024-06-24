import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom'; // useHistory import
//import { registerUser } from "../../store/thunkFunctions";
import JOINUS from "../../assets/JOINUS.svg";
import {
  checkUserid,
  checkNickname,
  signUpUser,
  sendEmailCode,
} from "../../utils/axioss"; //api.js 에 작성하신 함수를 여기 import 해주셔야 합니다!

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: "onchange" }); //getValues 추가했습니다
  const dispatch = useDispatch();
  // const history = useHistory(); // useHistory 훅 사용

  const [useridMessage, setUseridMessage] = useState(""); // 아이디 중복확인 메세지를 저장하기 위한 변수 선언
  const [nicknameMessage, setNicknameMessage] = useState(""); // 닉네임 중복확인 메세지를 저장하기 위한 변수 선언
  const [emailCodeSent, setEmailCodeSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      //2024.06.24
      //onSubmit에서 registerUser액션을 호출하도록
      //await dispatch(registerUser(data)).unwrap();
      const response = await signUpUser(data); // api.js에서 정의한 함수 호출

      console.log("회원가입 성공");
      reset(); // 폼 초기화
      // 회원가입 성공 후 로그인 페이지로 이동
      window.location.href = "/login"; // 직접 페이지 이동
      // history.push('/login');
    } catch (error) {
      console.error(error.message);
      // 실패 처리 (예: 오류 메시지 표시)
    }
  };

  // 아이디 중복확인 버튼 누르면 동작할 함수 (button에 onClick ={handleCheckUserid} 형식으로 연결하기)
  const handleCheckUserid = async (e) => {
    e.preventDefault();
    const id = getValues("id");
    try {
      const message = await checkUserid(id);
      setUseridMessage(message);
    } catch (error) {
      setUseridMessage("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복확인 버튼 누르면 동작할 함수 (button에 onClick ={handleCheckNickname} 형식으로 연결하기)
  const handleCheckNickname = async (e) => {
    e.preventDefault();
    const nickname = getValues("nickname");
    try {
      const message = await checkNickname(nickname);
      setNicknameMessage(message);
    } catch (error) {
      setNicknameMessage("닉네임 중복 확인 중 오류가 발생했습니다.");
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

  const userId = {
    required: "필수 필드입니다",
  };

  const userName = {
    required: "필수 필드입니다",
  };

  const userNickname = {
    required: "필수 필드입니다",
  };

  const userPassword = {
    required: "필수 필드입니다",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  const userPasswordCheck = {
    required: "비밀번호를 확인해주세요",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  const userEmail = {
    required: "필수 필드입니다",
  };

  const userAuth = {
    required: "인증코드를 입력하세요",
  };

  return (
    <section className="flex flex-col justify-center mt-10 max-w-[550px] m-auto">
      <div className="p-6 bg-[#F6FBF4] rounded-md shadow-lg">
        <h1 className="flex justify-center">
          <img src={JOINUS} alt="Logo" className="w-[300px] h-[100px]" />
        </h1>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="id"
              className="text-sm font-semibold text-[#457D61]"
            >
              아이디
            </label>
            <div className="flex items-center mt-2">
              <input
                type="text"
                id="id"
                className="px-4 py-1 bg-white border rounded-md flex-1 border-[#457D61]"
                {...register("id", userId)}
              />
              <button
                onClick={handleCheckUserid}
                className="px-4 py-1.5 ml-4 hover:bg-[#457D61] duration-200 bg-[#457D61] text-sm font-semibold text-white rounded-md"
              >
                중복 확인
              </button>
            </div>
            {useridMessage && (
              <div>
                <span
                  className={
                    useridMessage.includes("사용 가능한")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {useridMessage}
                </span>
              </div>
            )}
            {errors?.id && (
              <div>
                <span className="text-red-500">{errors.id.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-[#457D61]"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-1 mt-2 bg-white border rounded-md border-[#457D61]"
              {...register("name", userName)}
            />
            {errors?.name && (
              <div>
                <span className="text-red-500">{errors.name.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="nickname"
              className="text-sm font-semibold text-[#457D61]"
            >
              닉네임
            </label>
            <div className="flex items-center mt-2">
              <input
                type="text"
                id="nickname"
                className="px-4 py-1 bg-white border rounded-md flex-1 border-[#457D61]"
                {...register("nickname", userNickname)}
              />
              <button
                onClick={handleCheckNickname}
                className="px-4 py-1.5 ml-4 hover:bg-[#457D61] duration-200 bg-[#457D61] text-sm font-semibold text-white rounded-md"
              >
                중복 확인
              </button>
            </div>
            {nicknameMessage && (
              <div>
                <span
                  className={
                    nicknameMessage.includes("사용 가능한")
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {nicknameMessage}
                </span>
              </div>
            )}
            {errors?.nickname && (
              <div>
                <span className="text-red-500">{errors.nickname.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#457D61]"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-1 mt-2 bg-white border border-[#457D61] rounded-md"
                {...register("password", userPassword)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#457D61] focus:outline-none"
                onClick={() => {
                  // 비밀번호 표시/숨기기 기능 구현
                }}
              >
                {/* 비밀번호 표시/숨기기 아이콘 */}
              </button>
            </div>
            {errors?.password && (
              <div>
                <span className="text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2 w-full max-w-md">
            <label
              htmlFor="check"
              className="text-sm font-semibold text-[#457D61]"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="check"
              className="w-full px-4 py-1 mt-2 bg-white border border-[#457D61] rounded-md"
              {...register("checkPassword", userPasswordCheck)}
            />
            {errors?.checkPassword && (
              <div>
                <span className="text-red-500">
                  {errors.checkPassword.message}
                </span>
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

          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#457D61] text-white px-20 py-3 text-xl font-semibold rounded-md hover:bg-[#3E6C55] duration-200"
            >
              회원 가입 완료
            </button>
          </div>

          <p className="mt-8 text-md font-light text-[#457D61] text-center">
            이미 계정이 있으신가요?{" "}
            <a
              href="/login"
              className="hover:underline font-semibold text-[#457D61]"
            >
              로그인 하러가기
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
