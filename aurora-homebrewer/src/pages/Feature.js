import React from 'react'

const Feature = ({onChange}) => {
	const [name, setName] = React.useState(null);
	const [desc, setDesc] = React.useState(null);
	
	return(
		<div>
			<input
				value={name}
				onChange={e => {
					setName(e.target.value);
					onChange({name: name, desc: desc});
				}}
				type="text"
				placeholder="Name"
				className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
			/><br/>
			<textarea 
				value={desc}
				onChange={e => {
					setDesc(e.target.value);
					onChange({name: name, desc: desc});
				}}
				type="text"
				placeholder="Description"
				cols="40"
				rows="5"
				className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
			/><br/>
		</div>
	)
}

export default React.memo(Feature);