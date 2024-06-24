import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import insun_hidelogo from "../../assets/insun_hidelogo.svg";
// import { loginUser } from '../../utils/api';
import axiosInstance, { loginUser } from "../../utils/axios";
import FindId from "../FindId";
import FindPw from "../FindPw";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용

  // const history = useHistory();

  const onSubmit = async ({ id, password }) => {
    try {
      const response = await loginUser(axiosInstance, {
        loginId: id,
        password,
      });
      console.log("로그인 응답:", response); // 응답 전체를 확인해보기

      // 로그인 성공 후 리다이렉트 등의 작업 수행
      console.log("로그인 성공");

      const userInfoResponse = await axiosInstance.get("/my-page/1");
      console.log("getUserInfo 응답:", userInfoResponse.data);

      reset();

      console.log("Navigating to /mainPage"); // 여기에 로그 추가

      // 리다이렉트 페이지로 이동
      navigate("/mainPage"); // 메인 페이지로 이동
      // 리다이렉트 페이지로 이동
      // history.push('/home');
    } catch (error) {
      console.error("로그인 실패:", error.message);
      // 실패 처리
    }
  };

  const userId = {
    required: "해당 아이디가 존재하지 않습니다",
  };

  const userPassword = {
    required: "비밀번호가 일치하지 않습니다",
    minLength: {
      value: 6,
      message: "6자 이상 입력해주세요",
    },
  };

  return (
    <section className="flex flex-col justify-center mt-10 max-w-[550px] m-auto">
      <div className="p-6 bg-[#F6FBF4] rounded-md shadow-lg">
        <h1 className="flex flex-col items-center">
          <img
            src={insun_hidelogo}
            alt="Logo"
            className="w-[300px] h-[200px] flex self-center"
          />
        </h1>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="id"
              className="text-sm font-semibold text-[#457D61]"
            >
              아이디
            </label>

            <div className="flex items-center mt-2">
              <input
                type="id"
                id="id"
                className="px-4 py-1 bg-white border rounded-lg flex-1 border-[#457D61]"
                {...register("id", userId)}
              />
            </div>
            {errors?.id && (
              <div>
                <span className="text-red-500">{errors.id.message}</span>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#457D61]"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-1 mt-2 bg-white border rounded-lg border-[#457D61]"
              {...register("password", userPassword)}
            />
            {errors?.password && (
              <div>
                <span className="text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>

          <p>
            <a
              href="/findId"
              className="hover:underline font-semibold text-[#457D61]"
            >
              아이디 찾기
            </a>
            <span className="mx-2">|</span>
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
              로그인
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
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
