type formprops = {
 label : string;
 value:string;
 formfunc: (value: string) => void;
 editable?: boolean;
}

export default function Formtext({label,value, formfunc , editable = true} : formprops) {
  return <div className="w-full h-fit flex flex-col">
    <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">{label}</label>
    <input type="text" onChange={(e)=> formfunc(e.target.value)} value={value} readOnly={!editable} className={`"w-full flex border rounded-lg ${editable? "":"bg-neutral-200"} border-neutral-300 text-sm px-4 py-2 disabled:bg-neutral-100 disabled:text-neutral-400"`}></input>
  </div>;
}

export  function Formdate({label,value, formfunc} : formprops) {
  return <div className="w-full h-fit flex flex-col">
    <label className="block text-xs uppercase font-medium text-neutral-600 mb-1">{label}</label>
    <input type="date" onChange={(e)=> formfunc(e.target.value)} value={value} className="w-full flex border rounded-lg border-neutral-300 text-sm px-4 py-2"></input>
  </div>;
}

