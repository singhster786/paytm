import React from 'react'
import { BottomWarning } from '../components/BottomWarning';
// import BottomWarning from '../components/BottomWarning';
import {Button} from '../components/Button';
import {Headings} from '../components/Headings';
import {InputBox} from '../components/InputBox';
import {SubHeading} from '../components/SubHeading';


export const Signin = () => {
    return (
        <div className='bg-slate-300 h-screen flex justify-senter'>
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-80'>
                    <Headings label={"Signin"} />
                    <SubHeading label={"Enter your details"} />
                    <InputBox label={"Email"} placeholder={"test@gmail"} />
                    <InputBox label={"Password"} placeholder={"qwerty"} />
                    <div className='pt-4'>
                        <Button label={"Signin"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to="/signup" />
                </div>
            </div>    
        </div>
    )
}
