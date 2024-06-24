import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import insun_hidelogo from '../../assets/insun_hidelogo.svg';


const FindPw = () => {
  
    const {register, handleSubmit, formState:{errors}, reset} = useForm({mode: 'onchange'})

    const dispatch = useDispatch();
  
    const onSubmit = ({name,id,email})=>{
     
     const body = {
      name,
      id,
      email
     }
     
     dispatch(loginUser(body));
  
      reset();
    }
  
    const userName = {
      required : "필수 필드입니다"
    }
  
    const userId = {
        required : "필수 필드입니다"
    }

    const userEmail = {
        required : "필수 필드입니다"
    }

  
    return (
      <section className='flex flex-col justify-center mt-10 max-w-[550px] m-auto'>
    <div className='p-6 bg-[#F6FBF4] rounded-md shadow-lg'>
      <h1 className="text-center">
        <img src={insun_hidelogo} alt="Logo" className="w-[300px] h-[100px] m-auto" />
      </h1>
  
      <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-2 w-full max-w-md'>
          <label
            htmlFor='name'
            className='text-sm font-semibold text-[#457D61]'
          >이름</label>
          
          <div className='flex items-center mt-2'>
            <input 
              type='name'
              id='name'
              className='px-4 py-1 bg-white border rounded-lg flex-1 border-[#457D61]'
              {...register('name', userName)}
            />
          </div>
          {
            errors?.name&&
            <div>
              <span className='text-red-500'>
                {errors.name.message}
              </span>
            </div>
          }
        </div>

        <div className='mb-2 w-full max-w-md'>
        <label
          htmlFor='id'
          className='text-sm font-semibold text-[#457D61]'
        >아이디</label>
        
        <div className='flex items-center mt-2'>
          <input 
            type='id'
            id='id'
            className='px-4 py-1 bg-white border rounded-lg flex-1 border-[#457D61]'
            {...register('id', userId)}
          />
        </div>
        {
          errors?.id&&
          <div>
            <span className='text-red-500'>
              {errors.id.message}
            </span>
          </div>
        }
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
                {...register('email', userEmail)}
            />


        </div>

        {errors?.email && (
          <div>
            <span className="text-red-500">{errors.email.message}</span>
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
      </p>

        <div className='mt-6 flex justify-center'>
          <button type='submit' className='bg-[#457D61] text-white px-20 py-3 text-1xl font-semibold rounded-md hover:bg-[#2E5341] duration-200'> 이메일로 비밀번호 재설정 </button>
        </div>
  
        <p className='mt-8 text-md font-light text-center text-gray-700'> 
          아직 회원이 아닌가요? {""}
          <a href='/register'
          className=' hover:underline font-semibold text-[#457D61]'> 회원가입 하러가기</a>
        </p>

        <p className='mt-8 text-md font-light text-center text-gray-700'> 
          이미 계정이 있으신가요? {""}
          <a href='/login'
          className=' hover:underline font-semibold text-[#457D61]'> 로그인 하러가기</a>
        </p>
      </form>
    </div>
  </section>
    
  )
}

export default FindPw