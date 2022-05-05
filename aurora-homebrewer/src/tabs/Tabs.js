import React from 'react'

const Tabs = ({tabs}) => {
	const [openTab, setOpenTab] = React.useState(0);

	return(
		<div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
						{
							tabs.map((tab,ind) => (
								<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">							
									<a
										className={
											"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
											(openTab === ind
												? "text-white bg-blue-800"
												: "text-blue-800 bg-white")
											}
										onClick={e => {
											e.preventDefault();
											setOpenTab(ind);
										}}
										data-toggle="tab"
										href="#link1"
										role="tablist"
									>
										{tab.title}
									</a>
								</li>
							))
						}
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
							<div className="tab-content tab-space">
								{
									tabs.map((tab,ind) => (
										<div className={openTab === ind ? "block" : "hidden"} id="link1">
											{tab.content}
										</div>
									))
								}
              </div>
            </div>
          </div>
        </div>
      </div>
	)
}

export default Tabs;