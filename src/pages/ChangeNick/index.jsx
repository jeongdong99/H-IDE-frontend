import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import insun_hidelogo from "../../assets/insun_hidelogo.svg";
import { checkNickname } from "../../utils/axioss"; //api.js 에 작성하신 함수를 여기 import 해주셔야 합니다!
import { updateNickname } from "../../utils/axios";

const ChangeNick = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: "onchange" });
  const dispatch = useDispatch();
  const [nicknameMessage, setNicknameMessage] = useState(""); // 상태 추가

  const onSubmit = async (data) => {
    const nickname = data.nickname;
    try {
      // API 호출하여 닉네임 업데이트
      const response = await updateNickname(nickname);
      console.log(response);
      window.location.href = "/mypage";
    } catch (error) {
      console.error("닉네임 변경 오류:", error.message);
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

  const userNickname = {
    required: "필수 필드입니다",
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
              htmlFor="nickname"
              className="text-sm font-semibold text-[#457D61]"
            >
              새로 변경할 닉네임
            </label>

            <div className="flex items-center mt-2">
              <input
                type="text"
                id="nickname"
                className="px-4 py-1 bg-white border rounded-lg flex-1 border-[#457D61]"
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
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#457D61] text-white px-20 py-2 text-sm font-semibold rounded-md hover:bg-[#2E5341] duration-200"
            >
              {" "}
              닉네임 변경 완료{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangeNick;
