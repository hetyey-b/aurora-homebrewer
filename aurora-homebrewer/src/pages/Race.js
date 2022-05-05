import React from 'react'
import { abilities, languages } from '../data/lists';
import downloadFile from '../utils/downloadFile';
import Feature from './Feature';

const Race = () => {
	const [name, setName] = React.useState(null);
	const [flavor, setFlavor] = React.useState(null);
	const [asi1, setAsi1] = React.useState("default");
	const [asi2, setAsi2] = React.useState("default");
	const [age, setAge] = React.useState(null);
	const [alignment, setAlignment] = React.useState(null);
	const [size, setSize] = React.useState("medium");
	const [speed, setSpeed] = React.useState(30);
	const [knownLanguages, setKnownLanguages] = React.useState([]);
	const [features,setFeatures] = React.useState([]);
	const [featureCount,setFeatureCount] = React.useState(0);
	const [darkvision, setDarkvision] = React.useState(false);

	const handleFeatureCountChange = (event) => {
		setFeatureCount(event.target.value);

		let newFeatures = [...features];
		if (event.target.value > features.length) {
			for(let i = features.length; i < event.target.value; i++) {
				newFeatures.push({});
			}
		} else if (event.target.value < features.length) {
				newFeatures = newFeatures.slice(0,event.target.value);
		}
		setFeatures(newFeatures);
	}

	const handleLanguageCheck = (event) => {
		let newKnownLanguages = [...knownLanguages];
		if (event.target.checked) {
			newKnownLanguages = [...knownLanguages, event.target.value];
		} else {
			newKnownLanguages.splice(knownLanguages.indexOf(event.target.value), 1);
		}

		setKnownLanguages(newKnownLanguages);
	}

	const handleGenerateClick = () => {
		if ([name,flavor,age,alignment].some(e => e === null) ||
				[asi1,asi2].some(e => e === "deafult") ||
				features.some(e => !(e.name && e.desc))
			){
				debugger;
			return;
		}

		const filename = `race-${name.toLowerCase().replace(/[ *'"\\/’]/, '')}`;
		const name_id = name.toUpperCase().replace(/[ -]/, "_");
		const content = `
		<?xml version="1.0" encoding="utf-8" ?>
		<elements>
			<info>
				<name>${name}</name>
				<update version="1.0.0">
					<file name="${filename}.xml" url="" />
				</update>
			</info>
		
			<element name="${name}" type="Race" source="Aurora Homebrewer" id="ID_RACE_${name_id}">
				<description>
					<p class="flavor">${flavor}</p>
					<h4>${name_id} TRAITS</h4>
					<p class="indent"><strong><em>Ability Score Increase.</em></strong> Your ${asi2} score increases by 2, and your ${asi1} score increases by 1.</p>
					<p class="indent"><strong><em>Age.</em></strong> ${age}</p>
					<p class="indent"><strong><em>Alignment.</em></strong> ${alignment}</p>
					<p class="indent"><strong><em>Size.</em></strong> Your size is ${size}.</p>
					<p class="indent"><strong><em>Speed.</em></strong> Your base walking speed is ${speed} feet.</p>
					${
						features.map(e => `<p class="indent"><strong><em>${e.name}.</em></strong>${e.desc}</p>`).join('\n')
					}
					<p class="indent"><strong><em>Languages.</em></strong> You can speak, read, and write ${languages.map((e,ind)=> ind === languages.length - 1 ? `and ${e}` : `${e}, `).join('')}.</p>
				</description>
				<sheet display="false" />
				<rules>
					<stat name="${asi1}" value="1" />
					<stat name="${asi2}" value="2" />
					<stat name="innate speed" value="${speed}" bonus="base"/>
					<grant type="Size" id="ID_SIZE_${size.toUpperCase()}" />
					${
						darkvision ? '<grant type="Vision" id="ID_VISION_DARKVISION" />' : ''
					}
					${
						languages.map(e => `<grant type="Language" id="ID_LANGUAGE_${e.replace(" ", "_").toUpperCase()}" />`).join('\n')
					}
					${
						features.map(e => `<grant type="Racial Trait" id="ID_RACIAL_TRAIT_${e.name.replace(" ", "_").replace(/[,.'"’]/,"").toUpperCase()}" />`).join('\n')
					}
				</rules>
			</element>
			
			${
				features.map(e => `<element name="${e.name}" type="Racial Trait" source="Aurora Homebrewer" id="ID_RACIAL_TRAIT_${e.name.replace(" ", "_").replace(/[,.'"’]/,"").toUpperCase()}">
				<description>
					<p>${e.desc}</p>
				</description>
				<sheet>
					<description>${e.desc}</description>
				</sheet>
			</element>`)
			}
		</elements>		
		`;

		downloadFile(content.trim(), filename, 'xml');
	}

	return(
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<input 
					value={name}
					onChange={e => setName(e.target.value)}
					type="text"
					placeholder="Name"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>
				<textarea 
					value={flavor}
					onChange={e => setFlavor(e.target.value)}
					type="text"
					placeholder="Description"
					cols="40"
					rows="5"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>

				+2:
				<select value={asi2} onChange={e => {
						if (asi1 !== e.target.value) {
							setAsi2(e.target.value)
						}
					}
				}>
					<option value={"default"} disabled>
						+2 Ability...
					</option>
					{
						abilities.map(ability => (
							<option value={ability}>{ability}</option>
						))
					}
				</select><br/>
				+1:
				<select value={asi1} onChange={e => {
						if (asi2 !== e.target.value) {
							setAsi1(e.target.value)
						}
					}
				}>
					<option value={"default"} disabled>
						+1 Ability...
					</option>
					{
						abilities.map(ability => (
							<option value={ability}>{ability}</option>
						))
					}
				</select><br/>

				<input 
					value={age}
					onChange={e => setAge(e.target.value)}
					type="text"
					placeholder="Age"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>
				<input 
					value={alignment}
					onChange={e => setAlignment(e.target.value)}
					type="text"
					placeholder="Alignment"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>

				<select value={size} onChange={e => setSize(e.target.value)}>
					<option value="medium">Medium</option>
					<option value="small">Small</option>
				</select><br/>

				<label>
					<input type="checkbox"
						defaultChecked={darkvision}
						onChange={() => setDarkvision(!darkvision)} 
					/>
					Darkvision
				</label><br/>

				<input
					value={speed}
					onChange={e => setSpeed(e.target.value)}
					type="number"
					step={5}
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/>
				<span className="ml-[-83px] text-gray-400">ft. speed</span>
				<br/>


				{
					languages.map((language, ind) => (
						<div key={ind}>
							<input id={`${language}-checkbox`} value={language} type="checkbox" onChange={handleLanguageCheck}/>
							<label for={`${language}-checkbox`}>{language}</label>
						</div>
					))
				}
				<br/>

				<hr/>
				<label for="featureCount">Features: </label>
				<input
					type="number"
					min={0}
					max={10}
					value={featureCount}
					onChange={handleFeatureCountChange}
				/><br/>
				{
					features.map((el, ind) => (
						<Feature onChange={(newFeature) => {
							let newFeatures = [...features];
							newFeatures[ind] = newFeature;
							setFeatures(newFeatures);
						}}/>
					))
				}

				<br/><br/>

				<button 
					className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
					onClick={handleGenerateClick}
				>
					Generate
				</button>
			</form>
		</div>
	)
}

export default Race;