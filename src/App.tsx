import { useState } from 'react';
import { format } from 'date-fns';

import './App.css';

function App() {
  const [totalTips, setTotalTips] = useState(0);
  const [cocktailSales, setCocktailSales] = useState(0);
  const [liquorSales, setLiquorSales] = useState(0);
  const [numServers, setNumServers] = useState(4);
  const [serverTip, setServerTip] = useState<number | null>(null);

  const calculateTip = () => {
    const houseCut = totalTips * 0.7;
    const bartenderTip = cocktailSales * 0.05 + liquorSales * 0.05;
    const totalForServers = houseCut - bartenderTip;
    const perServer = totalForServers / numServers;
    setServerTip(perServer);
  };

  const reset = () => {
    setTotalTips(0);
    setCocktailSales(0);
    setLiquorSales(0);
    setNumServers(4);
    setServerTip(null);
  };

  return (
    <main>
      <div className='container'>
        <h2>{format(new Date(), 'MMMM dd yyyy')}</h2>
        <h1>Tip Split Calculator</h1>

        <div>
          <label htmlFor='totalTips'>Total Tips: </label>
          <input
            id='totalTips'
            // name='totalTips'
            type='number'
            value={totalTips}
            onChange={(e) => setTotalTips(parseFloat(e.target.value))}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='cocktailSales'>Cocktail Sales: </label>
          <input
            id='cocktailSales'
            type='number'
            value={cocktailSales}
            onChange={(e) => setCocktailSales(parseFloat(e.target.value))}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='liquorSales'>Liquor Sales: </label>
          <input
            id='liquorSales'
            type='number'
            value={liquorSales}
            onChange={(e) => setLiquorSales(parseFloat(e.target.value))}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='numServers'>Number of Servers: </label>
          <input
            id='numServers'
            type='number'
            value={numServers}
            onChange={(e) => setNumServers(parseInt(e.target.value))}
            min={1}
          />
        </div>

        <div className='buttons'>
          <button className='calculate' onClick={calculateTip}>
            Calculate
          </button>
          <button className='reset' onClick={reset}>
            Reset
          </button>
        </div>

        {serverTip !== null && (
          <h2>
            Each Server Gets: ${serverTip.toFixed(2)}
            <br />
            Bartender Gets: $
            {(cocktailSales * 0.05 + liquorSales * 0.05).toFixed(2)}
          </h2>
        )}
      </div>
    </main>
  );
}

export default App;
