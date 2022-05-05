import React from 'react'

const Home = () => {
	return(
		<div>
			<h1 className='text-lg text-center'>
				Welcome to Aurora Homebrewer/
			</h1>
			<h2 className='text-center italic'>
				Created by <a href="https://github.com/hetyey-b" className='border-b-[1px] border-dashed border-b-black'>Botond Hetyey</a>
			</h2>
			<p className="my-5 text-center">
				This easy to use tool let's you create custom Backgrounds and Races [IN PROGRESS] for the Aurora Character builder for D&D 5th Edition.
			</p>
			<p className="my-5 text-center">
				After generating the .xml file, copy it into Aurora's content folder, (by default: Documents/5e Character Builder/custom/user) and restart the program.
			</p>
			<p className="my-5 text-center">
				In case of an error, please contact me at <a href="mailto: hetyey.botond@gmail.com" className='border-b-[1px] border-dashed border-b-black'>hetyey.botond@gmail.com</a>
			</p>
		</div>
	)
}

export default Home;