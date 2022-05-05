import './App.css';
import Background from './forms/Background';
import Tabs from './tabs/Tabs';

function App() {
  return (
    <div className="">
      <Tabs 
				tabs={
					[
						{
							title: "Background",
							content: <Background />
						},
						{
							title: "2 ASD",
							content: <div>Hello World 2</div>
						},
						{
							title: "3 ASD",
							content: <div>Hello World 3</div>
						},
					]
				}
			/>
    </div>
  );
}

export default App;
