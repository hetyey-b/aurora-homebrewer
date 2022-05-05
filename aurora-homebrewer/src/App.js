import './App.css';
import Background from './pages/Background';
import Home from './pages/Home';
import Race from './pages/Race';
import Tabs from './tabs/Tabs';

function App() {
  return (
    <div className="">
      <Tabs 
				tabs={
					[
						{
							title: "Home",
							content: <Home />
						},
						{
							title: "Background",
							content: <Background />
						},
						{
							title: "Race",
							content: <Race />
						}
					]
				}
			/>
    </div>
  );
}

export default App;
