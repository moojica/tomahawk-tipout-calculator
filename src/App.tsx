import { useState } from 'react';
import { format } from 'date-fns';

import './App.css';

function App() {
  const [totalTips, setTotalTips] = useState('');
  const [cocktailSales, setCocktailSales] = useState('');
  const [liquorSales, setLiquorSales] = useState('');
  const [numServers, setNumServers] = useState('');
  const [serverTip, setServerTip] = useState<number | null>(null);

  const calculateTip = () => {
    const total = parseFloat(totalTips) || 0;
    const cocktails = parseFloat(cocktailSales) || 0;
    const liquor = parseFloat(liquorSales) || 0;
    const servers = parseInt(numServers) || 1;

    if (servers === 0) {
      alert('Number of servers cannot be zero');
      return;
    }

    const houseCut = total * 0.7;
    const bartenderTip = cocktails * 0.05 + liquor * 0.05;
    const totalForServers = houseCut - bartenderTip;
    const perServer = totalForServers / servers;

    setServerTip(perServer);
  };

  const reset = () => {
    setTotalTips('');
    setCocktailSales('');
    setLiquorSales('');
    setNumServers('');
    setServerTip(null);
  };

  return (
    <main>
      <div className='container'>
        <h2>
          {format(new Date(), 'EEEE')}
          <br />
          {format(new Date(), 'MMMM dd yyyy')}
        </h2>
        <h1>Tip Split Calculator</h1>

        <div>
          <label htmlFor='totalTips'>Total Tips: </label>
          <input
            id='totalTips'
            type='text'
            inputMode='numeric'
            pattern='\d*'
            value={totalTips}
            onChange={(e) => setTotalTips(e.target.value)}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='cocktailSales'>Cocktail Sales: </label>
          <input
            id='cocktailSales'
            type='text'
            inputMode='numeric'
            pattern='\d*'
            value={cocktailSales}
            onChange={(e) => setCocktailSales(e.target.value)}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='liquorSales'>Liquor Sales: </label>
          <input
            id='liquorSales'
            type='text'
            inputMode='numeric'
            pattern='\d*'
            value={liquorSales}
            onChange={(e) => setLiquorSales(e.target.value)}
            min={0}
          />
        </div>

        <div>
          <label htmlFor='numServers'>Number of Servers: </label>
          <input
            id='numServers'
            type='text'
            inputMode='numeric'
            pattern='\d*'
            value={numServers}
            onChange={(e) => setNumServers(e.target.value)}
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
            {(
              (parseFloat(cocktailSales) || 0) * 0.05 +
              (parseFloat(liquorSales) || 0) * 0.05
            ).toFixed(2)}
          </h2>
        )}
      </div>
    </main>
  );
}

export default App;
