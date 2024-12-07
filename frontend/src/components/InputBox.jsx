export const InputBox = ({label, placeholder, onChange}) => {
    return <div>
       <div className="text-sm font-medium test-left py-2">
        {label}
       </div>
       <input onChange={onChange} placeholder={placeholder} className="w-full border border-gray-300 rounded-md p-2"></input>
    </div>
}