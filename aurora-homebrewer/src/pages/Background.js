import React from 'react'
import { skills, toolProf, selectableToolProf } from '../data/lists';
import downloadFile from '../utils/downloadFile';

const Background = () => {
	const [name, setName] = React.useState(null);
	const [desc, setDesc] = React.useState(null);
	const [skill1, setSkill1] = React.useState("default");
	const [skill2, setSkill2] = React.useState("default");
	const [prof1, setProf1] = React.useState("default");
	const [prof2, setProf2] = React.useState("default");
	const [equipment, setEquipment] = React.useState(null);
	const [feature_name, setFeature_name] = React.useState(null);
	const [feature_desc, setFeature_desc] = React.useState(null);

	const handleGenerateClick = () => {
		if ([name,desc,equipment,feature_name,feature_desc].some(e => e === null) ||
				[skill1, skill2, prof1, prof2].some(e => e === "default")	) {
			return;
		}

		const getProfGrant = prof => {
			if (prof === "Gaming Set") {
				return `<select type="Proficiency" name="Gaming Set (${name})" supports="Gaming Set" />`
			} else if (prof === "Musical Instrument") {
				return `<select type="Proficiency" name="Musical Intrument (${name})" supports="Musical Instrument" />`
			} else if (prof === 'language') {
				return ''
			} else{
				return `<grant type="Proficiency" id="ID_PROFICIENCY_TOOL_PROFICIENCY_${prof.replace("’","").replace(" ", "_").toUpperCase()}" />`
			}
		}

		const filename = `background-${name.toLowerCase().replace(/[ *'"\\/’]/, '')}`;
		const name_id = name.toUpperCase().replace(/[ -]/, "_");
		const languageCount = [prof1, prof2].filter((e) => e === "language").length;
		const content = `
		<?xml version="1.0" encoding="utf-8" ?>
		<elements>
			<info>
				<name>${name} Background</name>
				<description>${desc}</description>
				<author url="">Aurora Homebrewer</author>
				<update version="1.0.0">
					<file name="${filename}.xml" url=""/>
				</update>
			</info>
		
			<element name="${name}" type="Background" source="Homebrew" id="ID_AURORA_HOMEBREWER_BACKGROUND_${name_id}">
				<description>
								<ul class="unstyled">
										<li><strong>Skill Proficiencies:</strong>${skill1}, ${skill2}</li>
										<li><strong>Tool/Language Proficiencies:</strong>${prof1}, ${prof2}</li>
										<li><strong>Equipment:</strong>${equipment}</li>
								</ul>
				</description>
				<setters>
					<set name="short">${skill1}, ${skill2}, ${
						{
							0: `${prof1}, ${prof2}`,
							1: '1 Language',
							2: '2 Languages'
						}[languageCount]
					}</set>
				</setters>
				<rules>
				<grant type="Proficiency" id="ID_PROFICIENCY_SKILL_${skill1.replace(' ', '_').toUpperCase()}" />
				<grant type="Proficiency" id="ID_PROFICIENCY_SKILL_${skill2.replace(' ', '_').toUpperCase()}" />
				
				${
					{
						0: `${getProfGrant(prof1)}\n${getProfGrant(prof2)}\n`,
						1: `${getProfGrant(prof1)}\n${getProfGrant(prof2)}\n<select type="Language" name="Language (${name})" number="1" supports="Standard||Exotic" />\n`,
						2: `<select type="Language" name="Language (${name})" number="2" supports="Standard||Exotic" />`
					}[languageCount]
				}
				
				</rules>
				</element>
		
				<element name="Feature: ${feature_name}" type="Background Feature" source="Homebrew" id="ID_BACKGROUND_FEATURE_${feature_name.replace(" ", "_").replace("'", "").toUpperCase()}">
				<supports>Background Feature</supports>
				<description>
					<p>${feature_desc}</p>
				</description>
				<sheet alt="${feature_name}" />
			</element>
		</elements>
		`;

		downloadFile(content.trim(), filename, 'xml');
	}

	return(
		<div>
			<form>
				<input 
					value={name}
					onChange={e => setName(e.target.value)}
					type="text"
					placeholder="Name"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>

				<textarea 
					value={desc}
					onChange={e => setDesc(e.target.value)}
					type="text"
					placeholder="Description"
					cols="40"
					rows="5"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>

				<select value={skill1} onChange={(e) => {
						if (skill2 !== e.target.value) {
							setSkill1(e.target.value)
						}
					} 
				}>
					<option value={"default"} disabled>
						Skill...
					</option>
					{
						skills.map(skill => (
							<option value={skill}>{skill}</option>
						))
					}
				</select>

				<select value={skill2} onChange={(e) => {
						if (skill1 !== e.target.value) {
							setSkill2(e.target.value)
						}
					}
				}>
					<option value={"default"} disabled>
						Skill...
					</option>
					{
						skills.map(skill => (
							<option value={skill}>{skill}</option>
						))
					}
				</select><br/>

				<select value={prof1} onChange={(e) => {
						if (prof2 !== e.target.value ||	e.target.value === "language") {
							setProf1(e.target.value)
						}
					}
				}>
					<option value={"default"} disabled>
						Proficiency...
					</option>
					{
						toolProf.map(prof => (
							<option value={prof}>[Tool] {prof}</option>
						))
					}
					{
						selectableToolProf.map(prof => (
							<option value={prof}>[Tool] {prof}</option>
						))
					}
					<option value="language">Language of choice</option>
				</select>
				<select value={prof2} onChange={(e) => {
						if (prof1 !== e.target.value || e.target.value === "language") {
							setProf2(e.target.value)
						}
					}
				}>
					<option value={"default"} disabled>
						Proficiency...
					</option>
					{
						toolProf.map(prof => (
							<option value={prof}>[Tool] {prof}</option>
						))
					}
					{
						selectableToolProf.map(prof => (
							<option value={prof}>[Tool] {prof}</option>
						))
					}
					<option value="language">Language of choice</option>
				</select><br/>

				<input 
					value={equipment}
					onChange={e => setEquipment(e.target.value)}
					type="text"
					placeholder="Equipment"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>
				<input 
					value={feature_name}
					onChange={e => setFeature_name(e.target.value)}
					type="text"
					placeholder="Feature"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/><br/>
				<textarea 
					value={feature_desc}
					onChange={e => setFeature_desc(e.target.value)}
					type="text"
					placeholder="Description"
					cols="40"
					rows="5"
					className="border-blue-700 p-1 text-blue-800 rounded-md border-2 my-2"
				/>

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

export default Background;