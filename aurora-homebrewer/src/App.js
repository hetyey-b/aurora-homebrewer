import './App.css';
import Background from './pages/Background';
import Home from './pages/Home';
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
					]
				}
			/>
    </div>
  );
}

export default App;
