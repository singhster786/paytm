import { Headings } from "../components/Headings";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";


export const Singup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center" >
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80">
                <Headings label={"Singup"} />
                <SubHeading label={"Enter your details"} />
                <InputBox label={"First Name"} placeholder={"John"} />
                <InputBox label={"Last Name"} placeholder={"LDoe"} />
                <InputBox label={"Email"} placeholder={"test@gmail.com"} />
                <InputBox label={"Password"} placeholder={"qwerty"} />
                <div className="pt-4">
                    <Button label={"Singup"} onclick={() => { }} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signIn"} />
            </div>
        </div>
    </div>
}